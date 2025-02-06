'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Page = () => {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [house, setHouse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const rowsPerPage = 8;

  useEffect(() => {
    getHouse();
  }, []);

  const getHouse = async () => {
    setLoading(true);
    try {
      const respond = await fetch('/api/house/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await respond.json();
      if (respond.ok) {
        setHouse(data.houses);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHouse = async (id) => {
    try {
      const respond = await fetch(`/api/house/`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await respond.json();
      if (respond.ok) {
        toast.success(data?.message || 'Deleted Successfully');
        getHouse();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const openModal = (house) => {
    setSelectedHouse(house);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHouse(null);
  };

  const changeStatus = async (status) => {
    if (!selectedHouse) return;

    try {
      const respond = await fetch(`/api/house/${selectedHouse._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await respond.json();
      if (respond.ok) {
        toast.success('Status updated successfully');
        getHouse();
        closeModal();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const HouseData = Array.isArray(house) ? house : [house];
  const filteredData = HouseData?.filter((item) =>
    item?.Housename.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Search by apartment name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Link
          href={"/post"}
          className="bg-green-900 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          onClick={() => toast.info('Create Apartment clicked!')}
        >
          Create Apartment
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Category</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">Description</th>
              <th className="text-center px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-16 bg-white">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <span className="text-lg font-medium">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              currentRows.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{item.Housename}</td>
                  <td className="px-4 py-2 border-b">{item.category}</td>
                  <td className="px-4 py-2 border-b">
                  <button
                    className={`px-3 py-1 rounded-md text-white ${
                      item.status === 'Rent' ? 'bg-green-500' : 'bg-green-900'
                    }`}
                    onClick={() => openModal(item)}
                  >
                    {item.status || 'Available'}
                  </button>
                </td>
                <td className="px-4 py-2 border-b">{item.description}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex justify-center gap-4">
                    <Link
                      href={`/Homeedit/${item?._id}`  }
                      className="flex items-center text-green-900 hover:text-green-700"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Link>
                      <button
                        onClick={() => deleteHouse(item?._id)}
                        className="flex items-center text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData.length)} of{' '}
          {filteredData.length} entries
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === index + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-400 hover:text-white`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Change Status</h2>
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => changeStatus('Rent')}
              >
                Rent
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => changeStatus('Sell')}
              >
                Sell
              </button>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
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