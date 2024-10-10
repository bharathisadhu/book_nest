"use client";
import React, { useEffect, useState } from "react";
import BooksCard from "@/components/BooksCard";
import { GoArrowRight, GoChevronDown } from "react-icons/go";
import { HiX } from "react-icons/hi"; // for mobile drawer close button
import Link from "next/link";
import Loader from "../loading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [seeMoreCategories, setSeeMoreCategories] = useState(false);
  const [seeMoreAuthors, setSeeMoreAuthors] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the mobile drawer
  const [isLoading, setIsLoading] = useState(true); // New state for loader
  const itemsPerPage = 12;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const data = {
      title: "Books",
      linkName: "Home",
    };

    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when fetching starts
        const response = await fetch(`${baseUrl}/api/books`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setBooks(data);
          setFilteredBooks(data);

          // Extract unique categories and authors
          const uniqueCategories = [
            ...new Set(data.map((book) => book.category)),
          ];
          const uniqueAuthors = [...new Set(data.map((book) => book.author))];

          setCategories(uniqueCategories);
          setAuthors(uniqueAuthors);
        } else {
          console.warn("Expected an array of books, but got:", data);
          setBooks([]);
          setFilteredBooks([]);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchData();
  }, [baseUrl]);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((book) =>
        selectedAuthors.includes(book.author)
      );
    }

    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategories, selectedAuthors, priceRange, books]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const sorting = (data) => {
    if (data === "LowToHigh") {
      const priceLowToHigh = [...filteredBooks].sort(
        (a, b) => a.price - b.price
      );
      setFilteredBooks(priceLowToHigh);
    }
    if (data === "HighToLow") {
      const priceHighToLow = [...filteredBooks].sort(
        (a, b) => b.price - a.price
      );
      setFilteredBooks(priceHighToLow);
    }
    if (data === "topRatings") {
      const TopRatings = [...filteredBooks].sort(
        (a, b) => b.ratings - a.ratings
      );
      setFilteredBooks(TopRatings);
    }

    if (data === "lowRatings") {
      const LowRatings = [...filteredBooks].sort(
        (a, b) => a.ratings - b.ratings
      );
      setFilteredBooks(LowRatings);
    }
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10">
          <h2 className="lg:py-10 lg:ml-10 font-extrabold text-5xl">Books</h2>
          <h3 className="lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
            <Link href="/">Home</Link>
            <GoArrowRight className="" />
            <span className="text-orange-600">Books</span>
          </h3>
        </div>
        {isLoading ? (
          // Loader section
          <Loader />
        ) : (
          <>
            {/* Filter button for mobile view */}
            <div className="lg:hidden flex ml-6 mt-6 -mb-10">
              <button
                className="btn btn-outline text-sm p-1 px-8"
                onClick={toggleDrawer}
              >
                Filter
              </button>
            </div>
            {/* sort button */}
            <div className="flex justify-end pr-10">
              <div className="dropdown">
                <div tabIndex={0} className="m-1">
                  <div className="flex justify-center items-center gap-4 p-1 px-4 rounded-lg btn btn-outline -mt-3 lg:mt-5">
                    Sort <GoChevronDown />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-52 -ml-20"
                >
                  <button
                    onClick={() => {
                      sorting("LowToHigh");
                    }}
                  >
                    <li>
                      <a>Sort by price: low to high</a>
                    </li>
                  </button>
                  <button
                    onClick={() => {
                      sorting("HighToLow");
                    }}
                  >
                    <li>
                      <a>Sort by price: high to low</a>
                    </li>
                  </button>
                  <button
                    onClick={() => {
                      sorting("topRatings");
                    }}
                  >
                    <li>
                      <a>Sort by popularity: high to low</a>
                    </li>
                  </button>
                  <button
                    onClick={() => {
                      sorting("lowRatings");
                    }}
                  >
                    <li>
                      <a>Sort by popularity: low to high</a>
                    </li>
                  </button>
                </ul>
              </div>
            </div>
            {/* Main Layout with Sidebar and Books Grid */}
            <div className="grid grid-cols-4 mx-auto mt-6 gap-8">
              {/* Left Sidebar */}
              <div className="hidden lg:block col-span-1 bg-gray-100 p-4 rounded-lg">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search for a book..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Category Checkboxes */}
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Categories</h4>
                  {categories
                    .slice(0, seeMoreCategories ? categories.length : 5)
                    .map((category) => (
                      <label key={category} className="block mb-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  {categories.length > 5 && (
                    <button
                      onClick={() => setSeeMoreCategories(!seeMoreCategories)}
                      className="text-blue-500 mt-2"
                    >
                      {seeMoreCategories ? "See Less" : "See More"}
                    </button>
                  )}
                </div>

                {/* Author Checkboxes */}
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Authors</h4>
                  {authors
                    .slice(0, seeMoreAuthors ? authors.length : 5)
                    .map((author) => (
                      <label key={author} className="block mb-2">
                        <input
                          type="checkbox"
                          checked={selectedAuthors.includes(author)}
                          onChange={() => handleAuthorChange(author)}
                          className="mr-2"
                        />
                        {author}
                      </label>
                    ))}
                  {authors.length > 5 && (
                    <button
                      onClick={() => setSeeMoreAuthors(!seeMoreAuthors)}
                      className="text-blue-500 mt-2"
                    >
                      {seeMoreAuthors ? "See Less" : "See More"}
                    </button>
                  )}
                </div>

                {/* Price Range Slider */}
                <div>
                  <h4 className="font-bold mb-2">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, e.target.value])}
                    className="w-full"
                  />
                  <p>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
              </div>
              {/* Books Grid */}
              <div className="col-span-4 lg:col-span-3 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 justify-center divide-y divide-x p-2 gap-4">
                {currentBooks.map((book) => (
                  <BooksCard key={book.id} book={book} />
                ))}
              </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center my-10 lg:ml-96">
              <nav>
                <ul className="flex">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className="mx-2">
                      <button
                        className={`px-4 py-2 rounded ${
                          index + 1 === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* Mobile Drawer for Filters */}
            {isDrawerOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
                <div className="mt-16 left-0 top-0 w-3/4 h-full bg-white shadow-lg z-50 p-5 overflow-y-auto">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold">Filter Options</h2>
                    <button
                      className="text-2xl text-gray-600"
                      onClick={toggleDrawer} // Close the drawer
                    >
                      <HiX />
                    </button>
                  </div>
                  {/* Mobile Filter Options */}
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search for a book..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  {/* Category Checkboxes */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Categories</h4>
                    {categories
                      .slice(0, seeMoreCategories ? categories.length : 5)
                      .map((category) => (
                        <label key={category} className="block mb-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="mr-2"
                          />
                          {category}
                        </label>
                      ))}
                    {categories.length > 5 && (
                      <button
                        onClick={() => setSeeMoreCategories(!seeMoreCategories)}
                        className="text-blue-500 mt-2"
                      >
                        {seeMoreCategories ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                  {/* Author Checkboxes */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Authors</h4>
                    {authors
                      .slice(0, seeMoreAuthors ? authors.length : 5)
                      .map((author) => (
                        <label key={author} className="block mb-2">
                          <input
                            type="checkbox"
                            checked={selectedAuthors.includes(author)}
                            onChange={() => handleAuthorChange(author)}
                            className="mr-2"
                          />
                          {author}
                        </label>
                      ))}
                    {authors.length > 5 && (
                      <button
                        onClick={() => setSeeMoreAuthors(!seeMoreAuthors)}
                        className="text-blue-500 mt-2"
                      >
                        {seeMoreAuthors ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                  {/* Price Range Slider */}
                  <div>
                    <h4 className="font-bold mb-2">Price Range</h4>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, e.target.value])}
                      className="w-full"
                    />
                    <p className="mb-10">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BooksPage;
