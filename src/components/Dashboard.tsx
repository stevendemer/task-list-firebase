import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";

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
      <div className="text-xl text-black">I am the dash board</div>
    </>
  );
};

export default Dashboard;
