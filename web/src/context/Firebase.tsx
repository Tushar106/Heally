import { createContext, useContext, ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface FirebaseContextType {
  signupUserWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  signinUserWithEmailAndPass: (email: string, password: string) => Promise<UserCredential>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const signupUserWithEmailAndPassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signinUserWithEmailAndPass = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPass }}>
      {children}
    </FirebaseContext.Provider>
  );
};
