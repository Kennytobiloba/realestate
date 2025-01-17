import React from 'react'
import Image from 'next/image'
import estateImg from '../components/assests/estate.jpg'
import Nav from './Nav'

const Posthouse = () => {
  return (
    <div className="relative min-h-screen">
        <div className=' relative z-10'>
        <Nav/>
        </div>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={estateImg}
          alt="Estate"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-60" // Adjust opacity for background visibility
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
      </div>

      {/* Form centered on top of the background */}
      <div className="relative flex justify-center items-center min-h-screen z-10">
        <div className="bg-white mt-28 p-8 rounded-lg shadow-lg w-full max-w-2xl opacity-90">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create a Listing</h1>

          <form className="space-y-6 mt-4">
            {/* Name and Address Input (2 per row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-lg
                 text-teal-600">Name of the Property</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="address" className="font-medium text-lg
                 text-teal-600">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter property address"
                  required
                />
              </div>
            </div>

            {/* Description Input (Full-width) */}
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium text-lg
               text-teal-600">Description</label>
              <textarea
                id="description"
                name="description"
                className="border p-2 rounded-md shadow-md
                 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter property description"
                rows={4}
                required
              />
            </div>

            {/* Image Upload and Category (2 per row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="image" className="font-medium text-lg
                 text-teal-600">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="border p-2 rounded-md shadow-md
                   focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

            </div>

            {/* Property Type (Checkboxes) (2 per row) */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sell"
                  name="sell"
                  className="mr-2"
                />
                <label htmlFor="sell" className="text-teal-600">Sell</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  className="mr-2"
                />
                <label htmlFor="rent" className="text-teal-600">Rent</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  className="mr-2"
                />
                <label htmlFor="parking" className="text-teal-600">Parking</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  className="mr-2"
                />
                <label htmlFor="furnished" className="text-teal-600">Furnished</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="other"
                  name="other"
                  className="mr-2"
                />
                <label htmlFor="other" className="text-teal-600">Other</label>
              </div>
            </div>

            {/* Price and Baths Input (2 per row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="price" className="font-medium text-lg text-teal-600"> Regular Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="font-medium text-lg text-teal-600"> Discount Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="border p-2 rounded-md shadow-md focus:outline-none
                   focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="bath" className="font-medium text-lg text-teal-600">Number of Baths</label>
                <input
                  type="number"
                  id="bath"
                  name="bath"
                  className="border p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter number of baths"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bath" className="font-medium text-lg text-teal-600">Number of Beds</label>
                <input
                  type="number"
                  id="bath"
                  name="bath"
                  className="border p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter number of baths"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Posthouse
