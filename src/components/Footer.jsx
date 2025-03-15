import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className=" text-black py-16 w-full mx-auto  bg-[#808285] ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Us */}
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-black">About Us</h2>
          <p className="text-gray-400">
            At Real Estate, we pride ourselves on being a trusted and reputable name in the real estate industry with years of experience.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Contact Info</h2>
          <p className="text-green-400 ">13, Fifth Avenue, New York, NY 101660</p>
          <p className=" text-green-400">contact@info.com</p>
          <p className="text-green-400">555-345-4599</p>
        </div>

        {/* Property Search */}
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Property Search</h2>
          <p className="text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur elit. Donec faucibus, quam sed.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Search Properties"
              className="w-full px-4 py-2 rounded-l-md text-gray-800"
            />
            <button className="bg-green-400 px-4 py-2 rounded-r-md">
              Search
            </button>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Real Estate. All Rights Reserved.
      </div>
    </footer>
      
    </div>
  )
}

export default Footer
