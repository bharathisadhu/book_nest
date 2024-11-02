"use client";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "../../public/BookNest.png";
import axios from "axios";
import Loading from "../app/loading";
import { FaHome } from "react-icons/fa";
import DashboardNavbar from "./DashboardNavbar";
import PrivateRoute from "@/services/PrivateRoute";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchAdminStatus = useCallback(async () => {
    if (session) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/api/user/${session?.user?.email}`
        );
        setUserProfile(response?.data);
        setIsAdmin(response?.data?.role === "admin");
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdmin(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [session, baseURL]);

  useEffect(() => {
    fetchAdminStatus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isAdmin) {
        fetchAdminStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [fetchAdminStatus, isAdmin]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const adminMenuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <AiOutlineDashboard className="text-xl" />,
        href: "/dashboard/adminDashboard",
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
      { name: "Back to Home", icon: <FaHome className="text-xl" />, href: "/" },
    ],
    []
  );

  const nonAdminMenuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <AiOutlineDashboard className="text-xl" />,
        href: "/dashboard/userProfile",
      },
      {
        name: "Payment History",
        icon: <AiOutlineFileText className="text-xl" />,
        href: "/dashboard/paymentHistory",
      },
      {
        name: "Wishlist",
        icon: <AiOutlineLineChart className="text-xl" />,
        href: "/dashboard/wishlists",
      },
      { name: "Back to Home", icon: <FaHome className="text-xl" />, href: "/" },
    ],
    []
  );

  const menuItems = useMemo(
    () => (isAdmin ? adminMenuItems : nonAdminMenuItems),
    [isAdmin, adminMenuItems, nonAdminMenuItems]
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <PrivateRoute>
      <main className="flex h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="lg:hidden p-2 text-white bg-gradient-to-r from-[#F65D4E99] to-[#F65D4E] fixed top-0 left-0 z-50 w-full flex items-center justify-between"
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
          className={`text-black bg-white w-full lg:w-80 h-screen lg:h-screen fixed top-0 lg:fixed lg:top-0 z-40 py-6 font-[sans-serif] transition-transform duration-300 transform shadow-xl ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex flex-col items-center px-4 mt-16 lg:mt-14">
            <Image
              height={200}
              width={200}
              src={userProfile?.image || "https://i.ibb.co/XWyS1WL/d.jpg"}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white object-cover"
              alt="Profile"
            />
            <div className="mt-2 text-center">
              <p className="text-sm mt-2">{userProfile?.name || "User Name"}</p>
              <p className="text-xs mt-0.5">
                {userProfile?.email || "User Email"}
              </p>
            </div>
          </div>

          <ul>
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
              className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer"
            >
              <p>Logout</p>
              <FiLogIn />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <div
          className={`flex-grow h-full lg:ml-80 pt-20 lg:pt-0 ${
            isSidebarOpen && "overflow-hidden"
          }`}
        >
          <DashboardNavbar />
          <div className="p-4 lg:mt-24">{children}</div>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default DashboardLayout;
