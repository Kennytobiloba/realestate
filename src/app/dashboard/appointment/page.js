"use client";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const respond = await fetch("/api/appointment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await respond.json();
      console.log("data", data.data);
      if (respond.ok) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const delectAppointment = async (id) => {
     try {
        const respond = await fetch("/api/appointment", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({ id })
          });
        const data = await respond.json();
        console.log(data, "data")
        if(respond.ok){
         toast.success("Appointment Delected Successfully")
         fetchAppointment()  
        }else{
            toast.error("Failed to delete appointment")
        }    
     } catch (error) {
        console.log("Error", error)
        
     }
  }

  return (
    <div className="p-6 bg-green-800">
      <h2 className="text-2xl font-semibold mb-4 text-white">Appointments</h2>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 bg-gray-200 p-3 rounded-md font-semibold min-w-max">
            <div>Message</div>
            <div>Name</div>
            <div>Email</div>
            <div>Action</div>
          </div>
          {appointments.map((appointment) => (
            <div key={appointment.id} className="grid grid-cols-4 text-white bg-green-800
             p-3 border-b items-center min-w-max">
              <div>{appointment.message}</div>
              <div>{appointment.name}</div>
              <div>{appointment.email}</div>
              <button
              onClick={()=>delectAppointment(appointment._id)}
               className="bg-red-500 text-white px-3 py-1
               rounded hover:bg-red-600">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
