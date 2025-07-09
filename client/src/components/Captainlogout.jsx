import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Captainlogout = () => {
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_API_URL}/captain/logout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      if (res.status === 200 || res.data.success) {
        localStorage.removeItem("token");
        toast.success("Captain logged out successfully");
        navigate("/captain/login");
      }
    });
  return <div>Captainlogout</div>;
};

export default Captainlogout;
