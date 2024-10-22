import Image from "next/image";
import React, { useState } from "react";

function RelatedBooks({ listOfBooks }) {
  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="container mx-auto mt-5 mb-5">
      <div className="flex items-center justify-between mb-8 mt-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black">
          Related Books
        </h2>
        <div className="border-t-2 border-gray-300 w-[25%] md:w-[60%] lg:w-[65%] mt-4"></div>
        <button
          className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
          onClick={handleViewAll}
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>

      <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
        {listOfBooks
          .slice(0, showAll ? listOfBooks.length : 5)
          .map((book, index) => (
            <div className="col-span-1" key={index}>
              <div className="flex flex-col">
                <Image
                  width={400}
                  height={400}
                  className="w-56 h-80 object-cover rounded-xl mb-3 transition-transform hover:scale-105"
                  src={book.image}
                  alt={book.name}
                />
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
    </div>
  );
}

export default RelatedBooks;
