"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDollarSign, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Loader from "@/app/loading";

export default function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState({});
  const [cartBooks, setCartBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        setPopularBooks(data);
        setLoading(false); // Set loading to false once data is fetched
      });
  }, [baseURL]);

  const addToBookmark = async (book) => {
    if (bookmarkedBooks[book._id]) {
      Swal.fire({
        icon: "info",
        title: "Already Bookmarked",
        text: `${book.name} is already in your bookmarks!`,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/wishlist/${book._id}`, {
        name: book.name,
        description: book.description || "",
        image: book.image,
        author: book.author || "",
        price: book.price,
        rating: book.ratings,
        category: book.category,
      });

      if (response.status === 201) {
        setBookmarkedBooks((prev) => ({ ...prev, [book._id]: true }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${book.name} added to bookmarks!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add to bookmarks!",
      });
    }
  };

  const addToCart = async (book) => {
    if (cartBooks[book._id]) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${book.name} is already in your cart!`,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/carts/${session?.user?.email}`, {
        name: book.name,
        BookId: book._id,
        description: book.description || "",
        image: book.image,
        author: book.author || "",
        price: book.price,
        rating: book.ratings,
        category: book.category,
        cardCount: book.cardCount,
        email: session?.user?.email, // Ensure this is not undefined
      });

      if (response.status === 201) {
        setCartBooks((prev) => ({ ...prev, [book._id]: true }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${book.name} added to cart!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add to cart!",
      });
    }
  };

  if (loading) {
    return <Loader></Loader>; // Display a loading message
  }

  return (
    <div className="my-4 md:my-8 lg:mt-28 lg:mb-20 container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black">
          Popular Books
        </h2>
        <div className="border-t-2 border-gray-300 w-[25%] md:w-[60%] lg:w-[65%] mt-4"></div>
        <Link href="/books">
          <button className="btn rounded-3xl bg-[#F65D4E] text-white px-8">
            View All
          </button>
        </Link>
      </div>

      {/* Popular Book Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-2">
        <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.slice(0, 8).map((book) => (
            <div key={book._id} className="col-span-1">
              <div className="transition h-fit duration-500 w-full font-sans overflow-hidden mx-auto mt-4 px-4 pt-4">
                {/* Full Height Image */}
                <div className="relative group">
                  <Image
                    src={book.image}
                    alt={book.name}
                    width={500}
                    height={500}
                    className="w-56 h-80 object-cover rounded-xl mb-3 transition-transform hover:scale-105"
                  />
                  {/* Bookmark and Cart Icons */}
                  <div>
                    <button
                      onClick={() => addToBookmark(book)}
                      className={`cursor-pointer absolute bottom-16 right-2 p-2 rounded-full bg-white shadow-md transition-transform duration-500 opacity-0 group-hover:opacity-100 hover:duration-500 ${
                        bookmarkedBooks[book._id] ? "text-[#F65D4E]" : ""
                      }`}
                    >
                      <FaHeart className="text-xl" />
                    </button>
                    <button
                      onClick={() => addToCart(book)}
                      className={`cursor-pointer absolute bottom-5 right-2 p-2 rounded-full bg-white shadow-md transition-transform duration-500 opacity-0 group-hover:opacity-100 hover:duration-500 ${
                        cartBooks[book._id] ? "text-[#F65D4E]" : ""
                      }`}
                    >
                      <FaShoppingCart className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Book Details */}
                <div className="pt-3">
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    {book.category}
                  </p>
                  <Link href={`/books/${book._id}`}>
                    <h2
                      title={book.name}
                      className="text-lg md:text-xl text-gray-800 font-bold line-clamp-2 hover:text-[#F65D4E]"
                    >
                      {book.name.slice(0, 15)}...
                    </h2>
                  </Link>
                  <div className="flex items-center mt-2">
                    <p className="text-gray-800 font-semibold flex items-center">
                      Ratings: {book.ratings}
                      <FaStar className="text-orange-400 ml-1 text-xs md:text-xl" />
                    </p>
                  </div>

                  <h3 className="my-2 -ml-1 flex items-center">
                    <FaDollarSign className="text-xl text-[#F65D4E] font-semibold" />
                    <span className="text-xl md:text-2xl text-[#F65D4E] font-semibold -ml-1 -mt-1">
                      {book.price.toFixed(2)}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Books Offer Card */}
        <div className="col-span-1 relative">
          <Image
            width={500}
            height={500}
            className="h-72 md:h-96 lg:h-full object-cover w-full rounded-xl hover:scale-105 transition-transform"
            src="https://i.ibb.co/7Cqj9df/h1-banner1.jpg"
            alt="Offer Image"
          />
          <div className="absolute bottom-[2%] left-1/3 md:left-[40%] lg:bottom-24 lg:left-16 text-white md:space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold">Best Offer</h2>
            <h1 className="text-3xl md:text-5xl font-bold">Save $15</h1>
            <p>on selected items</p>
            <button className="btn rounded-3xl bg-white md:text-lg text-black px-8">
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
