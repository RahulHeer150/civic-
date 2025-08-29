import { useScroll } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RotatingLines } from 'react-loader-spinner'; // Import the loader component
import { faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  const[loading,setLoading]=useState(false);
  const [credentials,setCredentials]=useState({email:"",password:""})
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

  }
  
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setCredentials((prev)=>({ ...prev, [name]:value}));
  }
  return (
    <>
    <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full max-w-md mx-auto mt-6 text-center border-2 rounded-3xl py-10 lg:py-20 px-6 lg:px-10 shadow-2xl'>
      <div className='relative h-11 w-full'>
        <input
         type="text"
         name='Email'
         value={credentials.email}
         onChange={handleInputChange}
         placeholder=''
         className='shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-t-gray-200 focus:border-[#ed1f26] focus:border-r-transparent focus:border-1-transparent disabled:border-0 disable:bg-gray-50' 
         required
         />
         <label className='pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2 select-none text-[-12px] font-medium leading-tight text-gray-800 outline-none transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]'>
          <span><FontAwesomeIcon icon={faEnvelope}/></span><span>Email</span>

         </label>
         
      </div>

      <div className='relative h-11 w-full'>
        <input
         type="text"
         name='Password'
         value={credentials.password}
         onChange={handleInputChange}
         placeholder=''
         className='shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-t-gray-200 focus:border-[#ed1f26] focus:border-r-transparent focus:border-1-transparent disabled:border-0 disable:bg-gray-50' 
         required
         />
         <label className='pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2 select-none text-[-12px] font-medium leading-tight text-gray-800 outline-none transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]'>
          <span><FontAwesomeIcon icon={faLock}/></span><span>Password</span>

         </label>
         
      </div>
    <button
          type="submit"
          className={`py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto block bg-gradient-to-r from-purple-500 to-red-500 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95${loading ? " opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading} // Disable button while loading
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
            "Login"
          )}
        </button>

        <div className='flex flex-col items-center mt-4 space-y-2'>
          <p className='text-sm text-gray-600'> 
            Forgot your Password?
             <Link to="/Forgot_Password" className='text-[#ed1f26] font-semibold hover:underline'>Click Here</Link>
          </p>

           <p className='text-sm text-gray-600'> 
            New here?
             <Link to="/Register" className='text-[#ed1f26] font-semibold hover:underline'>Sign Up</Link>
          </p>
        </div>


    </form>

    </>
  )
}

export default Login