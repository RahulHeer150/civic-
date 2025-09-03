import React from 'react'
import MissionImg from '../assets/Mission.png'

const OurMission = () => {
    return (
        <section className="w-full bg-white text-gray-900 py-16 px-3 md:px-10">
            <div className="max-w-7xl mx-auto gap-10 items-center md:flex">
                {/* Left Side - Content */}
                <div className="
                    w-full md:w-full mb-10  p-6
                    md:shadow-lg md:border-4 md:border-blue-600 md:rounded-2xl
                    lg:border-0 lg:rounded-none lg:shadow-none
                ">
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

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 h-auto bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
                    <img 
                        src={MissionImg} 
                        alt="Our Mission" 
                        height={500}
                        width={500}
                        loading='lazy'
                        className="max-w-full h-auto hidden md:block"
                    />
                </div>
            </div>
        </section>
    );
}

export default OurMission