"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddBook = ({ setIsModalOpen, setBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [cardCount, setCardCount] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const [publishType, setPublishType] = useState("upcoming");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpenLocal] = useState(false); // Local state for modal visibility
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.url;

      const bookData = {
        name: title,
        author,
        description,
        category,
        image: imageUrl,
        price: parseFloat(price),
        ratings: parseFloat(ratings),
        cardCount: parseInt(cardCount),
        publishType,
      };

      const response = await axios.post("/api/books", bookData);
      setBooks((prevBooks) => [...prevBooks, response.data]); // Update the book list
      setIsModalOpen(false); // Close the modal
      router.push("/dashboard/books");
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          Add New Book
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[#F65D4E] text-xl font-bold">Add New Book</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Name of the product
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Descriptions
                </label>
                <textarea
                  placeholder="Write about the product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={cardCount}
                  onChange={(e) => setCardCount(e.target.value)}
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Selling price
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  required
                  step="0.01"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close modal
                  className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
