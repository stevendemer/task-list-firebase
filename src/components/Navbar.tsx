import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {};

const Navbar = () => {
  const { user, logOut, searchUser } = useAuth();

  return (
    <div className="bg-gray-200 text-slate-400 p-4 flex items-center justify-between ">
      <div className="flex flex-grow  items-center lg:text-2xl text-sm font-poppins text-slate-600 font-semibold">
        Track List
      </div>
      {user ? (
        <div className="flex justify-end items-center p-2 mx-2 space-x-2 text-slate-800">
          <div>{user?.email?.split("@")[0].toUpperCase()}</div>
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
