import Image from 'next/image';
import React, { useState } from 'react';

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
                    {showAll ? 'View Less' : 'View All'}
                </button>
            </div>

            <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
                {listOfBooks.slice(0, showAll ? listOfBooks.length : 5).map((book, index) => (
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




{/* <a href="#" className="group relative block overflow-hidden">
                <button
                    className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                >
                    <span className="sr-only">Wishlist</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>

                <Image
                    width={500}
                    height={500}
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                    alt=""
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                    <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

                    <h3 className="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

                    <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                    <form className="mt-4">
                        <button
                            className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                        >
                            Add to Cart
                        </button>
                    </form>
                </div>
            </a> */}