"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AgentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    officeAddress: "",
  });

  const router = useRouter(); // ✅ Fix navigation
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [successModal, setSuccessModal] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show spinner when submitting

    try {
      const response = await fetch("/api/agent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessModal(true);
        console.log("Form submitted:", formData);
        setTimeout(() => {
          router.push("/"); // ✅ Fix navigation
        }, 2000); // Delay to show modal before navigating
      } else {
        alert("Agent registration failed");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false); // ✅ Hide spinner after submitting
    }

    setFormData({
      name: "",
      businessName: "",
      email: "",
      phoneNumber: "",
      officeAddress: "",
    });
  };

  return (
  <>
    <div className="singlepage flex flex-col items-center justify-center min-h-screen relative">
      {/* Navbar */}
      <div className="z-50 w-full">
        <Nav />
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 md:px-12 mt-6 rounded-lg shadow-lg 
       w-[90%] max-w-md lg:max-w-lg absolute z-20 lg:px-2 px-6">
       <h2 className="text-xl font-bold text-center mb-4">Agent Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
          {/* Name */}
          <div className="lg:col-span-1">
            <label htmlFor="name" className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Business Name */}
          <div className="lg:col-span-1">
            <label htmlFor="businessName" className="block text-sm font-semibold">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="lg:col-span-1">
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="lg:col-span-1">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Office Address */}
          <div className="lg:col-span-2">
            <label htmlFor="officeAddress" className="block text-sm font-semibold">Office Address</label>
            <textarea
              id="officeAddress"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button with Spinner */}
          <div className="lg:col-span-2 text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-blue-700 w-full flex items-center justify-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setSuccessModal(false)}
            >
              <FiX size={20} />
            </button>

            <h3 className="text-lg font-bold text-center mb-4">Registration Successful!</h3>
            <p className="text-center">Thank you for registering. Please wait for admin approval.</p>
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
    </div>
    <Footer/>
  </>
  );
};

export default AgentRegistrationForm;
