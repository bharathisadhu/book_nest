"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { useRouter, useSearchParams } from "next/navigation";
import { GoChevronDown } from "react-icons/go";
import Head from "next/head";
import { HiX } from "react-icons/hi";

// Dynamically import components
const Navbar = dynamic(() => import("@/components/Navbar"));
const Banner = dynamic(() => import("@/components/share/banner"));
const Loader = dynamic(() => import("../loading"));
const BooksCard = dynamic(() => import("@/components/BooksCard"));
const Footer = dynamic(() => import("@/components/Footer"));

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
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const itemsPerPage = 12;

  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const categoriesParam = searchParams.get("category");
  const authorsParam = searchParams.get("author");
  const searchTermParam = searchParams.get("search");

  useEffect(() => {
    // Set initial state from URL parameters
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(","));
    }
    if (authorsParam) {
      setSelectedAuthors(authorsParam.split(","));
    }
    if (searchTermParam) {
      setSearchTerm(searchTermParam);
    }
  }, [categoriesParam, authorsParam, searchTermParam]);

  // Effect to fetch books when filters change
  useEffect(() => {
    // Debounced function to fetch books
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const categories = selectedCategories.join(",");
        const authors = selectedAuthors.join(",");
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];

        const response = await fetch(
          `/api/books?page=${currentPage}&limit=${itemsPerPage}&sort=${
            sort || ""
          }&category=${categories}&author=${authors}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch books. Status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data || []);
        setFilteredBooks(data || []);
        setCategories([...new Set(data.map((book) => book.category) || [])]);
        setAuthors([...new Set(data.map((book) => book.author) || [])]);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [
    currentPage,
    sort,
    selectedCategories,
    selectedAuthors,
    priceRange,
    searchTerm,
  ]);

  // Update filteredBooks based on search term and selected filters
  useEffect(() => {
    const applyFilters = () => {
      let updatedBooks = books;

      // Filter by search term
      if (searchTerm) {
        updatedBooks = updatedBooks.filter(
          (book) =>
            book.title &&
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by selected categories
      if (selectedCategories.length > 0) {
        updatedBooks = updatedBooks.filter((book) =>
          selectedCategories.includes(book.category)
        );
      }

      // Filter by selected authors
      if (selectedAuthors.length > 0) {
        updatedBooks = updatedBooks.filter((book) =>
          selectedAuthors.includes(book.author)
        );
      }

      // Filter by price range
      updatedBooks = updatedBooks.filter(
        (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
      );

      // Sort books if a sort option is selected
      if (sort === "LowToHigh") {
        updatedBooks.sort((a, b) => a.price - b.price);
      } else if (sort === "HighToLow") {
        updatedBooks.sort((a, b) => b.price - a.price);
      } else if (sort === "topRatings") {
        updatedBooks.sort((a, b) => b.rating - a.rating);
      } else if (sort === "lowRatings") {
        updatedBooks.sort((a, b) => a.rating - b.rating);
      }

      setFilteredBooks(updatedBooks);
    };

    applyFilters();
  }, [
    books,
    searchTerm,
    selectedCategories,
    selectedAuthors,
    priceRange,
    sort,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    updateURLParams("category", category);
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
    updateURLParams("author", author);
  };

  const updateURLParams = (param, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (param === "category") {
      const currentCategories =
        newSearchParams.get("category")?.split(",") || [];
      if (currentCategories.includes(value)) {
        currentCategories.splice(currentCategories.indexOf(value), 1);
        if (currentCategories.length > 0) {
          newSearchParams.set("category", currentCategories.join(","));
        } else {
          newSearchParams.delete("category"); // Remove the category param if none are selected
        }
      } else {
        currentCategories.push(value);
        newSearchParams.set("category", currentCategories.join(","));
      }
    } else if (param === "author") {
      const currentAuthors = newSearchParams.get("author")?.split(",") || [];
      if (currentAuthors.includes(value)) {
        currentAuthors.splice(currentAuthors.indexOf(value), 1);
        if (currentAuthors.length > 0) {
          newSearchParams.set("author", currentAuthors.join(","));
        } else {
          newSearchParams.delete("author"); // Remove the author param if none are selected
        }
      } else {
        currentAuthors.push(value);
        newSearchParams.set("author", currentAuthors.join(","));
      }
    } else if (param === "search") {
      if (value) {
        newSearchParams.set("search", value);
      } else {
        newSearchParams.delete("search"); // Remove the search param if empty
      }
    }

    router.push(`/books?${newSearchParams.toString()}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    updateURLParams("search", e.target.value);
  };

  const sorting = (sortOption) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", sortOption);
    router.push(`/books?${newSearchParams.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>BookNest | Books</title>
      </Head>
      <Navbar />
      <div>
        <Banner title="Books" linkName="Home" />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="lg:hidden flex ml-6 mt-6 -mb-10">
              <button
                className="flex justify-center items-center gap-4 p-1 px-4 rounded-lg btn btn-outline -mt-3 lg:mt-5"
                onClick={toggleDrawer}
              >
                Filter
              </button>
            </div>
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
                  <button onClick={() => sorting("LowToHigh")}>
                    <li>
                      <a>Sort by price: low to high</a>
                    </li>
                  </button>
                  <button onClick={() => sorting("HighToLow")}>
                    <li>
                      <a>Sort by price: high to low</a>
                    </li>
                  </button>
                  <button onClick={() => sorting("topRatings")}>
                    <li>
                      <a>Sort by popularity: high to low</a>
                    </li>
                  </button>
                  <button onClick={() => sorting("lowRatings")}>
                    <li>
                      <a>Sort by popularity: low to high</a>
                    </li>
                  </button>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-4 mx-auto mt-6 gap-8 container">
              <div className="hidden lg:block col-span-1 bg-gray-100 p-4 rounded-lg">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search for a book..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
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
                      className="text-[#F65D4E] mt-2"
                    >
                      {seeMoreCategories ? "See Less" : "See More"}
                    </button>
                  )}
                </div>

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
                      className="text-[#F65D4E] mt-2"
                    >
                      {seeMoreAuthors ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full range-slider"
                  />
                  <p className="mb-10">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Books Grid */}
              <div className="col-span-4 lg:col-span-3 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 justify-center divide-y divide-x p-2 gap-4">
                {filteredBooks
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((book) => (
                    <BooksCard key={book._id} book={book} />
                  ))}
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isDrawerOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
                <div className="mt-20 p-8 bg-white w-80 fixed top-0 bottom-0 left-0 z-50 overflow-y-auto">
                  <button
                    className="absolute top-4 right-4 text-black"
                    onClick={toggleDrawer}
                  >
                    <HiX size={24} />
                  </button>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search for a book..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Categories */}
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
                        className="text-[#F65D4E] mt-2"
                      >
                        {seeMoreCategories ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>

                  {/* Authors */}
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
                        className="text-[#F65D4E] mt-2"
                      >
                        {seeMoreAuthors ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Price Range</h4>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, Number(e.target.value)])
                      }
                      className="w-full range-slider"
                    />
                    <p className="mb-10">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8 mb-10">
              <div className="flex space-x-2">
                {Array.from(
                  { length: Math.ceil(filteredBooks.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-[#F65D4E] text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BooksPage;
