import React from "react";
import { FaRegEdit, FaThumbsUp, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  { icon: <FaRegEdit aria-label="Report Icon" />, title: "Report", description: "Users submit an issue" },
  { icon: <FaThumbsUp aria-label="Vote Icon" />, title: "Vote", description: "Community upvotes problems" },
  { icon: <FaMapMarkerAlt aria-label="Track Icon" />, title: "Track", description: "See updates on issues" },
  { icon: <FaCheckCircle aria-label="Solve Icon" />, title: "Solve", description: "Authorities take action" },
];

const HowItWorks = () => {
  return (
    <section className="text-center py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <article
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 
                       w-full max-w-xs mx-auto"
          >
            {/* Icon container (flex + center) */}
            <div className="flex justify-center items-center text-4xl text-blue-600 mb-4">
              {step.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
