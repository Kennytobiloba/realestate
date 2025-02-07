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
      if (respond.ok) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const respond = await fetch("/api/appointment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const data = await respond.json();
      if (respond.ok) {
        toast.success("Appointment Deleted Successfully");
        fetchAppointment();  
      } else {
        toast.error("Failed to delete appointment");
      }    
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="p-6 bg-green-800">
      <h2 className="text-2xl font-semibold mb-4 text-white">Appointments</h2>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 min-w-max">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="text-white bg-green-800 border-b">
                  <td className="p-3 border break-words">{appointment.message}</td>
                  <td className="p-3 border break-words">{appointment.name}</td>
                  <td className="p-3 border break-words">{appointment.email}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
