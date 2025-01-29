"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import House from './House'

const Features = () => { 
  const [loading, setLoading] = useState(true)
  const[house, setHouse] = useState(null)

useEffect(()=> {
  getHouse()
  // fetchProperties()
},[])
const getHouse = async() => {
  setLoading(true)
 try {
  const respond = await fetch("/api/house/", {
    method:"GET",
    headers:{
     "Content-Type": "application/json"
    }
 })
    const data = await respond.json()
   
  console.log(data, "data")
 
   if(!respond){
    toast.error("failed to fectch data")
   }else{
    setLoading(false)
    setHouse(data.houses)
   }
  
 } catch (error) {
  console.log("error", error)
 
 }

}
const houses = Array.isArray(house) ? house : [house];
      
  return (
    <div className='w-[90%] mx-auto   mt-10 font-roboto '>
         <div className='text-center mt-10 py-16'>
            <h1 className='lg:text-4xl md:text-3xl text-2xl font-bold font-roboto'>Featured Properties</h1>
            <p className='text-sm lg:w-2/5 w-[87%] leading-[22px] mx-auto mt-2 text-gray-600'>
            Discover our hand-picked selection of top-notch properties with outstanding features, guaranteed to meet your real estate needs and exceed your expectations.
           </p>
           <div className='h-1 bg-green-500 w-8 mt-4 mx-auto'></div>
        </div>
        {
          loading  ? (
            <div className="flex items-center justify-center w-full h-64  ">
            <div className="w-16 h-16 border-8 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
          </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-range:grid-cols-2'>
            {
              houses.slice(0, 3).map((item, index) => (
               <div key={index}>
                 <House  house={item} isloading={loading}/>
  
               </div>
              ))
            }
  
          </div>
          )
        }
       
     
    </div>
  )
}

export default Features