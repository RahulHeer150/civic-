import React from 'react';
import heroVideo from '../assets/herobg.mp4';
import { Link } from 'react-router-dom';

const Hero1 = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-start min-h-screen px-10 md:px-20 lg:px-32">
        <div className="max-w-2xl text-white mt-10 md:mt-20">
          <h1 className="text-6xl md:text-7xl font-extrabold text-blue-300 drop-shadow-lg">
            Having an Issue!
          </h1>
          <h3 className="text-5xl md:text-6xl mt-4 font-bold drop-shadow-lg">
            Report It.
          </h3>
          <h3 className="text-4xl md:text-5xl mt-3 font-semibold drop-shadow-lg">
            Vote for Solutions.
          </h3>

          <div className="mt-8 flex gap-6">
            <Link
              to="/report"
              className="px-8 py-4 rounded-md bg-white text-blue-700 font-semibold text-xl hover:bg-gray-200 transition"
            >
              Report an Issue
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 rounded-md bg-gray-200 text-black font-semibold text-xl hover:bg-white transition"
            >
              Explore Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
