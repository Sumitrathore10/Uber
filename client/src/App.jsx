import React from "react";
import { Routes, Route } from "react-router-dom";
import Userlogin from "./components/Userlogin.jsx";
import UserRegister from "./components/Userregister.jsx";
import First from "./components/First.jsx";
import Captainlogin from "./components/Captainlogin.jsx";
import Captainregister from "./components/Captainregister.jsx";
import Home from "./components/Home.jsx";
import { Toaster } from "react-hot-toast";
import Userprotectedwrapper from "./components/Userprotectedwrapper.jsx";
import Userlogout from "./components/Userlogout.jsx";
import CaptainHome from "./components/CaptainHome.jsx";
import Captainprotectedwrapper from "./components/Captainprotectedwrapper.jsx";
import Captainlogout from "./components/Captainlogout.jsx";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "8px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            width: "fit-content",
            maxWidth: "90vw",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
          success: {
            duration: 3000,
          },
        }}
      />
      <Routes>
        <Route path="/user/login" element={<Userlogin />} />
        <Route path="/user/logout" element={<Userlogout />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/" element={<First />} />
        <Route path="/captain/login" element={<Captainlogin />} />
        <Route path="/captain/logout" element={<Captainlogout />}/>
        <Route path="/captain/register" element={<Captainregister />} />
        <Route
          path="/home"
          element={
            <Userprotectedwrapper>
              <Home />
            </Userprotectedwrapper>
          }
        />
        <Route
          path="/captain/home"
          element={
            <Captainprotectedwrapper>
              <CaptainHome />
            </Captainprotectedwrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
