"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Loading from "../app/loading";
import Swal from "sweetalert2";

export default function ProductsList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch books: ", res.status);
        setBooks([]);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage);

  const removeBook = async (id) => {
    const bookToDelete = books.find((book) => book._id === id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        await Swal.fire({
          title: "Error!",
          text: "There was an error deleting the book.",
          icon: "error",
        });
        setBooks((prevBooks) => [...prevBooks, bookToDelete]);
      } else {
        await Swal.fire({
          title: "Deleted!",
          text: "The book has been deleted.",
          icon: "success",
        });
      }
    } else {
      setBooks((prevBooks) => [...prevBooks, bookToDelete]);
    }
  };

  const updateBook = async (bookData) => {
    setIsUpdating(true); // Set loading state immediately

    const previousBook = books.find((book) => book._id === bookData._id);
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookData._id ? { ...book, ...bookData } : book
      )
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      }
    );

    if (res.ok) {
      const updatedBook = await res.json();

      await Swal.fire({
        title: "Updated!",
        text: "The book has been updated.",
        icon: "success",
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        )
      );
      setIsModalOpen(false);
      setSelectedBook(null);
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error updating the book.",
        icon: "error",
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === previousBook._id ? previousBook : book
        )
      );
    }
    setIsUpdating(false);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setSelectedBook((prev) => ({ ...prev, [name]: updatedValue }));
  };

  if (isLoading) {
    return <Loading />; // Use your existing loading component
  }

  if (currentBooks.length === 0) {
    return <div>No books found or failed to load books.</div>;
  }

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ratings
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {currentBooks.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-4 text-sm text-gray-800">{book?.name}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {book?.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{book.author}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                ${book.price.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {book.ratings}
              </td>
              <td className="flex px-4 py-4 text-sm text-gray-800">
                <button onClick={() => handleEditClick(book)}>
                  <HiPencilAlt size={24} />
                </button>
                <button
                  onClick={() => removeBook(book._id)}
                  className="text-red-400 ml-2"
                >
                  <HiOutlineTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(selectedBook); // Call updateBook directly
              }}
            >
              <div className="mt-4">
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedBook?.name || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Author</label>
                <input
                  type="text"
                  name="author"
                  value={selectedBook?.author || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={selectedBook?.price || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                  step="0.01"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Category</label>
                <input
                  type="text"
                  name="category"
                  value={selectedBook?.category || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={selectedBook?.description || ""}
                  onChange={handleInputChange}
                  className="border p-2 w-full h-32"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-[#F65D4E] text-black px-4 py-2 rounded"
                >
                  {isUpdating ? "Updating..." : "Update Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
