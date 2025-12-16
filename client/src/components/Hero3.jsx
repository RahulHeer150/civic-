import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JoinSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // 🔒 PROTECTED JOIN BUTTON
  const handleJoinClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login or register to continue");
      return;
    }

    navigate("/report");
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-row items-center justify-center bg-[#f9f9f9] px-20 py-10 text-center"
    >
      <div className="stats">
        <h1 className="text-7xl font-bold text-black m-0">
          <CountUp
            start={inView ? 0 : null}
            end={10000}
            duration={1.5}
            separator=","
            suffix="+"
          />
        </h1>
        <p className="text-[19px] text-[#666] mt-[10px] mb-[20px]">
          Issues Reported
        </p>
      </div>

      {/* 🔒 Protected Button */}
      <button
        onClick={handleJoinClick}
        className="mx-5 px-[12px] py-[24px] text-xl font-bold rounded-xl text-white bg-[#007bff] cursor-pointer transition-all justify-center hover:bg-[#0056b3]"
      >
        Join CrowdFix Today
      </button>
    </section>
  );
};

export default JoinSection;
