"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="grid lg:grid-cols-5 grid-col-1  bg-gray-950 gap-8 relative min-h-screen ">
      {/* Sidebar Toggle Button (Visible on Small Screens) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white p-2 bg-green-700 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`text-white h-full lg:col-span-1 col-span-2 fixed  lg:relative z-40 
        bg-green-950 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="min-h-screen flex flex-row h-full">
          <div className="flex flex-col w-56 rounded-r-3xl overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-3xl uppercase text-indigo-300">Real Estate</h1>
            </div>
            <ul className="flex flex-col py-4 space-y-4">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700 ${
                    pathname === "/dashboard" && "bg-green-700"
                  }`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/create"
                  className={`flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700 ${
                    pathname.includes("/create") && "bg-green-700"
                  }`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-music"></i>
                  </span>
                  <span className="text-sm font-medium">Apartment</span>
                </Link>
              </li>
              <li>
                <Link
                  // href="/dashboard/Agent"
                  href={""}
                  className="flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-drink"></i>
                  </span>
                  <span className="text-sm font-medium">Agent</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/appointment"
               
                  className="flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-shopping-bag"></i>
                  </span>
                  <span className="text-sm font-medium">Appointment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/user"
                  
                  className="flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-chat"></i>
                  </span>
                  <span className="text-sm font-medium">User</span>
                </Link>
              </li>
            
             
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-log-out"></i>
                  </span>
                  <span className="text-sm font-medium">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-4 bg-gray-950 lg:col-span-4  lg:max-w-[100%] mt-10"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
