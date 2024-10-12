"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    fetch(`${baseURL}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        setPopularBooks(data);
      });
  }, [baseURL]);

  return (
    <>
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
              <div key={book.name} className="col-span-1">
                <div className="flex flex-col ">
                  <Link href={`/books/${book._id}`}><Image
                    width={500}
                    height={500}
                    className="w-56 h-80 object-cover rounded-xl mb-3 transition-transform hover:scale-105"
                    src={book.image}
                    alt={book.name}
                  /></Link>
                  <div className="text-left">
                    <div className="text-lg font-medium mb-1">{book.name}</div>
                    <div className="flex items-center text-orange-400 mb-1">
                      <span className="ml-2 text-black font-medium">
                        {book.ratings}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1 font-medium">
                      {book.author}
                    </div>
                    <div className="text-lg font-bold text-[#F65D4E]">
                      ${book.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*Popular Books offer card */}
          <div className="col-span-1 relative">
            <Image
              width={500}
              height={500}
              className="h-72 md:h-96 lg:h-full object-cover w-full rounded-xl hover:scale-105 transition-transform "
              src="https://i.ibb.co.com/7Cqj9df/h1-banner1.jpg"
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
    </>
  );
}
