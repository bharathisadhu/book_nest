"use client";
import Loader from "@/app/loading";
import { useEffect, useState } from "react";
import { FaBookReader, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const Analytics = () => {
  const [books, setBooks] = useState([]);
  const [soldBooks, setSoldBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => {
        setSoldBooks(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);
  let totalAuthors = 0;
  {
    books.forEach((book) => {
      if (book.author) {
        totalAuthors += 1;
      }
    });
  }
  let totalBooksSold = 0;

  soldBooks.forEach((order) => {
    totalBooksSold += order.books.length;
  });

  console.log(`Total Books Sold: ${totalBooksSold}`);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="container mx-auto mb-10 md:mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaBookReader className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">{books.length}</h4>
            <p className="text-gray-500">Total Books</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUsers className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">{totalAuthors}</h4>
            <p className="text-gray-500">Authors</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaCartShopping className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">
              {totalBooksSold}
            </h4>
            <p className="text-gray-500">Books Sold</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-10 flex items-center justify-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <HiOutlineEmojiHappy className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">97%</h4>
            <p className="text-gray-500">Happy Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
