import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgb(30,144,255)] text-white font-sans px-10 pt-5 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6 font-bold m-0">Follow Us and Stay Inspired!</h1>
        <a
          href="https://linkedin.com"
          className="text-[##1e3a8a] text-4 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white hover:bg-gray-200 hover:text-[#1e3a8a] hover:scale-110 transition-colors duration-300 ease-in-out
"
          target="_blank"
          rel="noopener noreferrer"
        >
          {FaLinkedinIn}
        </a>
      </div>

      <div className="w-full h-[2px] bg-white mt-4"></div>

      <div className="flex justify-between items-center flex-wrap gap-4 md:flex-col text-center">
        <div className="footer-logo">
          <img
            src="" // Replace with the actual logo URL
            alt="CrowdFix Logo"
            className="h-[40px]"
          />
        </div>
        <div className="text-2">
          CrowdFix.com &copy; 2024. All rights reserved.
        </div>
        <div className="flex gap-4 md:justify-center">
          <a to="#about" className="text-white text-4 transition-colors duration-300 ease">About Us</a>
          <a href="#contact" className="text-white text-4 transition-colors duration-300 ease">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;