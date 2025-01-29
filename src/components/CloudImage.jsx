"use client";
import React, { useState } from "react";

const CloudImage = () => {
  const [file, setFiles] = useState();
  const handleChange = (e) => {
    setFiles(e.target.files[0]);
  };
//   console.log("file", file)
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "real-estate");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkocpumx7/image/upload",{
        method:"post",
        body:formData   
        }      
      );
      const data = await response.json()
      console.log("file", file)
      console.log("upload successfully", data.secure_url)
      if(!response.ok){
        console.log("errorr failed to upload")
      }else{
        console.log("uploaded")
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="">
        <form onSubmit={handleSubmit} >
       <input type="file" onChange={handleChange} />
       <button  
       type="submit"
        className="bg-gray-400 text-white px-2 py-2 mb-6">UploadImage</button>
        </form>
      
      
    </div>
  );
};

export default CloudImage;
