import React from "react";
import bgImage from "../components/assests/estate.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative max-w-full  md:h-screen h-[70vh]">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Hotel"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className=" absolute inset-0 bg-opacity-50 bg-black"> </div>

      {/* Ensure the button and text are above the image using z-index */}
      <div className="absolute inset-0 z-10 flex flex-col items-center
       justify-center lg:w-[50%] mx-auto text-center lg:mt-12">
        {/* Responsive heading */}
        <h4 className="text-center capitalize text-sm sm:text-[22px]
         lg:text-xl font-roboto text-white font-bold">
          Discover Your Dream Home with Us
        </h4>
        <h1 className="text-white text-[30px] sm:text-[70px]
         lg:text-[70px] font-semibold mt-2 sm:mt-4 text-center lg:leading-[78px] leading-tight">
          Find the Perfect Property for Your Lifestyle
        </h1>
      </div>

      {/* Position RajLayout directly under the Hero section */}
    </div>
  );
};

export default Hero;
