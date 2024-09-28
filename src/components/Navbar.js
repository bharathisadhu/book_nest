"use client"; // Make sure this is a client component
import { useState, useEffect } from "react"; // Import useEffect
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import logo from "../../public/BookNest.png";
import { usePathname } from "next/navigation";

const useWishlist = () => {
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateWishlistCount = () => {
    const storedWish = JSON.parse(localStorage.getItem('bookmark'));
    setWishlistCount(storedWish ? storedWish.length : 0);
  };

  useEffect(() => {
    updateWishlistCount(); // Initialize count

    // Listen for changes in local storage
    const handleStorageChange = () => {
      updateWishlistCount();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  return [wishlistCount, updateWishlistCount];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const [wishlistCount, updateWishlistCount] = useWishlist(); // Use custom hook

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Books", link: "/books" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
  ];

  return (
    <div className="sticky navbar justify-between container mx-auto">
      {/* Desktop View */}
      <div className="navbar hidden lg:flex items-center">
        <Link href="/" className="normal-case text-3xl">
          <Image
            height={200}
            width={200}
            src={logo}
            alt="BookNest Logo"
            className="w-[160px] h-auto"
          />
        </Link>
        <ul className="navbar justify-end menu menu-horizontal px-1 text-xl">
          {navlinks.map((navlink, index) => (
            <li key={index}>
              <Link
                href={navlink.link}
                className={`${pathname === navlink.link
                  ? "border-b-2 bg-white border-b-[#F65D4E] rounded-b-lg rounded text-white"
                  : ""
                  } px-3 py-2 rounded`}
              >
                {navlink.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex relative">
        <Link href="/wishlist" className="btn btn-ghost text-xl relative">
          <FaHeart className="text-2xl" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs transform translate-x-1 -translate-y-1">
              {wishlistCount}
            </span>
          )}
        </Link>
        <button className="btn btn-ghost text-xl">
          <CiSearch className="text-2xl" />
        </button>
        {!session?.user ? (
          <Link href="/login">
            <button className="btn btn-ghost text-xl">
              <MdAccountCircle className="text-2xl" />
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button className="text-xl" onClick={toggleDropdown}>
              {session.user.image || session.user.photo ? (
                <Image
                  src={session.user.image || session.user.photo}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <MdAccountCircle className="text-2xl" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl z-20">
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button className="btn btn-ghost text-xl">
          <FaShoppingCart className="text-2xl" />
        </button>
      </div>

      {/* Tablet and Mobile View */}
      <div className="lg:hidden flex justify-between w-full">
        <Link href="/" className="normal-case text-3xl">
          <Image
            height={200}
            width={200}
            src={logo}
            alt="BookNest Logo"
            className="w-[120px] h-auto"
          />
        </Link>
        <button className="btn btn-ghost text-xl" onClick={toggleSidebar}>
          <RxHamburgerMenu className="text-2xl" />
        </button>
      </div>

      {/* Sidebar for Mobile and Tablet */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
          <div className="fixed left-0 top-0 w-3/4 h-full bg-white shadow-lg z-50 p-5">
            <button
              className="btn btn-ghost text-xl mb-5"
              onClick={toggleSidebar}
            >
              <RxHamburgerMenu className="text-2xl" />
            </button>
            <ul className="menu flex flex-col gap-4 text-lg">
              {navlinks.map((navlink, index) => (
                <li key={index}>
                  <Link
                    href={navlink.link}
                    className={`${pathname === navlink.link
                      ? "bg-blue-500 text-white"
                      : ""
                      } block px-3 py-2 rounded hover:bg-blue-300`}
                    onClick={toggleSidebar}
                  >
                    {navlink.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Buttons in a single row */}
            <div className="mt-8 flex justify-around">
              <Link href="/wishlist" className="btn btn-ghost text-xl relative">
                <FaHeart className="text-2xl" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs transform translate-x-1 -translate-y-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button className="btn btn-ghost text-xl mb-3">
                <CiSearch className="text-2xl" />
              </button>

              {/* Account Dropdown for Mobile/Tablet */}
              {!session?.user ? (
                <Link href="/login" onClick={toggleSidebar}>
                  <button className="btn btn-ghost text-xl">
                    <MdAccountCircle className="text-2xl" />
                  </button>
                </Link>
              ) : (
                <div className="relative">
                  <button className=" text-xl" onClick={toggleDropdown}>
                    {session.user.image || session.user.photo ? (
                      <Image
                        src={session.user.image || session.user.photo}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <MdAccountCircle className="text-2xl" />
                    )}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 py-2 w-full bg-white border rounded-md shadow-xl z-20">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={toggleSidebar}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          toggleSidebar();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button className="btn btn-ghost text-xl">
                <FaShoppingCart className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
