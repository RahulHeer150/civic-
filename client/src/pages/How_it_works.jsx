import React from "react";
import { FaLaptop, FaThumbsUp, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const items = [
    {
      icon: <FaLaptop className="text-[3rem]" />,
      title: "Report",
      description:
        "Identify and report an issue in your community to ensure it gets noticed and addressed by the right authorities. Reporting helps bring attention to problems that matter most to you.",
    },
    {
      icon: <FaThumbsUp className="text-[3rem]" />,
      title: "Vote",
      description:
        "Engage with the community by voting on the most pressing issues to help prioritize them effectively. Your votes can guide decision-makers to focus on what truly matters.",
    },
    {
      icon: <FaClipboardList className="text-[3rem]" />,
      title: "Track",
      description:
        "Stay informed by tracking the progress and updates on the issues you care about. Transparency ensures that you remain updated on the actions being taken.",
    },
    {
      icon: <FaCheckCircle className="text-[3rem]" />,
      title: "Solve",
      description:
        "Celebrate as authorized parties take action and resolve the problems for a better community. Witness the positive change brought about through collaboration and action.",
    },
  ];

  return (
    <div className="p-4 text-center mt-20">
      
      {/* Heading */}
      <motion.h1
        className="text-4xl text-blue-950 mb-4 font-bold font-sans"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h1>

      <motion.p
        className="text-[1.2rem] text-black mb-4 px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Our platform is designed to bring communities together to identify, prioritize, 
        and resolve pressing issues efficiently. Here's a step-by-step guide to understanding how you can make a difference:
      </motion.p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="group bg-white border border-gray-200 rounded-2xl p-6 max-w-[300px] shadow-md 
            hover:bg-blue-900 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Scale inner content on hover */}
            <motion.div
              className="flex flex-col items-center transition-all duration-300 text-blue-900 group-hover:text-white"
              whileHover={{ scale: 1.08 }} // scale ONLY the content
            >
              {/* Icon */}
              <motion.div
                transition={{ type: "spring", stiffness: 250 }}
                className="mb-4"
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-2">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 group-hover:text-gray-200">
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Extra Section */}
      <div className="mt-16">
        <motion.h2
          className="text-2xl text-blue-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Join Us
        </motion.h2>

        <motion.p
          className="text-md px-10 m-auto md:py-4 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Be part of a proactive community committed to making impactful changes. Whether you're reporting issues, voting, or tracking progress—your participation builds a better future.
        </motion.p>
      </div>
    </div>
  );
};

export default HowItWorks;
