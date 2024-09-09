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
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
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
  ): Promise<UserCredential> => {
    // createUserWithEmailAndPassword(auth, email, password);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const isDoctor = true
      await setDoc(doc(db, "users", response?.user?.uid), {
        userId: response?.user?.uid,
        email: response?.user?.email,
        name,
        address,
        isDoctor
      });
      console.log(response);
      return response;
    } catch (error: unknown) {
      let msg = (error as FirebaseError).message;
      if ((error as FirebaseError).message === "Firebase: Error (auth/email-already-in-use).") {
        msg = "Email already in use";
      } else if ((error as FirebaseError).message === "Firebase: Error (auth/invalid-email).") {
        msg = "Invalid Email";
      }
      throw new Error(msg);
    }
  };

  const signinUserWithEmailAndPass = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        isLoggedIn,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
