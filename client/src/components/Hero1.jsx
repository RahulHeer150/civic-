import React, { useEffect, useRef } from "react";
import heroVideo from "../assets/herobg.mp4";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔐 Auth check helper
const isLoggedIn = () => !!localStorage.getItem("token");

const Hero1 = () => {
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure visible even if animation fails
    gsap.set([textRef.current?.children, btnRef.current?.children], {
      opacity: 1,
      y: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // Animate heading text
    tl.from(textRef.current.children, {
      y: -80,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Animate buttons
    tl.from(
      btnRef.current.children,
      {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // 🔒 Protect Report button
  const handleReportClick = (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      toast.warn("Please login or register to report an issue");
      return;
    }

    navigate("/report");
  };

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
      <div className="relative z-20 flex flex-col justify-center items-start min-h-screen px-10 md:px-20 lg:px-32">
        <div ref={textRef} className="max-w-2xl text-white mt-10 md:mt-20">
          <h1 className="text-6xl md:text-7xl font-extrabold text-blue-300 drop-shadow-lg">
            Having an Issue!
          </h1>
          <h3 className="text-5xl md:text-6xl mt-4 font-bold drop-shadow-lg">
            Report It.
          </h3>
          <h3 className="text-4xl md:text-5xl mt-3 font-semibold drop-shadow-lg">
            Vote for Solutions.
          </h3>

          <div ref={btnRef} className="mt-8 flex gap-6 opacity-100">
            {/* 🔒 Protected Report Button */}
            <button
              onClick={handleReportClick}
              className="px-8 py-4 rounded-md bg-white text-blue-700 font-semibold text-xl hover:bg-gray-200 transition"
            >
              Report an Issue
            </button>

            {/* Explore Button (Unchanged) */}
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
