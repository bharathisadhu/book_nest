
'use client'
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart, AiOutlineFileText, AiOutlineLineChart, AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex">
      <button
        className="md:hidden p-2 text-white bg-blue-500 rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Open"} Sidebar
      </button>

      <nav
        className={`bg-[#121e31] h-screen w-64 py-6 font-[sans-serif] overflow-auto transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col flex-wrap items-center cursor-pointer px-4">
          <Image
            height={200}
            width={200}
            src={session?.user.image || "https://i.ibb.co/XWyS1WL/d.jpg"} // Default profile image
            className="w-12 h-12 rounded-full border-2 border-white"
            alt="Profile"
          />
          <div className="mt-2 text-center">
            <p className="text-sm text-white mt-2">{session?.user.name || "User Name"}</p>
            <p className="text-xs text-gray-300 mt-0.5">{session?.user.email || "User Email"}</p>
            {session && (
              <button
                onClick={() => signOut()}
                className="btn btn-sm mt-2 text-xs text-red-500 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <ul className="space-y-1 mt-10">
          {[
            { name: "Dashboard", icon: <AiOutlineDashboard className="text-3xl"/>, href: "/dashboard" },
            { name: "Users", icon: <AiOutlineUser className="text-3xl"/>, href: "/dashboard/users" },
            { name: "Products", icon: <AiOutlineShoppingCart className="text-3xl"/>, href: "/dashboard/products" },
            { name: "Orders", icon: <AiOutlineFileText className="text-3xl"/>, href: "/dashboard/orders" },
            { name: "Sales", icon: <AiOutlineLineChart className="text-3xl"/>, href: "/dashboard/sales" },
            { name: "Reports", icon: <AiOutlineBarChart className="text-3xl"/>, href: "/dashboard/reports" },
            { name: "Settings", icon: <AiOutlineSetting className="text-3xl"/>, href: "/dashboard/settings" },
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
      <main className={`flex-grow p-6 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
