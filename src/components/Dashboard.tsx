import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Tasks from "./Tasks";
import InputForm from "./InputForm";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  deadline: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      console.log("Loading..");
    }
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center p-4  bg-gray-200 min-h-screen relative">
        <div className="text-gray-700 capitalize font-open-sans hover:scale-x-125 transition-all duration-100 lg:text-2xl text-lg font-semibold place-items-center flex">
          Task Tracker
        </div>
        <Tasks />
      </div>
    </>
  );
};

export default Dashboard;
