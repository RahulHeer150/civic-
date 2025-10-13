import { useState,useContext } from "react";
import React from 'react'
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import axios from "axios";
import UserDataContext from "../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faBuilding, faLocation } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

// import { RotatingLines } from "react-loader-spinner"; // Import the loader component
 const Register = () => {
  const [username, setUsername] = useState(false);
  const [city, setCity] = useState(false);
  const [state, setState] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [password, setPassword] = useState(false);
   const [userId, setUserId] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [otpStep, setOtpStep] = useState(false);
  const {user,setUser} =useContext(UserDataContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Display a loading spinner or some indication that the request is in progress
   // setLoading(true);

   const newUser={
    username:username,
    email:email,
    city:city,
    state:state,
    phone:phone,
    otp:otp
   }
   const response=await axios.post(`${import.meta.env.CLIENT_URL}/users/register`,newUser)

   if(response.status===201){
    const data=response.data

    setUser(data.user)
    localStorage.setItem('token',data.token)
    navigate('/home')
   }
   setUsername('')
   setCity('')
   setState('')
   setEmail('')
   setPhone('')
   setOtpStep('')
   };
return(
  <>
  <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6 text-center border-2 rounded-2xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl">
    <div className="flex flex-col gap-6">
      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="Firstname"
         value={username}
         onChange={setUsername(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faUser}/></span><span>Username</span>
         </label>
      </div>

      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="City"
         value={city}
         onChange={setCity(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faLocation}/></span><span>City</span>
         </label>
      </div>

      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="State"
         value={state}
         onChange={setState(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faBuilding}/></span><span>State</span>
         </label>
      </div>

      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="Email"
         value={email}
         onChange={setEmail(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faEnvelope}/></span><span>Email</span>
         </label>
      </div>
      
       <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="Phone no."
         value={phone}
         onChange={setPhone(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faPhone}/></span><span>Phone no.</span>
         </label>
      </div>

       <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="Password"
         value={password}
         onChange={setPassword(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faLock}/></span><span>Password</span>
         </label>
      </div>

      <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
        <input
         type="text"
         name="OTP"
         value={otp}
         onChange={setOtpStep(e.target.value)}
         placeholder=" "
         className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
         />
         <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
          <span><FontAwesomeIcon icon={faListOl}/></span><span>OTP</span>
         </label>
      </div>
    </div>
<button
          type="submit"
          className="py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto  block  bg-gradient-to-r from-blue-700 to-sky-300   transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            </div>
          ) : (
            "Register Now"
          )}
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already registered? <Link to="/login" className="text-sky-500 font-semibold hover:underline">Login</Link>
        </p>
  </form>

  </>

) };


export default Register