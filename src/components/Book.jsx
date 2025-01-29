import React from 'react';
import img from "../components/assests/estate.jpg";
import Image from 'next/image';

const Book = () => {
  return (
    <div className='book w-[90%] mx-auto mt-10 rounded-3xl book'>
      {/* Image */}
      {/* <div className='absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl'>
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          alt="img"
        />
      </div> */}
      {/* <div className="absolute inset-0 bg-opacity-50 bg-black rounded-3xl"></div> */}

      {/* White background container with content */}
      <div className='w-full h-full z-50 flex items-center justify-center  lg:p-10 '>
        <div className='w-4/5 mx-auto py-20 bg-white z-50 rounded-lg p-6'>
          <h1 className='text-2xl text-center'>Contact Us</h1>
          <h1 className='lg:text-4xl md:text-3xl text-2xl text-center'>Schedule an Appointment</h1>
          <div className='bg-green-400 h-[0.8px] mx-auto w-10 mt-4'></div>
          <form className='w-full mt-6'>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Write your message here"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-bold text-lg rounded-full bg-green-400 hover:bg-green-600 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
