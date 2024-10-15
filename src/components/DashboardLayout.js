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
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "../../public/BookNest.png";
import useAdmin from "@/app/hooks/useAdmin/page";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [ isAdmin ] = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default false for mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminMenuItems = [
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
  ];

  const nonAdminMenuItems = [
    {
      name: "Dashboard",
      icon: <AiOutlineDashboard className="text-xl" />,
      href: "/dashboard",
    },
    {
      name: "Profile",
      icon: <AiOutlineUser className="text-xl" />,
      href: "/dashboard/analytics",
    },
    {
      name: "Analytics",
      icon: <IoBookSharp className="text-xl" />,
      href: "/dashboard/books",
    },
    {
      name: "Cart",
      icon: <AiOutlineFileText className="text-xl" />,
      href: "/dashboard/blogs",
    },
    {
      name: "Wishlist",
      icon: <AiOutlineLineChart className="text-xl" />,
      href: "/dashboard/sales",
    },
  ];
 // Choose the appropriate menu items based on isAdmin
 const menuItems = isAdmin  ? adminMenuItems : nonAdminMenuItems;

  return (
    <main>

      <div className="flex container mx-auto lg:max-h-screen">
        {/* Hamburger Button for Mobile and tablet */}
        <button
          className="lg:hidden p-2 text-white bg-gradient-to-r from-[#F65D4E99] to-[#F65D4E] fixed z-50 w-full flex items-center justify-between"
          onClick={toggleSidebar}
        >
          <Link href="/" className="normal-case text-3xl">
            <Image
              height={200}
              width={200}
              src={logo}
              alt="BookNest Logo"
              className="w-[120px] h-auto"
            />
          </Link>
          <HiMenuAlt3 className="text-3xl" />
        </button>
        {/* Sidebar */}
        <nav
          className={`text-black bg-white w-full lg:w-80 lg:min-h-min py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform shadow-xl mt-[70px] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
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
          <ul className="mt-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-800 text-sm flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 border-b"
                >
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span>{item.icon}</span>
                </Link>
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
          <Link href={"/"}>
            <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E]  rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
              <p>Back to Home</p>
              <FaHome />
            </div>
          </Link>
        </nav>

        {/* Main Content */}
        <main
          className={`flex-grow lg:p-6 transition-all duration-300 overflow-hidden ${
            isSidebarOpen ? "modal-toggle" : ""
          } lg:ml-16 mt-20 lg:mt-0`}
        >
          {children}
        </main>

        {/* Overlay for Sidebar in Mobile View */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </main>
  );
};

export default DashboardLayout;
