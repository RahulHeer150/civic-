import React from 'react'

const Hero1 = () => {
   return (
      <div className='flex flex-col min-h-screen pt-4 md:pt-20'>
           <div className='flex flex-grow flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1190px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]'>
             {/* left side image  */}
             <div className='w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center'>
              <img 
              src={loginImg} 
              alt="forgot password" 
              height={350}
              width={500}
              loading='lazy'
              className='max-w-full h-auto hidden md:block lg:block'
              />
     
             </div>
     
             {/* RIght side - Form  */}
             <div className='w-full lg:w-1/2 md:w-1/2 px-6 lg:px-0 text-black'>
             <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full max-w-md mx-auto text-center border-2 rounded-3xl py-10 lg:py-20 px-6 lg:px-10 shadow-2xl bg-white'>
               <h1 className='text-4xl font-bold mb-4'>Forgot Password</h1>
     
               <div className='relative h-full w-full'>
                 <input
                  type="password"
                  name='newPassword'
                  value={newPassword}
                  onChange={(e)=> setNewPassword(e.target.value)}
                  placeholder=''
                  className='shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50' 
                  required
                  />
                  <label className='pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2 select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]'>
                   <span><FontAwesomeIcon icon={faLock}/></span><span>New Password</span>
                  </label>
     
               </div>
  
               <div className='relative h-full w-full'>
                 <input
                  type="password"
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  placeholder=''
                  className='shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50' 
                  required
                  />
                  <label className='pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2 select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]'>
                   <span><FontAwesomeIcon icon={faLock}/></span><span>Confirm Password</span>
                  </label>
     
               </div>
               <button
               type='submit'
               className={`py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto block bg-gradient-to-r from-purple-500 to-red-500 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95${loading ? " opacity-50 cursor-not-allowed" : ""}`}
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
                     "Reset Password"
                   )}
               </button>
             </form>
     
             </div>
             
           </div>
     
         </div>
    )
}

export default Hero1