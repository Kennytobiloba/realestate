import React from 'react'
import bgImage from "../../components/assests/home.jpg";
import Image from "next/image";
import Nav from "../../components/Nav";
import FeaturedPropertics from '@/components/FeaturedPropertics';
import Book from '@/components/Book';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <>
    <div>
     <div className="relative w-[90%] mx-auto md:h-screen h-[70vh]
      mt-10 rounded-2xl lg:rounded-3xl  overflow-hidden">
      <Nav />
      {/* Background Image */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Image
          src={bgImage}
          alt="Hotel"
          className="w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="absolute inset-0 bg-opacity-50 bg-black rounded-3xl"></div>

      {/* Ensure the button and text are above the image using z-index */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center lg:w-[50%] mx-auto text-center lg:mt-12">
        {/* Responsive heading */}
        <h4 className="text-center capitalize text-[16px] sm:text-[22px] 
        lg:text-xl font-roboto text-white ">
        Properties
        </h4>
        <h1 className="text-white text-[30px] sm:text-[70px] lg:text-[70px] font-semibold mt-2 sm:mt-4 text-center lg:leading-[78px] leading-tight">
        Looking to Buy, Sell, Rent, Invest or Manage?
        </h1>
        {/* Button */}
       
      </div>
    </div>
    </div>
    <FeaturedPropertics/>
    <Book/>
    <Footer/>
    
    </>
    
  )
}

export default page