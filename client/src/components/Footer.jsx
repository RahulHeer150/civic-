
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../assets/mainlogo.png";
//import { useAuth } from '../store/auth';  // Adjust this import path to wherever your useAuth hook is located

const Footer = () => {
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();

  // const handleNavigation = (link) => {
  //   if (isLoggedIn) {
  //     navigate(link);
  //   } else {
  //     navigate('/login');
  //   }
  // };

  return (
    <div className="bg-[#f1f0fe] ">
      {/* Wave section */}
      <div
        className="relative inline-block w-full h-[100px] sm:h-[150px] -mt-[50px] sm:-mt-[100px] overflow-hidden z-5"
        style={{
          animation: "move-wave 3s ease-in-out 1s both",
          WebkitAnimation: "move-wave 3s ease-in-out 1s both",
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,80 C150,120 350,40 500,90 L500,150 L0,150 Z"
            style={{ stroke: "none", fill: "#f1f0fe" }}
          />
        </svg>
      </div>

      {/* Footer content */}
      <footer className="p-3 sm:p-10 text-black flex flex-wrap justify-evenly">
        <div className="mb-6 max-w-xs text-center sm:text-left">
          <img
            src={MainLogo}
            className="w-35 sm:w-40 mb-6 sm:mb-10 mx-auto sm:mx-0"
          />
          <p className="text-sm sm:text-base">
            CivicPlus is the platform where your voice drives local change.
            Easily report issues like broken roads and pollution, vote with your
            neighbors to prioritize the most urgent problems, and ensure local
            governments take action based on the real needs of the community.{" "}
          </p>
        </div>
        <div className="mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">GET HELP</h4>
          <ul>
            <li className="mb-2 text-sm sm:text-lg">
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <button className="hover:underline">Contact Us</button>
            </li>
          </ul>
        </div>
        <div className="mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">RESOURCES</h4>
          <ul>
            <li className="mb-2 text-sm sm:text-lg">
              <a to="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <button onClick="" className="hover:underline">
                Report-Issue
              </button>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <button onClick="" className="hover:underline">
                Syllabus
              </button>
            </li>
            <li className="mb-2 text-sm sm:text-lg">
              <button onClick="" className="hover:underline">
                AboutUs
              </button>
            </li>
          </ul>
        </div>
        <div className="mb-6 text-center sm:text-left">
          <h4 className="mb-4 font-semibold text-lg sm:text-xl">CONTACT US</h4>
          <p className="text-sm sm:text-lg mb-2">
            <strong>
              <FontAwesomeIcon icon={faPhone} />
            </strong>{" "}
            +91 6284938665
          </p>
          <p className="text-sm sm:text-lg mb-2">
            <strong>
              <FontAwesomeIcon icon={faEnvelope} />
            </strong>{" "}
            rahulheer344@gmail.com
          </p>
        </div>
        <div className="w-full text-center mt-6 text-sm sm:text-lg">
          <p>COPYRIGHT &copy; ALL RIGHTS RESERVED 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
