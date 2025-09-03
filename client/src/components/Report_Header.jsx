import React from 'react'
import ReportImg from '../assets/reportImg.png'

const Report_Header = () => {
 return (
    <div className='flex flex-col min-h-screen pt-4 md:pt-20'>
         <div className='flex flex-grow flex-col-reverse md:flex-col lg:flex-row w-full max-w-[1190px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]'>
           {/* left side image  */}
           <div className='w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center'>
            <img 
            src={ReportImg} 
            alt="forgot password" 
            height={350}
            width={500}
            loading='lazy'
            className='max-w-full h-auto md:p-5'
            />
   
           </div>
   
           {/* RIght side - Form  */}
           <div className='w-full lg:w-1/2 md:w-1/2 px-6 lg:px-0 text-black'>
           
           
         </div>
   
       </div>
    </div>
  )
}

export default Report_Header