import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";

export default function BooksCard({ book }) {
  const { name, image, price, category, ratings, _id } = book;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const addToBookmark = async () => {
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
        description: book.description || "",
        image,
        author: book.author || "",
        price,
        rating: ratings,
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

  return (
    <div className="transition-shadow h-fit duration-300 w-full font-sans overflow-hidden mx-auto mt-4 pl-4 pt-4 rounded-lg shadow-lg border border-gray-200">
      {/* Full Height Image */}
      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        {/* Bookmark Icon on the left side */}
        <button
          onClick={addToBookmark}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition-colors duration-200 ${
            isBookmarked ? "text-yellow-500" : "text-gray-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            className="fill-pink-600"
            viewBox="0 0 64 64"
          >
            <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
          </svg>
        </button>
      </div>

      {/* Book Details */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-1">Category: {category}</p>

        <h3
          title={name}
          className="text-lg md:text-xl text-gray-800 font-bold line-clamp-2"
        >
          {name.slice(0, 10)}...
        </h3>

        <div className="flex items-center mt-2">
          <p className="text-gray-800 font-semibold flex items-center">
            Ratings: {ratings}{" "}
            <CiStar className="text-yellow-500 ml-1 text-lg md:text-xl" />
          </p>
        </div>

        <h3 className="text-xl md:text-2xl text-gray-800 font-bold mt-4">
          ${price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
