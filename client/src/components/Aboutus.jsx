import React from 'react'
import AboutImg from '../assets/abt.png'

const Aboutus = () => {
  return (
      <div className='flex flex-col min-h-screen pt-4 md:pt-20'>
           <div className='flex flex-grow flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1190px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]'>
             {/* left side image  */}
             <div className='w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center'>
              <img 
              src={AboutImg} 
              alt="forgot password" 
              height={350}
              width={500}
              loading='lazy'
              className='max-w-full h-auto hidden md:block lg:block'
              />
     
             </div>
     
             {/* RIght side - Form  */}
             <div className='w-full lg:w-1/2 md:w-1/2 px-6 lg:px-0'>
             <div className="bg-[#f4f4f4] text-[#333]">
      

      <section className="content">
        <h2>About the CrowdFix</h2>

        <div className="text-section">
          <p>
            At <span>CrowdFix</span>, we believe in the power of community collaboration to create meaningful change. Founded in 2024, our mission is to empower citizens to take an active role in shaping neighborhoods by reporting local issues, voting on solutions, and tracking progress—all in one easy-to-use platform.
          </p>

          <p>
            What sets CrowdFix apart is our commitment to transparency and innovation. Our platform bridges the gap between residents and local authorities, enabling faster resolutions and fostering trust through collective action. We are more than just a reporting tool—we are a movement that values collaboration, accountability, and collective effort.
          </p>

          <p>
            Our journey began with a simple plan—collaboration, innovation, accountability—guiding everything we do. These principles ensure that our platform remains a trusted space where everyone, from individuals to organizations, can work together to make a difference.
          </p>

          <p>
            Join us in shaping a better future. Whether you’re reporting a problem, voting on an issue, or exploring solutions, your participation matters.
          </p>
        </div>
      </section>
    </div>
             
     
             </div>
             
           </div>
     
         </div>
    )
}

export default Aboutus