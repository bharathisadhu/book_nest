"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoBookSharp } from "react-icons/io5";

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default false for mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden p-2 text-white bg-[#F65D4E] fixed z-20 top-4 left-4 rounded-lg"
        onClick={toggleSidebar}
      >
        <HiMenuAlt3 size={24} />
      </button>

      {/* Sidebar */}
      <nav
        className={`bg-[#121e31] min-h-min w-64 py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform ${
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
            <p className="text-sm text-white mt-2">
              {session?.user.name || "User Name"}
            </p>
            <p className="text-xs text-gray-300 mt-0.5">
              {session?.user.email || "User Email"}
            </p>
            {session && (
              <button
                onClick={() => signOut()}
                className="btn btn-sm mt-2 text-xs text-[#F65D4E] hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-1 mt-10">
          {[
            {
              name: "Dashboard",
              icon: <AiOutlineDashboard className="text-3xl" />,
              href: "/dashboard",
            },
            {
              name: "Users",
              icon: <AiOutlineUser className="text-3xl" />,
              href: "/dashboard/users",
            },
            {
              name: "Books",
              icon: <IoBookSharp className="text-3xl" />,
              href: "/dashboard/books",
            },
            {
              name: "Blogs",
              icon: <AiOutlineFileText className="text-3xl" />,
              href: "/dashboard/blogs",
            },
            {
              name: "Sales",
              icon: <AiOutlineLineChart className="text-3xl" />,
              href: "/dashboard/sales",
            },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all"
              >
                <span className="mb-3">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main
        className={`flex-grow p-6 transition-all overflow-auto mt-10 duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-20`}
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
  );
};

export default DashboardLayout;
