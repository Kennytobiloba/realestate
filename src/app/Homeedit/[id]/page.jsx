"use client";
import React, { useState , useEffect } from "react";
import Image from "next/image";
import estateImg from "../../../components/assests/estate.jpg";
import Nav from "../../../components/Nav";
import CloudImage from "../../../components/CloudImage";
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useRouter } from "next/navigation";

const page = () => {
    const {id} = useParams()
    const router = useRouter()
    // console.log("id", id)
  const [formData, setFormData] = useState({
    image: "",
    Housename: "",
    address: "",
    description: "",
    category: "sell", // Default category is 'sell'
    properties: {
      parking: false,
      furnished: false,
      other: false,
    },
    regularPrice: 0,
    discountPrice: 0,
    numberbed: 0,
    numberbath: 0,
    numbertoilet: 0,
  });
  // console.log(formData.image, "image")
  const [isLoading,  setIsLoading] = useState(false)
  const [formLoading, setFormLoading]  = useState(true)

//   get all data

useEffect(()=> {
    getHouse()
    // fetchProperties()
  },[])
  
  const getHouse = async() => {
    setFormLoading(true)
   try {
    const respond = await fetch("/api/house/", {
      method:"GET",
      headers:{
       "Content-Type": "application/json"
      }
   })
      const data = await respond.json()
     if(!respond){
      toast.error("failed to fectch data")
      setFormLoading(false)
     }else{
      const Housedatas = data.houses  
      const  dataarray = Array.isArray(Housedatas) ? Housedatas : [Housedatas]
      const Housedata = dataarray.find((item) => item._id === id)
      // console.log("housedata" , Housedata.)   
      setFiles(Housedata.image)
      setFormData({
        Housename:Housedata.Housename,
        address: Housedata.address,
        description: Housedata.description,
        category: Housedata.category,
        properties:  {
          parking:Housedata.properties[0].parking,
          furnished:Housedata.properties[0].furnished,
          other:Housedata.properties[0].other,
        },
        regularPrice: Housedata.regularPrice,
        discountPrice:Housedata.discountPrice,
        numberbath:Housedata.numberbath,
        numberbed:Housedata.numberbed,
        image:Housedata.image
      }
      )
      setFormLoading(false) 
     }  
   } catch (error) {
    console.log("error", error)
    
   }
  
  }
        
  // image  uploading
   const [file, setFiles] = useState();
    const handleImageChange = (e) => {
      setFiles(e.target.files[0]);
    };
  //   console.log("file", file)
    const handleImageSubmit = async (e) => {
      e.preventDefault();
      if(!file){
        toast.error("you have not uploaded your file")
      }
      setIsLoading(true)
      try {
       
        const formDatas = new FormData();
        formDatas.append("file", file);
        formDatas.append("upload_preset", "real-estate");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkocpumx7/image/upload",{
          method:"post",
          body:formDatas   
          }      
        );
        const data = await response.json()
        console.log("file", file)
        // console.log("upload successfully", data.secure_url)
        if(!response.ok){
          setIsLoading(false)
          console.log("errorr failed to upload")
        }else{
          setIsLoading(false)
          setFormData({...formData, image:data.secure_url})
        
          toast.success("upload successfully")
          router.push("/dashboard/create")
        }
      } catch (error) {
        console.log("Error", error);
        
      }
    };


  // image end

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(id, "id");
    if (formData.discountPrice > formData.regularPrice) {
      toast.error("Discount price cannot exceed regular price.");
      return;
    }
    if(!formData.image){
       toast.error("You are required to upload a Image")
       return;
    }
    try {
      const respond = await fetch("/api/house/", {
        method: "PUT",
        body: JSON.stringify({formData, id}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await respond.json();
      if (!respond.ok) {
        throw new Error(`HTTP error! status: ${respond.status}`);
      }else{
        toast.success(data.message)      
        getHouse()     
      }   
    } catch (error) {
      console.log("Failed to create", error);
    }
  };

  return (
    <>
      <div>
        <div className="relative min-h-screen">
          <div className="relative z-50">
            <Nav />
           
          </div>
          <div className="absolute inset-0">
            <Image
              src={estateImg}
              alt="Estate"
              layout="fill"
              objectFit="cover"
              className="z-0 opacity-60"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-0" />
          </div>

          <div className="relative flex justify-center items-center min-h-screen z-10 lg:px-2 px-4">
            <div className="bg-white mt-28 p-8 rounded-lg shadow-lg w-full max-w-2xl opacity-90">
              <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                Edit a Listing
              </h1>
              {
                formLoading ? (
                  <div className="text-center">
                  <div className="loader animate-spin border-4 border-teal-500 border-t-transparent rounded-full w-16 h-16 mx-auto"></div>
                  <p className="mt-4 text-teal-600 font-medium">Information Loading...</p>
                </div>
                 
                ) : (
                <div>
                   <div className="mt-6">
                <form onSubmit={handleImageSubmit}>
                  <input type="file" onChange={handleImageChange} />
                  <button
                    type="submit"
                    className="bg-gray-400 text-white px-2 py-2 mb-6"
                    disabled={isLoading} // Disable button while uploading
                  >
                    {isLoading ? "Uploading..." : "Upload Image"}
                  </button>
                </form>
              </div>

              <form className="space-y-6 mt-4" onSubmit={onSubmit}>
                {/* Name and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="Housename"
                      className="font-medium text-lg text-teal-600"
                    >
                      Name of the Property
                    </label>
                    <input
                      type="text"
                      id="Housename"
                      name="Housename"
                      className="border p-2 rounded-md shadow-md
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter property name"
                      value={formData?.Housename}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="font-medium text-lg
                       text-teal-600"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter property address"
                      value={formData?.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Number of Rooms and Toilets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="numberbed"
                      className="font-medium text-lg text-teal-600"
                    >
                      Number of Bedrooms
                    </label>
                    <input
                      type="number"
                      id="numberbed"
                      name="numberbed"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      value={formData?.numberbed}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="numberbath"
                      className="font-medium text-lg text-teal-600"
                    >
                      Number of Bathrooms
                    </label>
                    <input
                      type="number"
                      id="numberbath"
                      name="numberbath"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      value={formData?.numberbath}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="numbertoilet"
                      className="font-medium text-lg text-teal-600"
                    >
                      Number of Toilets
                    </label>
                    <input
                      type="number"
                      id="numbertoilet"
                      name="numbertoilet"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      value={formData?.numbertoilet}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Price Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="regularPrice"
                      className="font-medium text-lg text-teal-600"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="regularPrice"
                      name="regularPrice"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter price"
                      value={formData?.regularPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="discountPrice"
                      className="font-medium text-lg text-teal-600"
                    >
                      Discount Price
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      className="border p-2 rounded-md shadow-md 
                      focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter discount price"
                      value={formData?.discountPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Category Select */}
                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="font-medium text-lg text-teal-600"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="border p-2 rounded-md shadow-md 
                    focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData?.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="sell">Sell</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                {/* Description Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="font-medium text-lg text-teal-600"
                  >
                    Property Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="border p-2 rounded-md shadow-md 
                    focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter property description"
                    value={formData?.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Properties Section */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {["parking", "furnished", "other"]?.map((checkbox) => (
                    <div className="flex items-center" key={checkbox}>
                      <input
                        type="checkbox"
                        id={checkbox}
                        name={checkbox}
                        className="mr-2"
                        checked={formData?.properties[checkbox]}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={checkbox}
                        className="text-teal-600 capitalize"
                      >
                        {checkbox}
                      </label>
                    </div>
                  ))}
                </div>
                {/* uploade image */}
               

                {/* Submit Button */}
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg 
                    shadow-md hover:bg-teal-700 focus:outline-none
                    focus:ring-2 focus:ring-teal-500"
                  >
                    Submit Listing
                  </button>
                </div>
              </form>

                </div>
                  

                )
              }
             
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
