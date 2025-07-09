import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Userprotectedwrapper = ({ children }) => {
   const navigate = useNavigate()
  const token = localStorage.getItem('token');

 useEffect(()=>{
 if (!token ) {
    toast.error("Please login to access this page");
    navigate('/user/login') ;
  }
 },[token , navigate])

  return <>{children}</>;
};

export default Userprotectedwrapper