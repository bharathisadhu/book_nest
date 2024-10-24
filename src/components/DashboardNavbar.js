"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";

export default function DashboardNavbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(true)
    const {data: session } = useSession()
    return (
        <header className="lg:flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 hidden bg-white shadow-xl">
      <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button variant="outline" size="icon" className="lg:hidden">
          <span className="sr-only">Toggle sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <Link href="/" className="block flex-shrink-0 lg:hidden">
          <Image
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </Link>
      </div>

      <div className="hidden sm:block">
        <form action="">
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
              {/* <Search className="h-5 w-5 text-gray-500" /> */}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 2xsm:gap-7">
        <ul className="flex items-center gap-2 2xsm:gap-4">
          {/* Notification button */}
          <li className="relative">
            <Link
              href="#"
              className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
            >
              <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
              </span>
              {/* <Bell className="fill-current" /> */}
            </Link>
          </li>
          {/* Messages button */}
          <li className="relative">
            <Link
              href="#"
              className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
            >
              <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1">
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
              </span>
              {/* <MessageSquare className="fill-current" /> */}
            </Link>
          </li>
        </ul>

        {/* User profile dropdown */}
        <div className="relative font-poppins">
          <Link
            href="#"
            className="flex items-center gap-4"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-semibold text-black">
              {session?.user?.name || "User Name"}
              </span>
              <span className="block text-xs font-medium">{session?.user?.email || "User Email"}</span>
            </span>
            {session?.user ? (
            <Image
                        src={session?.user?.image || session?.user?.photo}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />) :(
                        <MdAccountCircle className="text-4xl cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
                      )}
          </Link>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* Dropdown menu items */}
            </div>
          )}
        </div>
      </div>
    </header>
    )
}