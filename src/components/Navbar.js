"use client";
import { useEffect, useState } from "react";

import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../public/BookNest.png"; // Your logo path
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar = (props) => {
  // console.log(props);

  const cartStorage = JSON.parse(localStorage.getItem('bookmark'))
  const [cartNum, setCartNum] = useState(cartStorage?.length)
  const [cartItem, setCartItem] = useState(cartStorage)

  useEffect(()=>{
    if(props.cartData){
      if(cartNum){
        let localcartItem = cartItem;
        localcartItem.push(JSON.parse(JSON.stringify(props.cartData)))
        setCartItem(localcartItem);
        setCartNum(cartNum+1)
        localStorage.setItem('bookmark', JSON.stringify(localcartItem))

      }else{
        setCartNum(1)
        setCartItem([props.cartData])
        localStorage.setItem('bookmark', JSON.stringify([props.cartData]))
      }
      
    }
    
  },[cartItem, cartNum, props.cartData])
  
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  // console.log(session);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Books", link: "/books" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
  ];

  return (
    <div className="navbar justify-between container mx-auto">
      {/* Desktop View */}
      <div className="navbar hidden lg:flex items-center">
        <Link href="/" className=" normal-case text-3xl">
          <Image height={200} width={200} src={logo} alt="BookNest Logo" className="w-[160px] h-auto" />
        </Link>
        <ul className="navbar justify-end menu menu-horizontal px-1 text-xl">
          {navlinks.map((navlink, index) => (
            <li key={index}>
              <Link href={navlink.link}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        <Link href="/wishlist" className="btn btn-ghost text-xl">
          <FaHeart className="text-2xl" />
        </Link>
        <button className="btn btn-ghost text-xl">
          <CiSearch className="text-2xl" />
        </button>
        <Link href="login">
          <button className="btn btn-ghost text-xl">
            <MdAccountCircle className="text-2xl" />
          </button>
        </Link>
        <button className="btn btn-ghost text-xl">
          <FaShoppingCart className="text-2xl" />
        </button>
      </div>

      {/* Tablet View */}
      <div className="navbar justify-between hidden md:flex lg:hidden">
        <Link href="/" className=" normal-case text-3xl">
          <Image height={200} width={200} src={logo} alt="BookNest Logo" className="w-[160px] h-auto" />
        </Link>
        <ul className="navbar-center menu menu-horizontal px-1">
          {navlinks.map((navlink, index) => (
            <li key={index}>
              <Link href={navlink.link}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
        <div className="navbar-end w-[80px] ml-[20px]">
          <button className="btn btn-ghost">
            <CiSearch className="text-2xl" />
          </button>
          <button className="btn btn-ghost">
            <Link href="/login">
              <MdAccountCircle className="text-2xl" />
            </Link>
          </button>
          <button className="btn btn-ghost">
            <FaShoppingCart className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden md:hidden navbar flex items-center justify-between">
        <button onClick={toggleSidebar} className="btn btn-ghost">
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <Link href="/" className=" normal-case text-3xl">
          <Image height={200} width={200} src={logo} alt="BookNest Logo" className="w-[120px] h-auto" />
        </Link>
        <button className="btn btn-ghost text-2xl">
          <FaShoppingCart />
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-[200px] bg-base-200 shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="btn btn-square btn-ghost absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="menu p-4">
          {navlinks.map((navlink, index) => (
            <li key={index} className="py-2 text-xl">
              <Link href={navlink.link}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop (optional) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;





























//......................................Main Code..............................................


// "use client";
// import { useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { MdAccountCircle } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import { RxHamburgerMenu } from "react-icons/rx";
// import logo from "../../public/BookNest.png";
// import Link from "next/link";
// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State for the mobile sidebar
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the account dropdown
//   const { data: session } = useSession(); // Get session data
//   console.log(session);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen); // Toggles the mobile sidebar
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen); // Toggles the account dropdown
//   };

//   const navlinks = [
//     { label: "Home", link: "/" },
//     { label: "Books", link: "/books" },
//     { label: "Blogs", link: "/blogs" },
//     { label: "Contact", link: "/contact" },
//     { label: "About", link: "/about" },
//   ];

//   return (
//     <div className="sticky navbar justify-between container mx-auto">
//       {/* Desktop View */}
//       <div className="navbar hidden lg:flex items-center">
//         <Link href="/" className="normal-case text-3xl">
//           <Image
//             height={200}
//             width={200}
//             src={logo}
//             alt="BookNest Logo"
//             className="w-[160px] h-auto"
//           />
//         </Link>
//         <ul className="navbar justify-end menu menu-horizontal px-1 text-xl">
//           {navlinks.map((navlink, index) => (
//             <li key={index}>
//               <Link href={navlink.link}>{navlink.label}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="navbar-end hidden lg:flex relative">
//         <button className="btn btn-ghost text-xl">
//           <FaHeart className="text-2xl" />
//         </button>
//         <button className="btn btn-ghost text-xl">
//           <CiSearch className="text-2xl" />
//         </button>

//         {!session?.user ? (
//           <Link href="/login">
//             <button className="btn btn-ghost text-xl">
//               <MdAccountCircle className="text-2xl" />
//             </button>
//           </Link>
//         ) : (
//           <div className="relative">
//             <button className=" text-xl" onClick={toggleDropdown}>
//               {session.user.image ? (
//                 <Image
//                   src={session.user.image}
//                   alt="User Image"
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//               ) : (
//                 <MdAccountCircle className="text-2xl" />
//               )}
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl z-20">
//                 <button
//                   onClick={() => signOut()}
//                   className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         <button className="btn btn-ghost text-xl">
//           <FaShoppingCart className="text-2xl" />
//         </button>
//       </div>

//       {/* Tablet and Mobile View */}
//       <div className="lg:hidden flex justify-between w-full">
//         <Link href="/" className="normal-case text-3xl">
//           <Image
//             height={200}
//             width={200}
//             src={logo}
//             alt="BookNest Logo"
//             className="w-[120px] h-auto"
//           />
//         </Link>
//         <button className="btn btn-ghost text-xl" onClick={toggleSidebar}>
//           <RxHamburgerMenu className="text-2xl" />
//         </button>
//       </div>

//       {/* Sidebar for Mobile and Tablet */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
//           <div className="fixed left-0 top-0 w-3/4 h-full bg-white shadow-lg z-50 p-5">
//             <button
//               className="btn btn-ghost text-xl mb-5"
//               onClick={toggleSidebar}
//             >
//               <RxHamburgerMenu className="text-2xl" />
//             </button>
//             <ul className="menu flex flex-col gap-4 text-lg">
//               {navlinks.map((navlink, index) => (
//                 <li key={index}>
//                   <Link href={navlink.link} onClick={toggleSidebar}>
//                     {navlink.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-8">
//               <button className="btn btn-ghost text-xl mb-3">
//                 <FaHeart className="text-2xl" />
//               </button>
//               <button className="btn btn-ghost text-xl mb-3">
//                 <CiSearch className="text-2xl" />
//               </button>

//               {/* Account Dropdown for Mobile/Tablet */}
//               {!session?.user ? (
//                 <Link href="/login" onClick={toggleSidebar}>
//                   <button className="btn btn-ghost text-xl">
//                     <MdAccountCircle className="text-2xl" />
//                   </button>
//                 </Link>
//               ) : (
//                 <div className="relative">
//                   <button className=" text-xl" onClick={toggleDropdown}>
//                     {session.user.image ? (
//                       <Image
//                         src={session.user.image}
//                         alt="User Image"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                     ) : (
//                       <MdAccountCircle className="text-2xl" />
//                     )}
//                   </button>
//                   {isDropdownOpen && (
//                     <div className="absolute left-0 mt-2 py-2 w-full bg-white border rounded-md shadow-xl z-20">
//                       <Link
//                         href="/profile"
//                         className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
//                         onClick={toggleSidebar}
//                       >
//                         Profile
//                       </Link>
//                       <button
//                         onClick={() => {
//                           signOut();
//                           toggleSidebar();
//                         }}
//                         className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <button className="btn btn-ghost text-xl">
//                 <FaShoppingCart className="text-2xl" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
