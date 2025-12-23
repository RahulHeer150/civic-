import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import navlogo from "../assets/mainlogo.png";

const Navbar = () => {
  const location = useLocation();
 const { isLoggedIn, user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
  return null; // or loader
}

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ FIX: Proper scroll state
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  handleScroll(); // IMPORTANT
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname, isLoggedIn]); // 👈 KEY FIX

  // ✅ Close dropdown on outside click (safe)
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // future dropdown support
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Correct logic
  const isScrolledOrNotHome = isScrolled || location.pathname !== "/";

  const navbarBg = isScrolledOrNotHome
    ? "bg-white shadow-md"
    : "bg-transparent";

  const textColor = isScrolledOrNotHome
    ? "text-sky-600"
    : "text-white";

  const padding = isScrolledOrNotHome ? "py-2" : "py-4";

  const underlineColor = isScrolledOrNotHome
    ? "before:bg-sky-600"
    : "before:bg-white";

  const roleLink = isAdmin
    ? { label: "Resolve Issues", to: "/admin" }
    : { label: "Report Issue", to: "/report" };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} ${padding}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={navlogo} alt="logo" className="h-12" />
          </Link>

          {/* MOBILE MENU */}
          <button
            className={`lg:hidden ${textColor}`}
            onClick={() => setIsHamburgerOpen(true)}
          >
            ☰
          </button>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: "Home", to: "/" },
              roleLink,
              { label: "Explore", to: isAdmin ? "/admin/issues" : "/explore" },
              { label: "How it Works", to: "/howitworks" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative font-medium ${textColor}
                  before:content-[''] before:absolute before:left-0 before:-bottom-1
                  before:h-[2px] before:w-full before:scale-x-0
                  hover:before:scale-x-100 before:origin-left
                  transition-all duration-300 ${underlineColor}`}
              >
                {item.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <span className={`font-medium ${textColor}`}>
                  {user?.username}
                </span>
                <Link to="/userprofile" className={textColor}>
                  Profile
                </Link>
              </>
            ) : (
              <Link
                to="/AuthPage"
                className={`px-5 py-2 border rounded-xl font-semibold
                ${textColor} hover:bg-sky-500 hover:text-white transition`}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
      {/* MOBILE SLIDE MENU */}
<div
  className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden
  ${isHamburgerOpen ? "translate-x-0" : "-translate-x-full"}`}
>
  <div className="flex justify-end p-6">
    <button
      className="text-2xl"
      onClick={() => setIsHamburgerOpen(false)}
      aria-label="Close menu"
    >
      ✕
    </button>
  </div>

  <nav className="flex flex-col items-center gap-6 font-semibold text-sky-600 mt-10">
    <Link to="/" onClick={() => setIsHamburgerOpen(false)}>
      Home
    </Link>

    <Link to={roleLink.to} onClick={() => setIsHamburgerOpen(false)}>
      {roleLink.label}
    </Link>

    <Link
      to={isAdmin ? "/admin/issues" : "/explore"}
      onClick={() => setIsHamburgerOpen(false)}
    >
      Explore
    </Link>

    <Link to="/howitworks" onClick={() => setIsHamburgerOpen(false)}>
      How it Works
    </Link>

    {isLoggedIn ? (
      <>
        <Link to="/userprofile" onClick={() => setIsHamburgerOpen(false)}>
          Profile
        </Link>
        <Link to="/logout" onClick={() => setIsHamburgerOpen(false)}>
          Logout
        </Link>
      </>
    ) : (
      <Link to="/AuthPage" onClick={() => setIsHamburgerOpen(false)}>
        Login
      </Link>
    )}
  </nav>
</div>

    </header>
  );
};

export default Navbar;
