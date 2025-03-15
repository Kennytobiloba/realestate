import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

import Image from "next/image";
import { connectToDatabase } from "./lib/mongodb/mongoose";
import About from "@/components/About";
import Features from "@/components/Features";
import Review from "@/components/Review";
import Connect from "@/components/Connect";
import Book from "@/components/Book";
import Footer from "@/components/Footer";

export default async function Home() {
   await connectToDatabase()
 
  return (
  <div className="'relative overflow-x-hidden min-h-screen">
   
    <Hero/>
    <About/>
    <Features/>
    <Review/>
    <Connect/>
    <Book/>
 

  </div>
  );
}
