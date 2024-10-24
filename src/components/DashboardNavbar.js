"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";

export default function DashboardNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (session) {
      try {
        const response = await axios.get(`/api/user/${session?.user?.email}`);
        setUserProfile(response?.data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <header className="fixed top-0 left-0 z-50 ml-80 w-[calc(100%-18rem)] bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-8">
        {/* Search and Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="block lg:hidden">
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          </Link>

          <form className="hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
              <button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                {/* Search Icon */}
              </button>
            </div>
          </form>
        </div>

        {/* User Profile and Notifications */}
        <div className="flex items-center gap-4">
          {/* Notification button */}
          <Link
            href="#"
            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary"
          >
            <span className="absolute top-0 right-0 z-10 h-2 w-2 rounded-full bg-red-600"></span>
          </Link>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4"
            >
              <span className="hidden lg:block text-right">
                <span className="block text-sm font-semibold text-black">
                  {userProfile?.name || "User Name"}
                </span>
                <span className="block text-xs font-medium">
                  {userProfile?.email || "User Email"}
                </span>
              </span>
              {userProfile?.image || userProfile?.photo ? (
                <Image
                  src={userProfile?.image || userProfile?.photo}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <MdAccountCircle className="text-4xl cursor-pointer fill-[#333] hover:fill-[#F65D4E]" />
              )}
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-56 rounded-md border bg-white shadow-lg">
                {/* Dropdown items */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
