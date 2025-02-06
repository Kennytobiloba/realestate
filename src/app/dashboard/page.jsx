"use client";
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { MdPeople, MdHome, MdBusiness } from 'react-icons/md';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Statistics Overview',
      color: '#fff', // Change title color to white
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Grid lines color
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Grid lines color
      },
    },
  },
};

const labels = ['Users', 'Apartments', 'Agents'];
const data = {
  labels,
  datasets: [
    {
      label: 'Count',
      data: [100, 50, 20],
      backgroundColor: 'rgba(76, 175, 80, 0.5)', // Change to green
      borderColor: 'rgba(76, 175, 80, 1)', // Change to green 
    },
  ],
};

const page = () => {
  const { user } = useUser();
  const name = user?.firstName || 'Guest';

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 lg:mt-2 mt-16" > 
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Welcome, {name}!</h1>
        <p className="text-lg mb-6 text-white w-3/4 mx-auto">
          This is a real estate platform where you can post houses for sale or rent, 
          find your dream home, and explore a wide range of properties.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-700 p-4 rounded-lg shadow-md text-center text-white"> 
            <MdPeople className="text-indigo-200 text-2xl mb-2" /> 
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-2xl font-semibold">{/* Replace with actual user count */}20</p> 
          </div>
          <div className="bg-green-700 p-4 rounded-lg shadow-md text-center text-white">
            <MdHome className="text-indigo-200 text-2xl mb-2" /> 
            <h2 className="text-xl font-bold">Apartments Created</h2>
            <p className="text-2xl font-semibold">{/* Replace with actual apartment count */}30</p> 
          </div>
          <div className="bg-green-700 p-4 rounded-lg shadow-md text-center text-white">
            <MdBusiness className="text-indigo-200 text-2xl mb-2" /> 
            <h2 className="text-xl font-bold">Total Agents</h2>
            <p className="text-2xl font-semibold">{/* Replace with actual agent count */}20</p> 
          </div>
        </div>

        <div className=" mt-8 w-[50%] mx-auto overflow-hidden">
          <Bar options={options} data={data} /> 
        </div> 

      </div>
    </div>
  );
};

export default page;