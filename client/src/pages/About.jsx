import React from "react";

const About = () => {
  return (
    <div>
      <div className="min-h-screen bg-white mt-20 ">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative flex justify-center items-center flex-col text-center sm:text-left mb-10 mt-6"
            data-aos="zoom-out"
            data-aos-duration="1000"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center sm:justify-start text-center">
              <span className="mr-2">About Us</span>
            </h1>
            <img
              src={underline}
              className="absolute top-[-4rem]  sm:top-[-5rem] md:top-[-6rem] lg:top-[-5rem] left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-72"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
