import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  addDoc,
  where,
  collection,
  query,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import moment from "moment";

interface ContextState {
  user: IUser;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  loading: boolean;
  logOut: () => void;
  searchUser: (uid: string) => void;
}

type IUser = User | undefined;

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<ContextState | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user: any) => {
        setUser(user);
      });
    };

    setLoading(false);
    return unsubscribe;
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  const signUp = async (email: string, password: string) => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let datetime = date + " " + time;
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCreds) => {
        await setDoc(doc(db, "users", userCreds.user.uid), {
          uid: userCreds.user.uid,
          email: userCreds.user.email,
          username: email.split("@")[0],
          created_at: datetime,
        });
      }
    );
  };

  const signIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const searchUser = async (uid: string) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id + " " + doc.data());
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, loading, logOut, searchUser }}
    >
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
