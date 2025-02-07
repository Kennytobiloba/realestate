"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out");
      // Perform logout actions here
    }
  };

  return (
    <div className="grid lg:grid-cols-5 grid-col-1 bg-gray-950 gap-8 relative min-h-screen">
      {/* Sidebar Toggle Button (Visible on Small Screens) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white p-2 bg-green-700 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`text-white h-full lg:col-span-1 col-span-2 fixed lg:relative z-40 
        bg-green-950 transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="min-h-screen flex flex-row h-full">
          <div className="flex flex-col w-56 rounded-r-3xl overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-3xl uppercase text-indigo-300">Real Estate</h1>
            </div>
            <ul className="flex flex-col py-4 space-y-4">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/dashboard/create", label: "Apartment" },
                { href: "/dashboard/Agent", label: "Agent" },
                { href: "/dashboard/appointment", label: "Appointment" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex flex-row items-center h-12 px-4 transform 
                      hover:translate-x-2 transition-transform ease-in duration-200
                       text-white hover:bg-green-700 hover:border hover:rounded-md
                        hover:border-green-700 ${
                      pathname === item.href && "bg-green-700 translate-x-2 transition-transform  transform border rounded-md border-green-700"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                href="/"
                 
                  className="flex flex-row items-center h-12 px-4 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-700 hover:border hover:rounded-md hover:border-green-700 w-full text-left"
                >
                  <span className="text-sm font-medium">Go back Home</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-4 bg-gray-950 lg:col-span-4 lg:max-w-[100%] mt-10 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
