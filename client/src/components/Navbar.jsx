import React, { useRef, useState } from 'react'
import {Link, useLocation} from 'react-router-dom';
import { faCaretDown }  from '@fortawesome/free-solid-svg-icons'
import { faFontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navbar = () => {
    const location=useLocation();
    const [isOpen, setIsOpen]=useState(false);
    const [isHamburgerOpen , setIsHamburgerOpen]=useState(false);
    const [navbarBg, setNavbarBg]=useState("bg-transparent");
    const[textColor, setTextColor]=useState("text-white");
    const [padding, setPadding]=useState("py-4 md:py-6");
    const [underlineColor,setUnderlineColor]=useState("before:bg-white");
    const[JoinBtnHoverBg, setJoinBtnHoverBg]=useState("hover:bg-white");
    const[JoinBtnHoverText, setJoinBtnHoverText]=useState("hover:text-black");

    const[dropdownBg, setDropdownBg]=useState("bg-transparent");
    const[isResourceOpen, setIsResourceOpen] = useState(false);
    const dropdownRef=useRef(null);

      const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsResourceOpen(false);
    }
  };
    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 || location.pathname !== "/") {
        setNavbarBg("bg-white border-b-2 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl");
        setTextColor("text-[#ed1f26] transition-colors duration-300 ease-in-out hover:text-[#d10b22]");
        setPadding("py-2 transition-all duration-1000 ease-in-out"); // Adjusted height for different devices
        setUnderlineColor("before:bg-[#ed1f26] before:scale-x-0 group-hover:before:scale-x-100 transition-transform duration-300 ease-in-out");
        setJoinBtnHoverBg("hover:bg-[#ed1f26] hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out");
        setJoinBtnHoverText("hover:text-white transition-colors duration-300 ease-in-out");
        setDropdownBg("bg-white border border-[#ed1f26] border-t-transparent shadow-lg rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105");
        

      } else {
        setNavbarBg("bg-transparent");
        setTextColor("text-white");
        setPadding("py-4 transition-all duration-300 ease-in-out"); // Default height
        setUnderlineColor("before:bg-white");
        setJoinBtnHoverBg("hover:bg-white");
        setJoinBtnHoverText("hover:text-black");
        setDropdownBg("bg-black");


      }
    };

    if (location.pathname !== "/") {
      setNavbarBg("bg-white shadow-md");
      setTextColor("text-[#ed1f26]");
      setPadding("py-2");
      setUnderlineColor("before:bg-[#ed1f26]");
      setJoinBtnHoverBg("hover:bg-[#ed1f26]");
      setJoinBtnHoverText("hover:text-white");
      setDropdownBg("bg-white");
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);
  
  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ease-in-out  ${navbarBg} ${padding}`}>
        <div className='relative flex items-center justify-between'>
            <div className='flex-shrink-0'>
                <Link to="/" title='home' className={`text-2xl font-bold transition-all duration-200 rounded font-pj hover:text-opacity-50 ${textColor}`}>
                image
                </Link>
            </div>
        </div>

    </header>
  )
}

export default Navbar