"use client";
import { Inter } from 'next/font/google';
import Nav_bar from "./components/Nav/Nav_bar";
import VideoComponent from "./components/VideoComponent";
import Link from "next/link";
import { useEffect, useState } from 'react';
import  { motion } from 'framer-motion';

// Import font Montserrat from Google Fonts
const montserrat = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    // Set a timeout to show the second component after 4 seconds
    const timer = setTimeout(() => {
      setShowSecondComponent(true);
    }, 3600);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen overflow-auto"> {/* Set height for the parent element */}
      <VideoComponent />
      {showSecondComponent && (
        <motion.div
        initial={{ y: "-100vw" }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 2.5 }}
        >
          <Nav_bar />
        </motion.div>
      )}
      {showSecondComponent && ( 
        <div className="flex z-10 relative">
        <div 
          className={`bg-white rounded-b-2xl w-[35%] ml-[10%] mt-[8%] h-[10%] font-bold text-center text-7xl p-4 mr-12 text-blue-800 ${montserrat.className}`}
        >
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 1.5 }}
          >
          Management
          </motion.div>
        </div>
        <div 
          className={`bg-gray-300 rounded-2xl w-[35%] mt-[8%] h-[10%] font-bold text-center text-7xl ml-2 p-4 text-white ${montserrat.className}`}
        >
          <motion.div
            initial={{ opacity: 0 }} // Bắt đầu mờ hoàn toàn
            animate={{ opacity: 1 }} // Hiện rõ
            transition={{ duration: 2 }} // Thời gian chuyển đổi
          >
            Package
          </motion.div>
        </div>
      </div>
      
      )}
      {showSecondComponent && (
       <div className="bg-white rounded-b-2xl rounded-l-2xl w-[85%] mx-auto h-[60%] relative">
        {/* <FontAwesomeIcon icon="fa-solid fa-box-open" size="xl" style={{color: "#2638c5",}} /> */}
        <div className="">
        {/* <p className="text-black text-lg my-4 mt-10 text-center">
                This platform is designed to simplify stock control, optimize order
                processing.
              </p> */}
        <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-500 p-2 rounded w-[60%] mx-auto flex mt-4 shadow-sm focus:outline-none focus:border-blue-500 focus:border-2"
      /> <div className="flex justify-center items-center my-4">
        <motion.div
            initial={{ opacity: 0 }} // Bắt đầu mờ hoàn toàn
            animate={{ opacity: 1 }} // Hiện rõ
            transition={{ duration: 3 }} // Thời gian chuyển đổi
          >
              <i className="fas fa-box-open fa-4x" style={{ color: "#2638c5" }}></i>
          </motion.div>

</div>
<p className="text-black text-lg text-center w-[50%] flex justify-center mx-auto">
Inventory management is a crucial process that involves overseeing the flow of goods within a business, from procurement to storage and distribution. It ensures that products are available when needed while preventing overstocking, which can lead to unnecessary costs. 
              </p>

      </div>
      <motion.div
        initial={{ y: "100vh", opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 2 }}
        >
       <Link href="/Inventory">
         <button className="bg-white rounded-xl w-[20%] h-[10%] absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-xl">
           <p className="text-blue-800 font-semibold">View More</p>
         </button>
       </Link>
        </motion.div>
     </div>
     
      )}
    </main>
  );
}
{/* <div className="bg-white rounded-tr-xl h-[35%] w-[30%] absolute bottom-0 left-0 pt-2 pr-2">
            <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 1.5 }}
        >
            <div className="bg-white shadow-xl rounded-tr-xl rounded-bl-xl pl-4 pt-2 pb-2 h-full border-gray-50 border-2">
              <h1 className="text-lg text-blue-800 font-bold">Management Packages</h1>
              <p className="text-black text-sm mb-2">
                This platform is designed to simplify stock control, optimize order
                processing, and ensure accuracy for seamless business operations.
              </p>
            </div>
            </motion.div>
          </div>
           */}