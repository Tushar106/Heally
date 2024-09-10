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
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

interface FirebaseContextType {
  signupUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string,
    address: string,
    isDoctor: boolean
  ) => Promise<UserCredential>;
  signinUserWithEmailAndPass: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  const signupUserWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    address: string,
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
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
