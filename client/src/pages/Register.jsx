import { useState } from "react";
import React from 'react'
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

// import { RotatingLines } from "react-loader-spinner"; // Import the loader component
 const Register = () => {
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    City:" ",
    State:"",
    email: "",
    phone: "",
    password: "",
    otp: "",
    userId: "" 
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Display a loading spinner or some indication that the request is in progress
    setLoading(true);
  


   };
return(
  <>
  <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6 text-center border-2 rounded-2xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl">
    <div className="grid grid-cols-2 gap-6">
      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="Firstname"
         value={user.Firstname}
         onChange={handleInput}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faUser}/></span><span>FirstName</span>
         </label>
      </div>
    </div>
  </form>

  </>

) };


export default Register