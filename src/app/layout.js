"use client";
import "./globals.css";
import AuthProvider from "@/services/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MdSupportAgent } from "react-icons/md";
import { useEffect, useState } from "react";
import Chat from "@/components/chat";

const metadata = {
  title: "BookNest",
  description: "Read for Peace",
  favicon: "BookNest.png",
};

export default function RootLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle body overflow and modal state
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Apply the "modalOpen" class to <body> when the modal is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.classList.add("modalOpen");
    } else {
      document.body.classList.remove("modalOpen");
    }
  }, [isChatOpen]);

  return (
    <html lang="en" data-theme="cupcake">
      <body className="font-poppins">
        <AuthProvider>
          <div>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
            <button
              onClick={toggleChat}
              className="fixed bottom-6 right-6 p-4 bg-[#F65D4E] text-white rounded-full shadow-lg z-30 hover:bg-orange-500 transition duration-300"
              aria-label="Support"
            >
              <MdSupportAgent size={40} />
            </button>
            {/* Chat Modal */}
            {isChatOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-full md:w-[90%] lg:w-1/3 relative border border-red-200">
                  <button
                    onClick={toggleChat}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <Chat />
                </div>
              </div>
            )}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
