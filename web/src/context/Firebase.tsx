import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { auth, db } from "../../firebaseConfig";
import { doc, DocumentData, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

interface FirebaseContextType {
  signupUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string,
    address: string,
    fees: number,
    specialty: string,
    isDoctor: boolean
  ) => Promise<UserCredential>;
  signinUserWithEmailAndPass: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  uploadProfilePicture: (file: File) => Promise<string>;
  updateProfileInfo: (about: string, photoUrl?: string) => Promise<void>;
  fetchUserProfile: () => Promise<DocumentData>;
  fetchUserAppointments: () => Promise<DocumentData[]>;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const storage = getStorage();

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const uploadProfilePicture = async (file: File): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    const fileRef = ref(storage, `image/${user.uid}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  const updateProfileInfo = async (about: string, photoUrl?: string): Promise<void> => {
    if (!user) throw new Error("User not authenticated");

    const userDocRef = doc(db, "users", user.uid);

    const updatedData: { about: string; profileImage?: string } = { about };
    if (photoUrl) {
      updatedData.profileImage = photoUrl;
    }

    await updateDoc(userDocRef, updatedData);
  };

    // New function to fetch the user's profile data
    const fetchUserProfile = async (): Promise<DocumentData> => {
      if (!user) throw new Error("User not authenticated");
  
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error("User profile does not exist");
      }
  
      return userDoc.data(); // Return the user's data including profile image URL and about section
    };

    // In firebase.tsx

const fetchUserAppointments = async () => {
  if (!user) throw new Error("User not authenticated");

  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const appointmentUIDs = userData.appointments || [];
    const appointments = await Promise.all(
      appointmentUIDs.map(async (uid: string) => {
        const appointmentDoc = await getDoc(doc(db, "appointments", uid));
        return appointmentDoc.exists() ? appointmentDoc.data() : null;
      })
    );

    return appointments.filter((appointment) => appointment !== null);
  }

  return [];
};


  const signupUserWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    address: string,
    fees: number,
    specialty: string,
    isDoctor: boolean,
  ): Promise<UserCredential> => {
    // createUserWithEmailAndPassword(auth, email, password);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      await setDoc(doc(db, "users", response?.user?.uid), {
        userId: response?.user?.uid,
        email: response?.user?.email,
        name,
        address,
        fees,
        specialty,
        isDoctor,
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      let msg = (error as FirebaseError).message;
      if (
        (error as FirebaseError).message ===
        "Firebase: Error (auth/email-already-in-use)."
      ) {
        msg = "Email already in use";
      } else if (
        (error as FirebaseError).message ===
        "Firebase: Error (auth/invalid-email)."
      ) {
        msg = "Invalid Email";
      }
      throw new Error(msg);
    }
  };

  const signinUserWithEmailAndPass = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isDoctor) {
          return response;
        } else {
          await signOut(auth);
          throw new Error("Access denied: Not a doctor");
        }
      } else {
        await signOut(auth);
        throw new Error("Access denied: Not a doctor.");
      }
    } catch (e: unknown) {
      let msg = (e as FirebaseError).message;
      if (
        (e as FirebaseError).message ===
        "Firebase: Error (auth/user-not-found)."
      ) {
        msg = "User not found";
      } else if (
        (e as FirebaseError).message ===
        "Firebase: Error (auth/wrong-password)."
      ) {
        msg = "Wrong password";
      }
      throw new Error(msg);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e: unknown) {
      console.error("Logout failed:", e);
    }
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        uploadProfilePicture,
        updateProfileInfo,
        fetchUserProfile,
        fetchUserAppointments,
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
