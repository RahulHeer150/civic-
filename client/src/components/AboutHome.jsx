import React, { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import about from '../assets/about.png';
import underline from '../assets/underline.png';
import backgroundImage from '../assets/bg-integratedweb-2.svg';

const AboutItem = ({ title, isOpen, onClick, content }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="mb-4">
      <div
        className={`bg-[#323290] text-white flex items-center justify-between p-4 rounded-full cursor-pointer ${isOpen ? 'shadow-lg' : ''}`}
        onClick={onClick}
      >
        <h3 className="font-semibold text-base md:text-lg lg:text-xl">{title}</h3>
        <div className="w-8 h-8 bg-white text-[#323290] rounded-full flex items-center justify-center text-lg md:text-xl">
          {isOpen ? '-' : '+'}
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

  const items = [
    {
      title: "Our Mission",
      content: "Our mission is to bridge the communication gap between citizens and local government by creating a powerful, transparent platform for crowdsourced action."
    },
    {
      title: "What We Offer",
      content: "Our Platform offers a complete solution to community problems: easy mobile reporting for citizens, prioritization through voting, and a transparent system that delivers vetted, centralized data to local authorities. We ensure government accountability, accelerate problem resolution, and improve the quality of life in every neighborhood."
    },
    
    {
      title: "Community and Support",
      content: "CivicPlus creates a community-powered network where collective voting prioritizes local issues. We provide users with transparent neighbor support for collective action and offer comprehensive platform assistance through FAQs and direct contact to ensure every resident can easily drive change."
    },
    {
      title: "Our Features",
      content: "CivicPlus delivers essential features that put power in the hands of the community. Users benefit from easy, mobile-first reporting of any local issue, while a community voting system instantly prioritizes the most urgent problems. We provide complete transparency by submitting this vetted data directly to local authorities and publicly tracking the status of every resolution, ensuring accountability and measurable change in your neighborhood."
    },
    {
      title: "Join Our Community",
      content: "Joining is simple. CivicPlus is the collective power of citizens who believe in a more responsive local government. Sign up today to gain the tools to easily report and prioritize the issues that affect your daily life. Your participation turns frustration into measurable, guaranteed action."
    },
  ];

  const toggleItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration
}, []);

  return (
    <div className="max-w-md mx-auto rounded-2xl p-8 bg-white shadow-lg background" data-aos="fade-up" >
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

const ContentSection = () => (
 
  
    <div className='relative flex justify-center items-center flex-col text-center sm:text-left' data-aos="zoom-out">
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold flex items-center justify-center sm:justify-start' >
        <span className='mr-2'>About</span>
        <span className='text-[#ed1f26]'>US</span>
      </h1>
      <img src={underline} className='absolute top-[-4rem] sm:top-[-4rem] md:top-[-5rem] left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-72' />
      <img src={about} className='pt-10 sm:pt-12 md:pt-20 mx-auto' />
    </div>
  
  
  
  
);

const AboutLayout = () => (
  
  <div className="relative overflow-hidden ">
    <div className="absolute inset-0 z-[-1]" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '120vh',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      transform: 'scaleX(-1)',
    }}></div>
    <div className="flex  flex-col lg:flex-row items-center lg:items-start justify-between max-w-6xl mx-auto py-12 px-4 mt-16 mb-0   md:mt-32 md:mb-0 lg:mt-32 lg:mb-24">
     <div className='mt-8 lg:mt-0 lg:ml-8 w-5/6 flex-grow lg:w-full order-2 lg:order-1 ' >
      <About />

     </div>
     
      <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow order-1 lg:order-2 w-5/6 m-auto lg:w-full">
        <ContentSection />
      </div>
    </div>
  </div>
);

export default AboutLayout;
