import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {FaUser, FaEnvelope , FaPhone , FaMobile , FaBuilding , FaListOl , FaLocationArrow} from "react-icons/fa"

const Update_user = () => {
  const [data,setData]=useState({
    username:"",
    city:"",
    state:"",
    Email:"",
    Phone :"",
  });
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
  }
  const handleInput=(e)=>{
    const { name , value } = e.target;
    setData({...data,[name]:value});
  }
    return(
    <>
    <br />
    <div className="flex justify-center items-center min-h-screen bg-[#fbfbfb] px-4 pt-10 md:pt-0">
      <div className="grid gird-cols-1 md:grid-cols-1 items-center gap-10 max-w-screen-lg w-full md:w-5/6 lg:w-3/6">
         <div className='w-5/6 justify-self-center md:w-full bg-white rounded-[40px] p-8 shadow-lg'>
             <div className='relative flex justify-center items-center flex-col text-center sm:text-left mb-10 mt-6'>
                <h1>
                  Update Profile
                </h1>
                {/* underline img  */}
             </div>
             <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
              <div className='flex flex-col md:flex-col gap-6'>

                <div className='flex flex-col '>
                  <label htmlFor="Username" className='flex ml-2 text-xl pr-1 font-semibold'>
                   <span><FaUser className='inline-block mr-2 '/></span><span>Username</span>
                  </label>

                  <input
                   type="text"
                   name='username'
                   id='username'
                   value={data.username}
                   onChange={handleInput}
                   required
                   className='w-full bg-white p-4 rounded-[20px] shadow-sm border placeholder:text-gray-500 focus:outlinr-none focus:border-blue-400' />
                </div>

                 <div className='flex flex-col'>
                  <label htmlFor="Username" className='flex ml-2 font-semibold'>
                   <span><FaBuilding className='inline-block mr-2 '/></span><span>City</span>
                  </label>

                  <input
                   type="text"
                   name='city'
                   id='city'
                   value={data.city}
                   onChange={handleInput}
                   required
                   className='w-full bg-white p-4 rounded-[20px] shadow-sm border placeholder:text-gray-500 focus:outlinr-none focus:border-blue-400' />
                </div>

                 <div className='flex flex-col'>
                  <label htmlFor="Username" className='flex ml-2 font-semibold'>
                   <span><FaLocationArrow className='inline-block mr-2 '/></span><span>State</span>
                  </label>

                  <input
                   type="text"
                   name='state'
                   id='state'
                   value={data.state}
                   onChange={handleInput}
                   required
                   className='w-full bg-white p-4 rounded-[20px] shadow-sm border placeholder:text-gray-500 focus:outlinr-none focus:border-blue-400' />
                </div>

                 <div className='flex flex-col'>
                  <label htmlFor="Username" className='flex ml-2 font-semibold'>
                   <span><FaEnvelope className='inline-block mr-2 '/></span><span>Email</span>
                  </label>

                  <input
                   type="text"
                   name='Email'
                   id='email'
                   value={data.Email}
                   onChange={handleInput}
                   required
                   className='w-full bg-white p-4 rounded-[20px] shadow-sm border placeholder:text-gray-500 focus:outlinr-none focus:border-blue-400' />
                </div>

                 <div className='flex flex-col'>
                  <label htmlFor="Username" className='flex ml-2 font-semibold'>
                   <span><FaPhone className='inline-block mr-2 '/></span><span>Phone no.</span>
                  </label>

                  <input
                   type="text"
                   name='phone'
                   id='phone'
                   value={data.Phone}
                   onChange={handleInput}
                   required
                   className='w-full bg-white p-4 rounded-[20px] shadow-sm border placeholder:text-gray-500 focus:outlinr-none focus:border-blue-400' />
                </div>

              </div>
            <button
            type='submit'
            className='block w-full font-bold bg-gradient-to-r from-purple-500 to-red-500 text-white py-4 mt-6 rounded-[20px] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95'>
              Update
            </button>

             </form>

         </div>

      </div>
    </div>
    </>
  )  
}

export default Update_user