import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

interface ContextState {
  user: User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
}

type IUser = User | null;

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<ContextState | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      setLoading(false);
    };

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

//
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("Must be used within an AuthProvider");
  }

  return ctx;
};
