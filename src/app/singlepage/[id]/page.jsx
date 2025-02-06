"use client"
import Nav from "@/components/Nav";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import bgImage from "../../../components/assests/estate.jpg"; 

const page = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const[house, setHouse] = useState([])

  useEffect(() => {
    getHouse()
  }, [])

  const getHouse = async() => {
    setLoading(true)
    try {
      const respond = await fetch("/api/house/", {
        method:"GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await respond.json()
      if (!respond) {
        toast.error("Failed to fetch data")
      } else {  
        const Housedatas = data.houses  
        const dataarray = Array.isArray(Housedatas) ? Housedatas : [Housedatas]
        const Housedata = dataarray.find((item) => item._id === id)
        setHouse(Housedata)
        setLoading(false)
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const [reviews, setReviews] = useState([
    { id: 1, name: "John Doe", comment: "Amazing house! Totally worth it." },
    { id: 2, name: "Jane Smith", comment: "Great location and well furnished." },
  ]);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim() === "") return;
    const newComment = {
      id: reviews.length + 1,
      name: "Anonymous",
      comment: newReview,
    };
    setReviews([...reviews, newComment]);
    setNewReview("");
  };

  return (
    <div className=" flex flex-col w-full   singlepage">
      <div className="w-full  z-50">
        <Nav />
      </div>
      
  
      <div className="pt-20 z-40 p-8">

      {
        loading ?  (
          <div className="flex items-center justify-center w-full h-64  ">
          <div className="w-16 h-16 border-8 border-t-green-500
           border-gray-200 rounded-full animate-spin"></div>
        </div>
        ) : 
        
        
        ( 
          <div className="max-w-4xl mx-auto  mb-10  bg-white shadow-md 
          h-full p-4 md:p-6 justify-center  z-40 mt-20 rounded-lg right-0 left-0 top-28 bottom-0">
            {/* Image Section */}
            <img
              src={house?.image}
              alt={house?.name}
              className="w-full h-80 object-cover rounded-lg"
            />
    
            {/* House Info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-800">{house?.name}</h1>
              <p className="text-gray-600">{house?.address}</p>
              <span className="text-sm mt-4 bg-blue-500 text-white px-3 py-1 rounded-full uppercase">
                {house?.category}
              </span>
    
              {/* Price Section */}
              <div className="flex items-center gap-4 mt-3">
                <p className="text-xl font-semibold text-red-500">${house?.discountPrice}</p>
                <p className="text-gray-400 line-through">${house?.regularPrice}</p>
              </div>
    
              {/* Description */}
              <p className="mt-4 text-gray-700">{house?.description}</p>
    
              {/* Features */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Features:</h3>
                <ul className="mt-2 text-gray-600">
                  <li>🛏️ {house?.numberBed} Beds</li>
                  <li>🛁 {house?.numberBath} Baths</li>
                  {house.properties?.parking && <li>🚗 Parking Available</li>}
                  {house.properties?.furnished && <li>🛋️ Fully Furnished</li>}
                  {house.properties?.other && <li>🏡 Additional Features Available</li>}
                </ul>
              </div>
    
              {/* Contact Button */}
              <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Contact Seller
              </button>
            </div>
    
            {/* Review Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
    
              {/* Review List */}
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700 font-semibold">{review.name}</p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
    
              {/* Add Review */}
              <div className="mt-6">
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  placeholder="Leave a review..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                ></textarea>
                <button
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleAddReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )
      }
      
     
     
      </div>
     
    </div>
  );
};

export default page;
