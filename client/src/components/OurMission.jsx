import React from 'react'
import MissionImg from '../assets/Mission.png'

const OurMission = () => {
    return (
    <section className="w-full bg-white text-gray-900 py-16 px-6 md:px-20">
      <div className="w-1/2 mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Content */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            At <span className="font-semibold text-blue-600">CrowdFix</span>, our mission is to empower citizens, 
            drive transparency, and use technology to turn issues into solutions. 
            We believe every report matters and every voice counts.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Together, we aim to build cleaner, safer, and stronger communities 
            where civic engagement leads to meaningful action.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From problems to progress — we are uniting people and technology 
            for real change.
          </p>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center">
         <img
                    src={MissionImg}
                    alt="Mission_image"
                    height={500}
                    width={500}
                    loading="lazy"
                    className="max-w-full h-auto md:px-5"
                  />
        </div>

      </div>
    </section>
  );
  
}
export default OurMission