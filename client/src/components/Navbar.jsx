import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import navlogo from "../assets/mainlogo.png";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn, user, isAdmin } = useAuth();

  useEffect(() => {
    const handlescroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handlemenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  // ⭐ Dynamic role-based menu item
  const roleBasedMenuItem = isAdmin
    ? {
        id: "resolve",
        label: "Resolve Issues",
        icon: <FaFileSignature className="inline mr-2" />,
        to: "/admin",
      }
    : {
        id: "report",
        label: "Report an Issue",
        icon: <AiOutlineUser className="inline mr-2" />,
        to: "/Report",
      };

  const MenuItems = [
    {
      id: "home",
      label: "Home",
      icon: <AiOutlineHome className="inline mr-2" />,
      to: "/",
    },
    roleBasedMenuItem, // injected dynamically based on role
    {
      id: "explore-issue",
      label: "Explore Issue",
      icon: <AiOutlineFundProjectionScreen className="inline mr-2" />,
      to: isAdmin ? "/admin/issues" : "/Explore", // ✅ ONLY CHANGE
    },
    {
      id: "How it Works",
      label: "How it works",
      icon: <AiFillStar className="inline mr-2" />,
      to: "/howitworks",
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full mb-5 shadow-lg shadow-black/20 rounded-lg z-50 transition duration-300 px-[7vw] md:px-[12vw] lg:px-[10vw] bg-[#f1faff] ${
          isScrolled ? "shadow-lg shadow-black" : "bg-[#f1faff]"
        }`}
      >
        <div className="text-white py-3 px-1 flex flex-row justify-between items-center">
          {/* Left side Logo */}
          <img src={navlogo} alt="logo" className="h-13" />

          {/* Center Menu */}
          <ul className="hidden lg:flex space-x-8 text-black ml-8 text-xl font-bold">
            {MenuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-sky-400 ${
                  activeSection === item.id ? "text-sky-500" : ""
                }`}
              >
                <Link
                  className="flex items-center gap-2 border-transparent pb-2 hover:text-sky-400 transition-all duration-300"
                  to={item.to}
                  onClick={() => handlemenuClick(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Profile / Login */}
          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  {user.username} {isAdmin && "(Admin)"}
                </span>
                <Link to="/userprofile" className="relative group">
                  <div className="w-11 h-11 rounded-full bg-sky-100 flex items-center justify-center hover:bg-sky-200 transition-all duration-300 shadow-md">
                    <FaUserCircle className="text-gray-600 text-2xl group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            ) : (
              <Link
                to="/AuthPage"
                className="relative group flex items-center gap-2"
              >
                <span className="text-gray-700 font-medium">Login</span>
                <div className="w-11 h-11 rounded-full bg-sky-100 flex items-center justify-center hover:bg-sky-200 transition-all duration-300 shadow-md">
                  <FaUserCircle className="text-gray-600 text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>
            )}

            {/* Hamburger for mobile */}
            <div className="lg:hidden">
              {IsOpen ? (
                <FiX
                  className="text-3xl text-sky-400 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <FiMenu
                  className="text-3xl text-sky-400 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {IsOpen && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-4 text-white">
              {MenuItems.map((item) => (
                <li key={item.id} className="cursor-pointer">
                  <Link
                    className="flex items-center gap-2 border-b-4 border-transparent hover:border-white hover:text-gray-300 transition-all duration-200"
                    to={item.to}
                    onClick={() => handlemenuClick(item.id)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
              {isLoggedIn && user && (
                <li className="text-gray-800 font-medium">{user.username}</li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
