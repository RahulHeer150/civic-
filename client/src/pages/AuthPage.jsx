import React from "react";
import { useLocation, Link } from "react-router-dom";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import loginImg from '../assets/login.png'
const AuthPage = ({ setIsLoggedIn, image }) => {
const location = useLocation();
  const path = location.pathname;

  // Determine the active button based on the current URL path
  const activeButton = path === "/register" ? "register" : "login";

  return (
    <div className="flex flex-col min-h-screen pt-4  md:pt-20 " > 
      <div className="flex-grow flex flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1160px] pt-16 md:pt-0 lg:pt-0 mx-auto justify-between items-center mt-[12vh]">
        <div className="w-full lg:w-1/2 md:w-1/2 flex justify-center items-center">
          <img
            src={loginImg}
            alt="pattern"
            width={500}
            height={350}
            loading="lazy"
            className="max-w-full h-auto hidden md:block lg:block"
          />
        </div>
        <div className="w-full lg:w-1/2 md:w-1/2  px-6 lg:px-0  text-white" >
          <div className={`${
                activeButton === "login" ? " mt-[0vh]" : "-mt-[8vh]"
              } bg-gradient-to-r from-purple-100 to-red-100 flex text-xl justify-center rounded-full max-w-md mx-auto mb-4 `}>
            <Link
              to="/login"
              className={`${
                activeButton === "login" ? " bg-gradient-to-r from-purple-500 to-red-500 text-white font-bold " : "bg-gradient-to-r from-purple-100 to-red-100 text-black font-bold"
              } rounded-full flex-1 py-2  text-center`}
              style={{ fontSize: "0.9rem" }}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className={`${
                activeButton === "register" ? "bg-gradient-to-r from-purple-500 to-red-500 text-white font-bold" : "bg-gradient-to-r from-purple-100 to-red-100 text-black font-bold"
              } rounded-full flex-1 py-2  text-center`}
              style={{ fontSize: "0.9rem" }}
            >
              Register
            </Link>
          </div>

          {activeButton === "register" ? (
            <RegisterForm setIsLoggedIn={setIsLoggedIn} /> 
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;