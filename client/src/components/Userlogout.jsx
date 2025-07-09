import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Userlogout = () => {
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_API_URL}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      if (res.status === 200 || res.data.success) {
        localStorage.removeItem("token");
        toast.success("User logged out successfully");
        navigate("/user/login");
      }
    });

  return <div>Userlogout</div>;
};
export default Userlogout;
