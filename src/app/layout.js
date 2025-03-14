import { Geist, Geist_Mono, Roboto  } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'; 
import Head from "next/head";
import "./globals.css";
import Footer from "@/components/Footer";



// Load fonts using next/font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: ['400', '700'], 
  subsets: ["latin"], 
  variable: "--font-roboto", 
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Preconnect to Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
         
          <div className="bg-[#f9f8f2] w-full">
          <Toaster />
          {children}
          </div>
          
        
        </body>
      </html>
    </ClerkProvider>
  );
}
