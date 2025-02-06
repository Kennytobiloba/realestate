"use client"
import React, { useState } from 'react';
import { FiX } from "react-icons/fi";
import Image from 'next/image';
import img from "../components/assests/estate.jpg";
import toast from 'react-hot-toast';

const Book = () => {
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, message} = formData
    if (name === "" || email === "" || message === "") {
      toast.error("All fields are required");
      return;
    }  
    setLoading(true);
    setFormData({
      name: "",
      email: "",
      message: ""
    })

    try {
      const respond = await fetch("/api/appointment", { // ✅ Fix typo in API route
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" } // ✅ Fix "header" to "headers"
      });

      const data = await respond.json();
      if (respond.ok) {
        setSuccessModal(true);
      } 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='book w-[90%] mx-auto mt-10 rounded-3xl'>
        <div className='w-full h-full z-50 flex items-center justify-center lg:p-10'>
          <div className='w-4/5 mx-auto py-20 bg-white z-50 rounded-lg p-6'>
            <h1 className='text-2xl text-center'>Contact Us</h1>
            <h1 className='lg:text-4xl md:text-3xl text-2xl text-center'>Schedule an Appointment</h1>
            <div className='bg-green-400 h-[0.8px] mx-auto w-10 mt-4'></div>

            <form className='w-full mt-6' onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="name"
                  name="name"
                  value={formData.name}
                  className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                <textarea
                  onChange={handleChange}
                  id="message"
                  name="message"
                  value={formData.message}
                  className="w-full px-4 py-2 mt-2 border-b border-gray-300 rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Write your message here"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-bold text-lg rounded-full bg-green-400 hover:bg-green-600 transition-all duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setSuccessModal(false)}
            >
              <FiX size={20} />
            </button>

            <h3 className="text-lg font-bold text-center mb-4">Message sent Successfully!</h3>
            <p className="text-center">Thank you for messaging. Please wait for admin feedback.</p>
            <div className="text-center mt-4">
              <button
                onClick={() => setSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
