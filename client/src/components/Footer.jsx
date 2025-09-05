import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgb(30,144,255)] text-white font-sans px-10 pt-5 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6 font-bold m-0">Follow Us and Stay Inspired!</h1>
        <Link
          href="https://linkedin.com"
          className="text-[##1e3a8a] text-4 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white hover:bg-gray-200 hover:text-[#1e3a8a] hover:scale-110 transition-colors duration-300 ease-in-out
"
          target="blank"
          rel="noopener noreferrer"
        >
          {/* {FaLinkedinIn} */}
        </Link>
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
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from "react-router-dom";
// //import MainLogo from "../assets/mainlogo.png";
// //import { useAuth } from '../store/auth';  // Adjust this import path to wherever your useAuth hook is located

// const Footer = () => {
//   // const { isLoggedIn } = useAuth();
//   // const navigate = useNavigate();

//   // const handleNavigation = (link) => {
//   //   if (isLoggedIn) {
//   //     navigate(link);
//   //   } else {
//   //     navigate('/login');
//   //   }
//   // };

//   return (
//     <div className='bg-[#f1f0fe] '>
//       {/* Wave section */}
//       <div
//         className="relative inline-block w-full h-[100px] sm:h-[150px] -mt-[50px] sm:-mt-[100px] overflow-hidden z-5"
//         style={{
//           animation: 'move-wave 3s ease-in-out 1s both',
//           WebkitAnimation: 'move-wave 3s ease-in-out 1s both',
//         }}
//       >
//         <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
//           <path
//             d="M-5.07,73.52 C149.99,150.00 299.66,-102.13 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
//             style={{ stroke: 'none', fill: '#f1f0fe' }}
//           />
//         </svg>
//       </div>

//       {/* Footer content */}
//       <footer className="p-6 sm:p-10 text-black flex flex-wrap justify-evenly">
//         <div className="mb-6 max-w-xs text-center sm:text-left">
//           <img src="" alt="Hoping Minds" className="w-32 sm:w-40 mb-6 sm:mb-10 mx-auto sm:mx-0" />
//           <p className="text-sm sm:text-base">
//             PTU Study Zone is a comprehensive platform designed to simplify the academic experience for students at Punjab Technical University. Whether you're looking for well-organized notes, previous year questions (PYQ), the latest syllabus, or educational resources, everything you need is available in one place.
//           </p>
//         </div>
//         <div className="mb-6 text-center sm:text-left">
//           <h4 className="mb-4 font-semibold text-lg sm:text-xl">GET HELP</h4>
//           <ul>
//             <li className="mb-2 text-sm sm:text-lg">
//               {/* <Link to="/about" className="hover:underline">About</Link> */}
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button className="hover:underline">Contact Us</button>
//             </li>
//           </ul>
//         </div>
//         <div className="mb-6 text-center sm:text-left">
//           <h4 className="mb-4 font-semibold text-lg sm:text-xl">RESOURCES</h4>
//           <ul>
//             <li className="mb-2 text-sm sm:text-lg">
//               <a to="/" className="hover:underline">Home</a>
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button onClick="" className="hover:underline">Report-Issue</button>
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button onClick="" className="hover:underline">Syllabus</button>
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button onClick="" className="hover:underline">PYQ</button>
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button onClick="" className="hover:underline">YouTube</button>
//             </li>
//             <li className="mb-2 text-sm sm:text-lg">
//               <button onClick="" className="hover:underline">Blogs</button>
//             </li>
//           </ul>
//         </div>
//         <div className="mb-6 text-center sm:text-left">
//           <h4 className="mb-4 font-semibold text-lg sm:text-xl">CONTACT US</h4>
//           <p className="text-sm sm:text-lg mb-2"><strong><FontAwesomeIcon icon={faPhone} /></strong> +91 7973</p>
//           <p className="text-sm sm:text-lg mb-2"><strong><FontAwesomeIcon icon={faEnvelope} /></strong> bharal224@gmail.com</p>
//           <p className="text-sm sm:text-lg mb-2"><strong><FontAwesomeIcon icon={faPhone} /></strong> +91 7837189549</p>
//           <p className="text-sm sm:text-lg"><strong><FontAwesomeIcon icon={faEnvelope} /></strong> sahiljamwal2720@gmail.com</p>
//         </div>
//         <div className="w-full text-center mt-6 text-sm sm:text-lg">
//           <p>COPYRIGHT &copy; ALL RIGHTS RESERVED 2024</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
