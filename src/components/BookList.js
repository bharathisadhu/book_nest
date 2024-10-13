"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Loading from "../app/loading";
import Swal from "sweetalert2";
import Image from "next/image";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State for the uploaded image URL
  const [imageFile, setImageFile] = useState(null); // State for the image file
  const itemsPerPage = 10; // Keep this to control the number of books loaded at once
  const [hasMore, setHasMore] = useState(true); // To track if more books are available
  const [currentStartIndex, setCurrentStartIndex] = useState(0); // Current index for loading books

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
        setHasMore(data.length > itemsPerPage); // Check if more books are available
      } else {
        console.error("Failed to fetch books: ", res.status);
        setBooks([]);
      }

      setIsLoading(false);
    };

    fetchBooks();

    // Set up an interval to fetch books every 2 seconds
    const interval = setInterval(fetchBooks, 2000); // 2 seconds

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const loadMoreBooks = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books?start=${currentStartIndex}&limit=${itemsPerPage}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const newBooks = await res.json();
      setBooks((prev) => [...prev, ...newBooks]);
      setCurrentStartIndex((prev) => prev + itemsPerPage); // Update the start index
      setHasMore(newBooks.length === itemsPerPage); // Check if more books are available
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100; // Adjust threshold as needed
      if (bottom) {
        loadMoreBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading]);

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data.data.display_url; // Return the URL of the uploaded image
    } else {
      await Swal.fire({
        title: "Error!",
        text: "Image upload failed.",
        icon: "error",
      });
      return null;
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

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        bookData.image = uploadedImageUrl; // Set the uploaded image URL
      }
    }

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
      setImageFile(null); // Reset the image file state
      setImageUrl(""); // Reset the image URL state
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
    setImageUrl(book.image || ""); // Set the current image URL
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setImageFile(null); // Reset the image file state
    setImageUrl(""); // Reset the image URL state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setSelectedBook((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  if (isLoading && books.length === 0) {
    return <Loading />; // Use your existing loading component
  }

  if (books.length === 0) {
    return <div>No books found or failed to load books.</div>;
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Image
            </th>
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
          {books.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                <Image
                  src={book.image}
                  alt={book.name}
                  width={40}
                  height={60}
                />
              </td>
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

      {isLoading && (
        <div className="text-center mt-4">Loading more books...</div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(selectedBook); // Call updateBook directly
              }}
              className="flex"
            >
              <div className="flex-1">
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
              </div>

              {/* New section for image upload on the right side */}
              <div className="ml-4 w-1/3">
                <label className="block text-sm">Current Image</label>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Book cover"
                    width={200}
                    height={300}
                    className="mt-2 mb-2"
                  />
                )}
                <label className="block text-sm mt-4">Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div>
            </form>

            {/* Buttons stay at the bottom of the modal */}
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateBook(selectedBook); // Call updateBook directly
                }}
                className="bg-[#F65D4E] text-white px-4 py-2 rounded"
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
          </div>
        </div>
      )}
    </div>
  );
}
