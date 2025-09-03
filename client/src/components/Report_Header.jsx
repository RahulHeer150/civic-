import React from "react";
import ReportImg from "../assets/reportImg.png";

const Report_Header = () => {
  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-10 ">
      <div className="flex flex-grow flex-col-reverse md:flex-col lg:flex-row w-full max-w-[1190px] pt-8 md:pt-0 mx-auto justify-between items-center md:px-5 ">

        <div className="w-full lg:w-1/2 md:w-1/2 px-3 lg:px-0 text-black">
          <header className="relative h-full flex items-center justify-center">
            <div className="w-full p-[20px] text-start">
              <h1 className="text-7xl font-bold m-0 text-blue-700 justify-start"> Report an Issue</h1>
              <h3 className="text-4xl mt-[10px] text-black justify-start font-bold">Describe the problem,</h3>
              <h3 className="text-4xl mt-[10px] text-black justify-start font-bold">provide location details,</h3>
              <h3 className="text-4xl mt-[10px] text-black justify-start font-bold">
                and add a photo to help the community understand the issue.
              </h3>
            </div>
          </header>
        </div>
       <div className="w-full lg:w-1/2 md:w-1/2 flex jsutify-center items-center">
          <img
            src={ReportImg}
            alt="forgot password"
            height={350}
            width={500}
            loading="lazy"
            className="max-w-full h-auto md:px-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Report_Header;
