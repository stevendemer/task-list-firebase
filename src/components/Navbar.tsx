import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
import { db } from "../firebase";

type Props = {};

const Navbar = () => {
  const { user, logOut } = useAuth();
  let username: string;

  useEffect(() => {
    document.title = "Track List - Dashboard";
  });

  return (
    <div className="bg-gray-200 text-slate-400 p-4 flex items-center justify-around sticky top-0 z-20 border-b-2 border-slate-400 drop-shadow-xl   w-full">
      <div className="flex flex-grow  items-center lg:text-2xl text-sm font-poppins text-slate-600 font-semibold">
        Welcome {user?.email?.split("@")[0]}
      </div>
      {user ? (
        <div className="flex justify-end items-center p-2 mx-2 space-x-2 text-slate-800">
          <button className="mx-2" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center text-slate-400">
          <Link to="sign-in">Sign in</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
