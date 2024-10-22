"use client";
import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RelatedBooks from "@/components/RelatedBooks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Banner from "@/components/share/banner";

export default function BookDetails({ params }) {
  const [activeTab, setActiveTab] = useState("description");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [listOfBooks, setListOfBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const { data: session } = useSession();
  const [stock, setStock] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/books`);
        setListOfBooks(response.data);
        const bookId = params.details;
        const foundBook = response.data.find((book) => book._id === bookId);
        setBookDetails(foundBook);
      } catch (error) {
        console.error("Error fetching book details:", error.message);
      }
    };

    fetchBooks();
  }, [baseUrl, params.details]);

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      if (!bookDetails) return;
      const response = await fetch(
        `${baseUrl}/api/payments-total-quantity?blogId=${bookDetails._id}`
      );
      const data = await response.json();
      const status = bookDetails.quantity - data > 0 ? "Stock In" : "Stock Out";
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
    ratings,
    category,
    publishType,
    cardCount,
  } = bookDetails;

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
      const response = await axios.post("/api/wishlists", {
        name,
        description: bookDetails.description || "",
        image,
        author: bookDetails.author || "",
        price,
        rating: ratings,
        category,
        cardCount,
        email: session?.user?.email,
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
      const message =
        error.response?.data?.message || "Failed to add to bookmarks!";

      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Bookmarked",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      }
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
      const response = await axios.post(`/api/carts/${session.user.email}`, {
        name,
        BookId: bookDetails._id, // Updated this from bookId to _id
        description: bookDetails.description || "",
        image,
        author: bookDetails.author || "",
        price,
        rating: ratings,
        category,
        cardCount,
        email: session?.user?.email, // Ensure this is not undefined
      });

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

      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already in Cart",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <Banner title={"Books Details"} linkName={"Home"}></Banner>
      <div className="font-sans">
        <div className="container mx-auto p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
            <div className="w-full lg:sticky top-0 text-center">
              <div className="lg:h-[560px]">
                <Image
                  height={300}
                  width={400}
                  src={image}
                  alt="Product"
                  className="lg:w-11/12 w-full h-full rounded-md object-cover object-top"
                />
              </div>
            </div>

            <div>
              <div className="mb-3">
                <button
                  type="button"
                  className="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-full"
                >
                  {publishType === "released" ? <>{stock}</> : ""}
                </button>
              </div>
              <div className="flex flex-wrap items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {name} | {category}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 font-bold">
                    Author: <span className="text-red-600">{author}</span>
                  </p>
                </div>

                <div className="ml-auto flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <CiStar className="mr-1" />
                    {ratings}
                  </button>
                </div>
              </div>

              <hr className="my-8" />

              <div className="flex flex-wrap gap-4 items-start">
                <div>
                  <p className="text-gray-800 text-4xl font-bold">${price}</p>
                </div>

                {stock === "Stock Out" ? (
                  <></>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {publishType === "released" ? (
                      <>
                        <button
                          onClick={addToCart}
                          className="min-w-[200px] px-4 py-3 bg-[#F65D4E] hover:bg-orange-500 text-white text-sm font-semibold rounded-md"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={addToWishlist}
                          className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-[#F65D4E] hover:text-white text-gray-800 text-sm font-semibold rounded-md"
                        >
                          Add to wishlist
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={addToCart}
                          className="min-w-[200px] px-4 py-3 bg-[#F65D4E] hover:bg-orange-500 text-white text-sm font-semibold rounded-md"
                        >
                          {publishType === "released" ? (
                            <span className=" text-white">Add to cart</span>
                          ) : (
                            <span className=" text-white uppercase">
                              Pre-Order
                            </span>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <hr className="my-8" />

              <div>
                <p>
                  {description.split(" ").slice(0, 30).join(" ")}
                  {description.split(" ").length > 30 ? "..." : ""}
                </p>
              </div>

              <hr className="my-8" />

              <div className="mt-20 max-w-4xl">
                <ul className="flex border-b">
                  <li
                    className={`text-gray-800 font-semibold text-sm py-3 px-8 border-b-2 cursor-pointer transition-all ${
                      activeTab === "description"
                        ? "border-gray-800 bg-gray-100"
                        : "border-transparent"
                    }`}
                    onClick={() => handleTabClick("description")}
                  >
                    Description
                  </li>
                  <li
                    className={`text-gray-500 font-semibold text-sm py-3 px-8 cursor-pointer transition-all ${
                      activeTab === "reviews"
                        ? "border-b-2 border-gray-800 bg-gray-100"
                        : ""
                    }`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Reviews
                  </li>
                </ul>

                <div className="mt-8">
                  {activeTab === "description" ? (
                    <>
                      <h3 className="text-xl font-bold text-gray-800">
                        Product Description
                      </h3>
                      <p className="text-sm text-gray-500 mt-4">
                        {description}
                      </p>
                      <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
                        <li>
                          A gray t-shirt is a wardrobe essential because it is
                          so versatile.
                        </li>
                        <li>
                          Available in a wide range of sizes, from extra small
                          to extra large, and even in tall and petite sizes.
                        </li>
                        <li>
                          This is easy to care for. They can usually be
                          machine-washed and dried on low heat.
                        </li>
                        <li>
                          You can add your own designs, paintings, or embroidery
                          to make it your own.
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Product Reviews
                      </h3>
                      <p className="text-sm text-gray-500 mt-4">
                        No reviews yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedBooks listOfBooks={listOfBooks} />
      </div>
      <Footer />
    </>
  );
}
