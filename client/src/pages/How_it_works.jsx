import React from "react";
import { FaLaptop, FaThumbsUp, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "./icons.css"; // Adjust the path based on your project structure

const HowItWorks = () => {
  const items = [
    {
      icon: <FaLaptop className="icon" />, 
      title: "Report", 
      description: "Identify and report an issue in your community to ensure it gets noticed and addressed by the right authorities. Reporting helps bring attention to problems that matter most to you."
    },
    {
      icon: <FaThumbsUp className="icon" />, 
      title: "Vote", 
      description: "Engage with the community by voting on the most pressing issues to help prioritize them effectively. Your votes can guide decision-makers to focus on what truly matters."
    },
    {
      icon: <FaClipboardList className="icon" />, 
      title: "Track", 
      description: "Stay informed by tracking the progress and updates on the issues you care about. Transparency ensures that you remain updated on the actions being taken."
    },
    {
      icon: <FaCheckCircle className="icon" />, 
      title: "Solve", 
      description: "Celebrate as authorized parties take action and resolve the problems for a better community. Witness the positive change brought about through collaboration and action."
    }
  ];

  return (
    <div className="p-4 text-center">
      <h1 className="text-6 text-[#2c3e50] mb-4">How It Works</h1>
      <p className="text-[1.2rem] text-[#34495e] mb-4">Our platform is designed to bring communities together to identify, prioritize, and resolve pressing issues efficiently. Here's a step-by-step guide to understanding how you can make a difference:</p>
      <div className="items-container">
        {items.map((item, index) => (
          <div key={index} className="item">
            {item.icon}
            <div className="text">
              <h2 className="item-title">{item.title}</h2>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="extra-info">
        <h2>Join Us</h2>
        <p>Be part of a proactive community committed to making impactful changes. Whether you're reporting issues, voting on priorities, or tracking progress, every step you take contributes to building a better future.</p>
        <h2>Why It Matters</h2>
        <p>Your involvement ensures that essential issues are addressed promptly and effectively. By working together, we can create transparent and actionable solutions for everyone.</p>
      </div>
    </div>
  );
};

export default HowItWorks;

