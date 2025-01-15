import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

import Image from "next/image";
import { connectToDatabase } from "./lib/mongodb/mongoose";

export default async function Home() {
   await connectToDatabase()
 
  return (
  <div className="'relative overflow-x-hidden min-h-screen">
    <Nav/>
    <Hero/>

  </div>
  );
}
