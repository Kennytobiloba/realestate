import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Review = () => {
  return (
    <div className='w-[90%] mx-auto mt-12 p-8 lg:p-16 grid grid-cols-1 sm:grid-col-2 lg:grid-cols-2 gap-6 bg-white shadow-sm lg:rounded-3xl rounded-2xl'>
      <div>
        <h1 className='text-4xl mb-2 text-green-400'> <FaQuoteLeft /></h1>
        <h3 className="md:text-5xl text-4xl lg:leading-[70px]">Read from clients who have found the
          perfect place where they can create...</h3>
        <div className='h-[1px] bg-green-300 w-8 mt-6'></div>
        <p className='w-full mt-4'>
          Discover testimonials from satisfied clients who have found their dream properties with Real Estate, the trusted experts in helping you find the perfect place to call home.
        </p>
        <button
          className="mt-8 px-6 py-3 text-white font-bold text-sm sm:text-base lg:text-lg rounded-full 
                        bg-green-400 hover:bg-green-600 transition-all duration-300 lg:shadow-lg"
        >
          MORE TESTIMONIALS
        </button>
      </div>

      <div className='flex justify-center'>
        <div className='flex flex-col gap-10 text-[#808285]'>

          {/* Testimonial 1 */}
          <div className='p-6 border-1 shadow-sm rounded-md'>
            <div className='text-yellow-600 flex gap-2 mb-2'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className='text-lg'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id convallis neque. Nam scelerisque placerat orci. Maecenas at pulvinar dui. In fermentum, lectus sed tincidunt ornare, arcu ex convallis sapien, quis vestibulum libero tellus quis nisl.”</p>
            <h3 className='text-lg text-green-400 mt-2'>James Oliver</h3>
          </div>

          {/* Testimonial 2 */}
          <div className='p-6 border-1 shadow-sm rounded-md'>
            <div className='text-yellow-600 flex gap-2 mb-2'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className='text-lg'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id convallis neque. Nam scelerisque placerat orci. Maecenas at pulvinar dui. In fermentum, lectus sed tincidunt ornare, arcu ex convallis sapien, quis vestibulum libero tellus quis nisl.”</p>
            <h3 className='text-lg text-green-400 mt-2'>James Oliver</h3>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Review
