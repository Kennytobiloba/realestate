import Image from 'next/image'
import React from 'react'
import img from "../components/assests/woman.jpg"

const Connect = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 shadow-sm w-[90%]   mx-auto gap-6    mt-10 custom-range:h-auto lg:h-[100vh]'>

      {/* Image Container */}
      <div className='w-full h-full relative lg:h-auto sm:h-full custom-range:h-auto'>
        <Image
          src={img}
          alt='img'
          layout='fill'
          className='object-cover w-full h-full rounded-xl'
        />
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-4xl sm:text-5xl lg:leading-[70px]">
          Connecting people with perfect homes is our passion.
        </h3>
        <div className='h-[1px] bg-green-300 w-8 mt-6'></div>
        <p className='w-full mt-4 text-sm sm:text-base'>
          With a genuine passion for helping people find their dream homes, we are dedicated to connecting buyers and sellers in the real estate market. Trust us to make your home buying or selling experience seamless and satisfying.
        </p>
        <button
          className="mt-8 px-6 py-3 text-white font-bold text-sm sm:text-base lg:text-lg rounded-full 
          bg-green-400 hover:bg-green-600 transition-all duration-300 "
        >
          Read MORE
        </button>
      </div>

    </div>
  )
}

export default Connect
