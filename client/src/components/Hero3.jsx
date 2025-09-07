import React from "react";
import "./Join.css"; // Adjust the path based on your project structure

const JoinSection = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-[#f9f9f9] px-20 py-10 text-center">
      <div className="stats">
        <h1 className="text-7xl font-bold text-[#333] m-0">10,000+</h1>
        <p className="text-[19px] text-[#666] mt-[10px] mb-[20px]">Issues Reported</p>
      </div>
      <button className="py-[12px] px-[24px] text-xl text-[#fff] bg-[#007bff] cursor-pointer transition-all hover:bg-#0056b3">Join CrowdFix Today</button>
    </section>
  );
};

export default JoinSection;