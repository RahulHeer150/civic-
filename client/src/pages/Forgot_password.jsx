import React from 'react'


const Forgot_password = () => {
  return (
    <div className='flex flex-col min-h-screen pt-4 md:pt-20'>
      <div className='flex-grow flex flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1160px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]'>
        {/* leftside img */}
        <div className='w-full lg:w-1/2 md:w-1/2 flex justify center items-center '>
        <img src={loginImg} 
        alt="pattren"
        width={500}
        height={350}
        loading='lazy'
        className='max-w-full h-auto hidden md:block lg:block' />
        </div>
      </div>

    </div>
  )
}

export default Forgot_password