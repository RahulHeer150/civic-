// import React from "react";
// import AboutImg from "../assets/abt.png";
// import underline from "../assets/underline.png"

// const Aboutus = () => {
//   return (

//     <div className="flex flex-col min-h-screen  p-10 mt-10 bg-[#d5def0]">
//        <div className='relative flex justify-center items-center flex-col text-center sm:text-left mb-10 mt-6' data-aos="zoom-out" data-aos-duration="1000">
//             <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center sm:justify-start text-center'>
//               <span className='mr-2'>About Us</span>
//             </h1>
//             <img src={underline} className='absolute top-[-4rem]  sm:top-[-5rem] md:top-[-6rem] lg:top-[-5rem] left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-72' />
//           </div>
//       <div className="flex flex-grow flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1190px] pt-5 md:pt-0 mx-auto justify-between items-center ">
//         {/* left side image  */}
//         <div className="w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center">
//           <img
//             src={AboutImg}
//             alt="forgot password"
//             height={350}
//             width={500}
//             loading="lazy"
//             className="max-w-full h-auto hidden md:block lg:block"
//           />
//         </div>

//         {/* RIght side - Form  */}
//         <div className="w-full lg:w-1/2 md:w-1/2 px-3 lg:px-0 md:px-5">
//           <div className="bg-[#f4f4f4] p-7 md:border-2 md:border-gray-700 md:rounded-xl md:shadow-2xl sm:border-2 sm:border-b-gray-700 sm:rounded-xl sm:shadow-2xl ">
//             <div>
//               <p className="text-xl text-black font-semibold">
//                 At <span>CivicPlus</span>, we believe in the power of community
//                 collaboration to create meaningful change. Founded in 2025, our
//                 mission is to empower citizens to take an active role in shaping
//                 neighborhoods by reporting local issues, voting on solutions,
//                 and tracking progress—all in one easy-to-use platform.
//               </p>

//               <p className="text-lg text-black ">
//                 What sets CivicPlus apart is our commitment to transparency and
//                 innovation. Our platform bridges the gap between residents and
//                 local authorities, enabling faster resolutions and fostering
//                 trust through collective action. We are more than just a
//                 reporting tool—we are a movement that values collaboration,
//                 accountability, and collective effort.
//               </p>

//               <p className="text-lg text-black ">
//                 Our journey began with a simple plan—collaboration, innovation,
//                 accountability—guiding everything we do. These principles ensure
//                 that our platform remains a trusted space where everyone, from
//                 individuals to organizations, can work together to make a
//                 difference.
//               </p>

//               <p className="text-lg text-black ">
//                 Join us in shaping a better future. Whether you’re reporting a
//                 problem, voting on an issue, or exploring solutions, your
//                 participation matters.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Aboutus;

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import about from "../assets/about.png";
import underline from "../assets/underline.png";
import backgroundImage from "../assets/bg-integratedweb-2.svg";
import OurMission from "./OurMission";

gsap.registerPlugin(ScrollTrigger);

const AboutItem = ({ title, isOpen, onClick, content }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);
  

  return (
    // add the about-item class so the parent animation can target all items
    <div className="mb-4 about-item">
      <div
        className={`bg-[#323290] text-white flex items-center justify-between p-4 rounded-full cursor-pointer ${
          isOpen ? "shadow-lg" : ""
        }`}
        onClick={onClick}
      >
        <h3 className="font-semibold text-base md:text-lg lg:text-xl">
          {title}
        </h3>
        <div className="w-8 h-8 bg-white text-[#323290] rounded-full flex items-center justify-center text-lg md:text-xl">
          {isOpen ? "-" : "+"}
        </div>
      </div>
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: contentHeight }}
      >
        <div
          className="bg-white text-[#323290] p-4 rounded-3xl shadow-inner"
          ref={contentRef}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    // animate all .about-item children with a stagger when the about container enters view
    const ctx = gsap.context(() => {
      const items = aboutRef.current?.querySelectorAll(".about-item");
      if (items && items.length) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      title: "Our Mission",
      content:
        "Our mission is to bridge the communication gap between citizens and local government by creating a powerful, transparent platform for crowdsourced action.",
    },
    {
      title: "What We Offer",
      content:
        "Our Platform offers a complete solution to community problems: easy mobile reporting for citizens, prioritization through voting, and a transparent system that delivers vetted, centralized data to local authorities. We ensure government accountability, accelerate problem resolution, and improve the quality of life in every neighborhood.",
    },
    {
      title: "Community and Support",
      content:
        "CivicPlus creates a community-powered network where collective voting prioritizes local issues. We provide users with transparent neighbor support for collective action and offer comprehensive platform assistance through FAQs and direct contact to ensure every resident can easily drive change.",
    },
    {
      title: "Our Features",
      content:
        "CivicPlus delivers essential features that put power in the hands of the community. Users benefit from easy, mobile-first reporting of any local issue, while a community voting system instantly prioritizes the most urgent problems. We provide complete transparency by submitting this vetted data directly to local authorities and publicly tracking the status of every resolution, ensuring accountability and measurable change in your neighborhood.",
    },
    {
      title: "Join Our Community",
      content:
        "Joining is simple. CivicPlus is the collective power of citizens who believe in a more responsive local government. Sign up today to gain the tools to easily report and prioritize the issues that affect your daily life. Your participation turns frustration into measurable, guaranteed action.",
    },
  ];

  const toggleItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      ref={aboutRef}
      className="max-w-md mx-auto rounded-2xl p-8 bg-white shadow-lg background"
    >
      {items.map((item, index) => (
        <AboutItem
          key={index}
          title={item.title}
          isOpen={activeIndex === index}
          onClick={() => toggleItem(index)}
          content={item.content}
        />
      ))}
    </div>
  );
};

const ContentSection = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contentRef}
      className="relative flex justify-center items-center flex-col text-center sm:text-left"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex items-center justify-center sm:justify-start">
        <span className="mr-2">About</span>
        <span className="text-[#ed1f26]">US</span>
      </h1>
      <img
        src={underline}
        className="absolute top-[-4rem] sm:top-[-4rem] md:top-[-5rem] left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-72"
      />
      <img src={about} className="" />
    </div>
  );
};

const Aboutus = () => {
  const layoutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-section", {
        scrollTrigger: {
          trigger: layoutRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={layoutRef} className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          width: "100%",
          height: "120vh",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          transform: "scaleX(-1)",
        }}
      ></div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-6xl mx-auto py-12 px-4 mt-16 mb-0 md:mt-32 md:mb-0 lg:mt-32 lg:mb-24">
        <div className="mt-8 lg:mt-0 lg:ml-8 w-5/6 flex-grow lg:w-full order-2 lg:order-1 animate-section">
          <About />
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow order-1 lg:order-2 w-5/6 m-auto lg:w-full animate-section">
          <ContentSection />
        </div>
      </div>
      <OurMission />
    </div>
  );
};

export default Aboutus;
