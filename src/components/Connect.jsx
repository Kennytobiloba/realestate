import Image from 'next/image'
import React from 'react'
import img from "../components/assests/woman.jpg"

const Connect = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 bg-white shadow-sm
     p-8 lg:px-10 w-[90%] mx-auto lg:rounded-3xl rounded-2xl gap-6 mt-10 lg:h-[100vh]'>

      <div className='w-full relative h-64 sm:h-full'>
        <Image
          src={img}
          objectFit='cover'
          layout='fill'
          alt='img'
          className='rounded-xl' // Optional: adds rounded corners to the image
        />
      </div>

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
