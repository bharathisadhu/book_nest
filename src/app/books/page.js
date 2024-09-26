/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import BooksCard from "@/components/BooksCard";
import Navbar from "@/components/Navbar";

const BooksPage = () => {
  const [books, setBooks] = useState([]); // Holds all books
  const [filteredBooks, setFilteredBooks] = useState([]); // Holds filtered books
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [selectedCategories, setSelectedCategories] = useState([]); // For category checkboxes
  const [priceRange, setPriceRange] = useState([0, 20]); // Example price range

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // "https://booknest-server-one.vercel.app/api/books"
        'popular-data.json'
      ); // Replace with your API URL
      const data = await response.json();
      console.log(data); // Check the structure of the data
      setBooks(data); // Set all books
      setFilteredBooks(data); // Initialize filtered books
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter books based on search term, categories, and price range
    let filtered = books;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    setFilteredBooks(filtered); // Update the state with filtered books
  }, [searchTerm, selectedCategories, priceRange, books]); // Re-run the filter when any of these change

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove category if already selected
          : [...prev, category] // Add category if not selected
    );
  };


  return (
    <>
    <Navbar></Navbar>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Checkboxes */}
      <div>
        {["Classic", "Dystopian", "Fantasy", "Adventure", "Young Adult"].map(
          (category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          )
        )}
      </div>

      {/* Price Range Slider */}
      <input
        type="range"
        min="0"
        max="20"
        value={priceRange[1]} // Set the maximum price as the value
        onChange={(e) => setPriceRange([0, e.target.value])} // Update price range
      />
      <p>
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </p>

      {/* Main Content for Books */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6 w-3/4">
        {Array.isArray(filteredBooks) &&
          filteredBooks.map((book) => <BooksCard book={book} />)}
      </div>
    </>
  );
};

export default BooksPage;


















//........................Main Code..............................



/* eslint-disable react/jsx-key */
// "use client";
// import React, { useEffect, useState } from "react";
// import BooksCard from "@/components/BooksCard";

// const BooksPage = () => {
//   const [books, setBooks] = useState([]); // Holds all books
//   const [filteredBooks, setFilteredBooks] = useState([]); // Holds filtered books
//   const [searchTerm, setSearchTerm] = useState(""); // For search input
//   const [selectedCategories, setSelectedCategories] = useState([]); // For category checkboxes
//   const [priceRange, setPriceRange] = useState([0, 20]); // Example price range
//   const [cartData, setCartData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         // "https://booknest-server-one.vercel.app/api/books"
//         'popular-data.json'
//       ); // Replace with your API URL
//       const data = await response.json();
//       console.log(data); // Check the structure of the data
//       setBooks(data); // Set all books
//       setFilteredBooks(data); // Initialize filtered books
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Filter books based on search term, categories, and price range
//     let filtered = books;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter((book) =>
//         book.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by selected categories
//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((book) =>
//         selectedCategories.includes(book.category)
//       );
//     }

//     // Filter by price range
//     filtered = filtered.filter(
//       (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
//     );

//     setFilteredBooks(filtered); // Update the state with filtered books
//   }, [searchTerm, selectedCategories, priceRange, books]); // Re-run the filter when any of these change

//   // Handle category checkbox change
//   const handleCategoryChange = (category) => {
//     setSelectedCategories(
//       (prev) =>
//         prev.includes(category)
//           ? prev.filter((c) => c !== category) // Remove category if already selected
//           : [...prev, category] // Add category if not selected
//     );
//   };

//   const addToBookmark = (book) => {
//     setCartData(book);
//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: "Book added to bookmarks!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   return (
//     <>
      
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search for a book..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Category Checkboxes */}
//       <div>
//         {["Classic", "Dystopian", "Fantasy", "Adventure", "Young Adult"].map(
//           (category) => (
//             <label key={category}>
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//               />
//               {category}
//             </label>
//           )
//         )}
//       </div>

//       {/* Price Range Slider */}
//       <input
//         type="range"
//         min="0"
//         max="20"
//         value={priceRange[1]} // Set the maximum price as the value
//         onChange={(e) => setPriceRange([0, e.target.value])} // Update price range
//       />
//       <p>
//         Price Range: ${priceRange[0]} - ${priceRange[1]}
//       </p>

//       {/* Main Content for Books */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6 w-3/4">
//         {Array.isArray(filteredBooks) &&
//           filteredBooks.map((book) => <BooksCard book={book} />)}
//       </div>
//     </>
//   );
// };

// export default BooksPage;
