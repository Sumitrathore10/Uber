import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Captainprotectedwrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this page");
      navigate("/captain/login");
    }
  }, [token, navigate]);
  return <div>{children}</div>;
};

export default Captainprotectedwrapper;
