"use client";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Banner from "./share/banner";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default false for mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main>
      <div className="flex container mx-auto mt-6">
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-2 text-white bg-[#F65D4E] fixed z-20 top-4 left-4 rounded-lg"
          onClick={toggleSidebar}
        >
          <HiMenuAlt3 size={24} />
        </button>

        {/* Sidebar */}
        <nav
          className={`text-black min-h-min w-80 py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform shadow-xl ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0`}
        >
          {/* User Profile Section */}
          <div className="flex flex-col items-center px-4">
            <Image
              height={200}
              width={200}
              src={session?.user.image || "https://i.ibb.co/XWyS1WL/d.jpg"} // Default profile image
              className="w-12 h-12 rounded-full border-2 border-white"
              alt="Profile"
            />
            <div className="mt-2 text-center">
              <p className="text-sm mt-2">
                {session?.user.name || "User Name"}
              </p>
              <p className="text-xs mt-0.5">
                {session?.user.email || "User Email"}
              </p>
            </div>
          </div>

          {/* Sidebar Links */}
          <ul className="space-y-1 mt-8">
            {[
              {
                name: "Dashboard",
                icon: <AiOutlineDashboard className="text-xl" />,
                href: "/dashboard",
              },
              {
                name: "Users",
                icon: <AiOutlineUser className="text-xl" />,
                href: "/dashboard/users",
              },
              {
                name: "Books",
                icon: <IoBookSharp className="text-xl" />,
                href: "/dashboard/books",
              },
              {
                name: "Blogs",
                icon: <AiOutlineFileText className="text-xl" />,
                href: "/dashboard/blogs",
              },
              {
                name: "Sales",
                icon: <AiOutlineLineChart className="text-xl" />,
                href: "/dashboard/sales",
              },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-800 text-sm flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 border-b"
                >
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span>{item.icon}</span>
                </a>
              </li>
            ))}
          </ul>
          {!session ? (
            <Link href={"/login"}>
              <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
                <p>Login</p>
                <FiLogIn />
              </div>
            </Link>
          ) : (
            <div
              onClick={() => signOut()}
              className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg hover:underline cursor-pointer"
            >
              <p>Logout</p>
              <FiLogIn />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main
          className={`flex-grow p-6 transition-all duration-300 overflow-hidden ${
            isSidebarOpen ? "modal-toggle" : "ml-0"
          } md:ml-16`}
        >
          {children}
        </main>

        {/* Overlay for Sidebar in Mobile View */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </main>
  );
};

export default DashboardLayout;
