import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Signup = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  let navigate = useNavigate();

  const reset = () => {
    setData(initialState);
  };

  // user got registered -> go to the dashboard
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!data.password || !data.email) {
      alert("Fields are empty !");
      reset();
    }
    // create the new user
    signIn(data.email, data.password);
    setLoading(false);
  };

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target;
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full grid  md:grid-cols-3 gap-10 items-center flex-grow drop-shadow-xl bg-gray-800 min-h-screen">
      <form
        onSubmit={onSubmit}
        className="h-auto col-span-2 md:w-8/12  space-y-2 items-center  bg-gray-200 text-gray-700 mx-auto p-20 rounded-lg drop-shadow-xl"
      >
        <div className="text-xl font-poppins font-semibold text-gray-500 mb-4 p-2 flex items-center justify-center">
          Create a new account
        </div>
        <label htmlFor="email" className="text-gray-600 font-semibold p-2">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => {
            console.log(e.target.value);
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          }}
          className="rounded-lg  flex-grow p-2 bg-gray-300 black w-full  font-semibold text-md lg:text-lg focus:outline-none border-slate-300 border-2"
        />
        <label htmlFor="email" className="text-gray-600 font-semibold p-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          onChange={(e) => {
            console.log(e.target.value);
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          }}
          value={data.password}
          className="rounded-lg flex-grow p-2 bg-gray-300 black w-full font-semibold text-md lg:text-lg focus:outline-none"
        />
        <button className="bg-gray-800 font-poppins hover:bg-slate-500 transition-all duration-200  w-full text-gray-200 font-semibold mt-4 rounded-lg p-2">
          Sign in
        </button>
      </form>
      <div className="md:block xs:fixed bottom-4 left-20  flex-col items-center basis-full">
        <div className="text-gray-200 font-semibold md:text-lg text-sm">
          Don't have an account ?
        </div>
        <button className="bg-gray-300 rounded-full px-4 hover:bg-gray-100 transition-all duration-200 mt-2 text-sm md:text-lg items-center font-semibold text-gray-600">
          <Link to="/sign-up">Sign up</Link>
        </button>
      </div>
    </div>
  );
};

export default Signup;
