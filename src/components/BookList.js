"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import Loading from "../app/loading";
import Swal from "sweetalert2";
import Image from "next/image";
import axios from "axios";

export default function BooksList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/books-pagination?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setBooks(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const bottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 100; // Adjust threshold as needed
  //     if (bottom) {
  //       loadMoreBooks();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasMore, isLoading]);

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
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire("Error!", "There was an error deleting the book.", "error");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    } else {
      setBooks((prevBooks) => [...prevBooks, bookToDelete]);
    }
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post("YOUR_IMAGE_UPLOAD_API_URL", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl; // Adjust according to your API response
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const updateBook = async (id) => {
    setIsUpdating(true);

    let updatedImageUrl = imageUrl;
    if (imageFile) {
      updatedImageUrl = await uploadImage(imageFile);
    }

    const updatedBookData = { ...selectedBook, image: updatedImageUrl };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBookData),
      }
    );

    if (res.ok) {
      const updatedBook = await res.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === id ? updatedBook : book))
      );
      await Swal.fire({
        title: "Updated!",
        text: "The book has been updated.",
        icon: "success",
      });
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error updating the book.",
        icon: "error",
      });
    }
    setIsUpdating(false);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setImageFile(null);
  };

  const addBook = async () => {
    setIsAdding(true);

    let imageUrl = "";
    if (newBook.image) {
      imageUrl = await uploadImage(newBook.image);
    }

    const bookData = { ...newBook, image: imageUrl };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (res.ok) {
      const addedBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      await Swal.fire({
        title: "Added!",
        text: "The book has been added.",
        icon: "success",
      });
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error adding the book.",
        icon: "error",
      });
    }

    setIsAdding(false);
    handleCloseAddModal();
  };

  const handleCloseAddModal = () => {
    setIsModalOpen(false);
    setNewBook({
      name: "",
      author: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
  };

  const handleAddBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChangeForNewBook = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook((prev) => ({ ...prev, image: file }));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-[#F65D4E] text-white px-4 py-2 rounded flex items-center"
      >
        <HiPlus size={20} className="mr-2" />
        Add Book
      </button>
      <table className="min-w-full">
        <thead>
          <tr className="border-b bg-gray-800 text-white">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b">
              <td className="px-4 py-2">
                <Image
                  src={book.image}
                  alt={book.name}
                  width={50}
                  height={50}
                />
              </td>
              <td className="px-4 py-2">{book.name}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">${book.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsModalOpen(true);
                  }}
                  className="mr-2 text-blue-600"
                >
                  <HiPencilAlt />
                </button>
                <button
                  onClick={() => removeBook(book._id)}
                  className="text-red-600"
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`mx-1 px-4 py-2 border rounded ${
              number === page ? "bg-[#F65D4E] text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Update Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(selectedBook._id);
              }}
              className="flex"
            >
              <div className="flex-1">
                <div className="mt-4">
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedBook.name}
                    onChange={handleUpdateChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={selectedBook.author}
                    onChange={handleUpdateChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={selectedBook.price}
                    onChange={handleUpdateChange}
                    className="border p-2 w-full"
                    required
                    step="0.01"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Description</label>
                  <textarea
                    name="description"
                    value={selectedBook.description}
                    onChange={handleUpdateChange}
                    className="border p-2 w-full h-32"
                    required
                  />
                </div>
              </div>
              <div className="ml-4 w-1/3">
                <label className="block text-sm">Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateBook(selectedBook._id);
                }}
                className={`bg-[#F65D4E] text-white px-4 py-2 rounded ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Add New Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addBook();
              }}
            >
              <div className="mt-4">
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newBook.name}
                  onChange={handleAddBookChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Author</label>
                <input
                  type="text"
                  name="author"
                  value={newBook.author}
                  onChange={handleAddBookChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newBook.price}
                  onChange={handleAddBookChange}
                  className="border p-2 w-full"
                  required
                  step="0.01"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={newBook.description}
                  onChange={handleAddBookChange}
                  className="border p-2 w-full h-32"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeForNewBook}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className={`bg-[#F65D4E] text-white px-4 py-2 rounded ${
                    isAdding ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="bg-gray-300 px-4 py-2 rounded"
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
