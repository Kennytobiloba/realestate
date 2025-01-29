"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
   const pathname = usePathname()
  //  console.log("pathname", pathname)
  return (
    <div className="flex max-h-screen bg-gray-950 ">
      <aside className=" text-white  w-64 h-full ">
        <div className="min-h-screen flex flex-row bg-green-950 h-full">
          <div className="flex flex-col w-56 rounded-r-3xl overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-3xl uppercase text-indigo-300">Real Estate</h1>
            </div>
            <ul className="flex flex-col py-4 space-y-4">
              <li>
                <a
                  href="#"
                  className={`flex flex-row items-center h-12 
                  transform hover:translate-x-2 transition-transform ease-in duration-200
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700 ${ pathname === "/dashboard" && "bg-green-700" }`}
                >
                  <span className="inline-flex items-center
                   justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">Dashboard</span>
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard/create"
                  className={`flex flex-row items-center h-12 transform
                   hover:translate-x-2 transition-transform ease-in duration-200
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700 ${pathname.includes("/create") && "bg-green-700"}`}
                  
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-music"></i>
                  </span>
                  <span className="text-sm font-medium">Apartment</span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                 text-white hover:bg-green-700 hover:border hover:rounded-md
                   hover:border-green-700
                  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-drink"></i>
                  </span>
                  <span className="text-sm font-medium">Drink</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                  text-white hover:bg-green-700 hover:border 
                  hover:rounded-md
                   hover:border-green-700
                  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-shopping-bag"></i>
                  </span>
                  <span className="text-sm font-medium">Shopping</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700
                  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-chat"></i>
                  </span>
                  <span className="text-sm font-medium">Chat</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700
                  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-user"></i>
                  </span>
                  <span className="text-sm font-medium">Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700
                  "
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-bell"></i>
                  </span>
                  <span className="text-sm font-medium">Notifications</span>
                  <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                    5
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 
                   text-white hover:bg-green-700 hover:border hover:rounded-md
                    hover:border-green-700
                  "
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
      <main className="flex-grow p-4 bg-gray-950 max-w-[100%] overflow-scroll  mt-10 ">{children}</main>
    </div>
  );
};

export default Layout;
