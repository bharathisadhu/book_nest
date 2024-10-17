"use client";

import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RelatedBooks from "@/components/RelatedBooks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Stock from "@/components/Stock";

export default function BookDetails({ params }) {
  const [activeTab, setActiveTab] = useState('description');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [stock, setStock] = useState(null);
  const [listOfBooks, setListOfBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const bookId = params.details;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/books`);
        setListOfBooks(response.data);
        const book = response.data.find(book => book._id === bookId);
        setBookDetails(book);
      } catch (error) {
        console.error("Error fetching book details:", error.message);
      }
    };
    fetchBooks();
  }, [baseUrl, bookId]);

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      if (!bookDetails) return;
      const response = await fetch(`${baseUrl}/api/payments-total-quantity?blogId=${bookDetails._id}`);
      const data = await response.json();
      const status = (bookDetails.quantity - data) > 0 ? "Stock In" : "Stock Out";
      setStock(status);
    };
    fetchTotalQuantity();
  }, [baseUrl, bookDetails]);

  if (!bookDetails) {
    return <p className="text-3xl">Loading book details...</p>;
  }

  const {
    _id,
    name,
    description,
    image,
    author,
    price,
    rating,
    category,
    quantity,
  } = bookDetails;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const addToWishlist = async () => {
    if (isBookmarked) {
      Swal.fire({
        icon: "info",
        title: "Already Bookmarked",
        text: `${name} is already in your bookmarks!`,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/wishlist/${_id}`, {
        name,
        description: bookDetails.description || "",
        image,
        author: bookDetails.author || "",
        price,
        rating: bookDetails.ratings,
        category,
      });

      if (response.status === 201) {
        setIsBookmarked(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to bookmarks!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      const message = error.response?.data?.message || "Failed to add to bookmarks!";
      Swal.fire({
        icon: error.response?.status === 409 ? "info" : "error",
        title: error.response?.status === 409 ? "Already Bookmarked" : "Error",
        text: message,
      });
    }
  };

  const addToCart = async () => {
    if (isInCart) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${name} is already in your cart!`,
      });
      return;
    }

    try {
      // Assuming you have the correct cart API
      // const response = await axios.post("/api/carts", {
      //   name,
      //   description: bookDetails.description || "",
      //   image,
      //   author: bookDetails.author || "",
      //   price,
      //   rating,
      //   category,
      //   quantity,
      // });

      if (response.status === 201) {
        setIsInCart(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to cart!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      const message = error.response?.data?.message || "Failed to add to cart!";
      Swal.fire({
        icon: error.response?.status === 409 ? "info" : "error",
        title: error.response?.status === 409 ? "Already in Cart" : "Error",
        text: message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="font-sans">
        <div className="p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
          {/* Book details rendering code goes here */}
        </div>
        <RelatedBooks listOfBooks={listOfBooks} />
      </div>
      <Footer />
    </>
  );
}
