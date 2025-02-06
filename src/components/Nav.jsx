"use client";

import React, { useState } from "react";
import { useAnimate, stagger } from "framer-motion";
import { Facebook, Instagram, Search, Twitter, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignedOut, UserButton, SignedIn } from "@clerk/nextjs";


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const staggerLinks = stagger(0.1, { startDelay: 0.1 });

  const handleToggle = () => {
    setMenuOpen(!menuOpen);

    if (!menuOpen) {
      animate(
        scope.current,
        { opacity: [0, 1], height: ["0px", "auto"] },
        { duration: 0.4 }
      );
      animate(
        ".nav-links",
        { y: [20, 0], opacity: [0, 1] },
        { delay: staggerLinks }
      );
    } else {
      animate(
        scope.current,
        { opacity: [1, 0], height: ["auto", "0px"] },
        { duration: 0.4 }
      );
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="absolute top-0 left-0 w-full z-20">
      <div className="w-[90%] mx-auto py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-white font-playwrite text-xl
           leading-6 lg:text-2xl lg:leading-9 font-bold">
            Sahand <br /> Estate
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8">
            {[
              {name:"Home", path:"/"},
              {name:"Properties", path:"/propertices"},
              {name:"Become An Agent", path:"/Registeragent"},  
              // {name:"Sign In", path:"/sign-in"}
                ].map(
              (item) => (
                <Link
                 href={item?.path}
                  key={item?.name}
                  className="text-[18px] text-white
                   hover:text-green-400 cursor-pointer"
                >
                  {item?.name}
                </Link>
              )
            )}
            <SignedIn>
             <Link
              href={"/post"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Post a house</Link>
                <Link
              href={"/dashboard"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Dashboard</Link>


            </SignedIn>
             <SignedOut>
              <Link
              href={"/sign-in"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Sign In</Link>
              </SignedOut>
          </div>
 
          {/* Social Icons */}
          <div className="hidden lg:flex gap-4 text-base lg:text-lg items-center">
           <SignedIn>
            <UserButton/>
            </SignedIn>
            <span className="text-white hover:text-green-400">
              <Twitter />
            </span>
            <span className="text-white hover:text-green-400">
              <Facebook />
            </span>
            <span className="text-white hover:text-green-400">
              <Instagram />
            </span>
          
            {/* Search Icon */}
            <span
              className="text-green-400 hover:text-white cursor-pointer"
              onClick={handleSearchToggle}
            >
              <Search />
            </span>
            
          </div>

          {/* Hamburger Menu */}
          <div className="block lg:hidden cursor-pointer" onClick={handleToggle}>
            {menuOpen ? (
              <X className="text-white text-3xl" />
            ) : (
              <Menu className="text-white text-3xl" />
            )}
          </div>
        </div>

        {/* Search Input */}
        {searchOpen && (
          <div
            className="flex justify-center mt-4"
            style={{ overflow: "hidden" }}
          >
            <div
              className="w-full max-w-md bg-opacity-90 rounded-lg px-4 py-2"
              style={{
                animation: "popOut 0.3s ease-in-out",
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-white bg-white border
                 border-green-400 rounded-md focus:outline-none placeholder:text-green-400"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div
          ref={scope}
          className={`lg:hidden flex flex-col items-center gap-4 bg-black
             bg-opacity-90 py-6 rounded-lg overflow-hidden transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {[
             {name:"Home", path:"/"},
             {name: "About", path:""},
             {name:"Properties", path:"/propertice"},
             {name:"Become An Agent", path:"/Registeragent"},  
          ].map(
            (item) => (
              <Link
                href={item?.path}
                key={item.name}
                onClick={closeMenu}
                className="nav-links text-[18px] text-white hover:text-green-400 cursor-pointer"
              >
                {item.name}
              </Link>
            )
          )}
          <SignedIn>
             <Link
              href={"/post"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Post a house</Link>
                <Link
              href={"/dashboard"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Dashboard</Link>


            </SignedIn>
             <SignedOut>
              <Link
              href={"/sign-in"}
              className="text-[18px] text-white hover:text-green-400
               cursor-pointer">Sign In</Link>
              </SignedOut>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <span className="text-white hover:text-green-400">
              <Twitter />
            </span>
            <span className="text-white hover:text-green-400">
              <Facebook />
            </span>
            <span className="text-white hover:text-green-400">
              <Instagram />
            </span>
            <span className="text-green-400 hover:text-white">
              <Search />
            </span>
            <span>
           
           
          
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
