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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn, user, isAdmin } = useAuth();

  useEffect(() => {
    const handlescroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setIsMobileOpen(false);
    setIsRightMenuOpen(false);
  };

  // ⭐ Role-based menu
  const roleBasedMenuItem = isAdmin
    ? {
        id: "resolve",
        label: "Resolve Issues",
        icon: <FaFileSignature className="inline mr-2" />,
        to: "/admin/issues",
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
    roleBasedMenuItem,
    {
      id: "explore",
      label: "Explore Issue",
      icon: <AiOutlineFundProjectionScreen className="inline mr-2" />,
      to: isAdmin ? "/admin/issues" : "/Explore",
    },
    {
      id: "how",
      label: "How it works",
      icon: <AiFillStar className="inline mr-2" />,
      to: "/howitworks",
    },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[12vw] lg:px-[10vw] ${
          isScrolled ? "bg-white shadow-lg" : "bg-[#f1faff]"
        }`}
      >
        <div className="py-3 flex justify-between items-center">
          {/* Logo */}
          <img src={navlogo} alt="logo" className="h-12" />

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 text-black text-lg font-semibold">
            {MenuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center gap-2 hover:text-sky-500 transition ${
                    activeSection === item.id ? "text-sky-600" : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* User */}
            {isLoggedIn && user ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  {user.username} {isAdmin && "(Admin)"}
                </span>
                <Link to="/userprofile">
                  <FaUserCircle className="text-3xl text-gray-600 hover:scale-110 transition" />
                </Link>
              </div>
            ) : (
              <Link to="/AuthPage" className="hidden lg:flex items-center gap-2">
                <span className="text-gray-700 font-medium">Login</span>
                <FaUserCircle className="text-3xl text-gray-600" />
              </Link>
            )}

            {/* Right Drawer Toggle */}
            <button
              onClick={() => setIsRightMenuOpen(true)}
              className="p-2 rounded-full bg-sky-100 hover:bg-sky-200 shadow"
            >
              <FiMenu className="text-2xl text-sky-600" />
            </button>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              {isMobileOpen ? (
                <FiX
                  className="text-3xl cursor-pointer"
                  onClick={() => setIsMobileOpen(false)}
                />
              ) : (
                <FiMenu
                  className="text-3xl cursor-pointer"
                  onClick={() => setIsMobileOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <ul className="flex flex-col gap-4">
              {MenuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => handleMenuClick(item.id)}
                  className="flex items-center gap-2 text-gray-700"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ================= RIGHT DRAWER ================= */}
      {isRightMenuOpen && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsRightMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl p-6 animate-slideIn flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <FiX
                className="text-2xl cursor-pointer"
                onClick={() => setIsRightMenuOpen(false)}
              />
            </div>

            {/* User Info */}
            {isLoggedIn && user && (
              <div className="mb-6 p-4 bg-sky-50 rounded-lg">
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {isAdmin && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded mt-2 inline-block">
                    Admin
                  </span>
                )}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-4 font-medium">
              <Link to="/" onClick={() => handleMenuClick("home")}>🏠 Home</Link>

              {isAdmin ? (
                <>
                  <Link to="/admin/issues" onClick={handleMenuClick}>
                    🛠 Manage Issues
                  </Link>
                  <Link to="/admin/analytics" onClick={handleMenuClick}>
                    📊 Analytics
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Report" onClick={handleMenuClick}>
                    📝 Report Issue
                  </Link>
                  <Link to="/Explore" onClick={handleMenuClick}>
                    🔍 Explore Issues
                  </Link>
                  <Link to="/myactivity" onClick={handleMenuClick}>
                    📁 My Activity
                  </Link>
                </>
              )}

              <Link to="/howitworks" onClick={handleMenuClick}>
                ⭐ How it works
              </Link>
            </div>

            {/* Logout */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/AuthPage";
                }}
                className="mt-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
