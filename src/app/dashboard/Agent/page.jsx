"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const Page = () => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState()
//   console.log("id", agents_id)

  const rowsPerPage = 5;

  useEffect(() => {
    AgentFetch();
  }, []);

  const filteredData = agents.filter((agent) =>
    agent.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const openModal = (agent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAgent(null);
  };

  const changeStatus = (status) => {
    if (selectedAgent) {
      selectedAgent.status = status;
      closeModal();
    }
  };

  // fetch data
  const AgentFetch = async () => {
    setLoading(true);
   try {
    const respond = await fetch("/api/agent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respond.json();
    //  console.log(data.data, "data")
    if (respond.ok) {
      setAgent(data.data);
      setLoading(false);
    }
    } catch (error) {}
  };

  //  delect agent
  const DelectAgent = async (id) => {
    try {
      const respond = await fetch("/api/agent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await respond.json();
      if (respond.ok) {
        toast.success("Successfully deleted:", data);
        AgentFetch();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {}
  };

//   updated
 const UpdateAgent = async(status)=> {
    try {
        const respond = await fetch("/api/agent", {
            method:"PUT",
            headers:{
             "Content-Type": "application/json"
            }, 
            body:JSON.stringify({status, id:updateId})
         })
         const data = respond.json()
         console.log(data, "data")
         if(respond.ok){
            toast.success("Status updated successfully")
            AgentFetch()
            setModalOpen(false)
            // setUpdateId()
         }else{
            toast.error("Failed to update status")
         }
        
    } catch (error) {
        
    }
   
 }


 const OpenModal = (agent) => {
    // console.log("idtwo", agent)
    setSelectedAgent(agent);
    setModalOpen(true)
    setUpdateId(agent._id)
 }

  return (
    <div className="p-6">
      <input
        type="text"
        className="border px-4 py-2 mb-4 w-full"
        placeholder="Search by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Business</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
                 <tr>
                 <td colSpan="5" className="text-center py-16 bg-white">
                   <div className="flex justify-center items-center space-x-4">
                     <div className="w-16 h-16 border-4 border-green-500
                      border-t-transparent border-solid rounded-full animate-spin"></div>
                     <span className="text-lg font-medium">Loading...</span>
                   </div>
                 </td>
               </tr>
              
            ) : (
              <>
                {currentRows.map((agent) => (
                  <tr key={agent._id} className="border-b">
                    <td className="px-4 py-2">{agent.name}</td>
                    <td className="px-4 py-2">{agent.email}</td>
                    <td className="px-4 py-2">{agent.businessName}</td>
                    <td className="px-4 py-2">{agent.officeAddress}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="bg-green-900 text-white px-3 py-1 rounded"
                        onClick={() => OpenModal(agent)}
                      >
                        {agent.status || "pending"}
                      </button>
                      <button
                        onClick={() => DelectAgent(agent._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {indexOfFirstRow + 1} to{" "}
          {Math.min(indexOfLastRow, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Change Status</h2>
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => UpdateAgent("Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => UpdateAgent("Declined")}
              >
                Decline
              </button>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
