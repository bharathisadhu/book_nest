"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Image for upload
  const [price, setPrice] = useState(""); // New state for price
  const [cardCount, setcardCount] = useState(""); // New state for cardCount
  const [category, setCategory] = useState(""); // New state for catogory
  const [ratings, setRatings] = useState(""); // New state for ratings
  const [publishType, setPublishType] = useState("upcoming"); // New state for publish type
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", image);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.url;

      // Submit book data to the API
      const bookData = {
        name: title,
        author,
        description,
        category,
        image: imageUrl,
        price: parseFloat(price), // Ensure price is a number
        ratings: parseFloat(ratings), // Ensure ratings is a number
        cardCount: parseInt(cardCount, 10), // Ensure cardCount is an integer
        publishType,
        cardCount: 1,
      };

      await axios.post("/api/books", bookData);

      // After successful book addition, redirect to the books page
      router.push("/dashboard/books");
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 mb-4">
            <label htmlFor="title" className="block font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex-1 mb-4">
            <label htmlFor="author" className="block font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-2">
              Book Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex-1 mb-4">
            <label htmlFor="author" className="block font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 mb-4">
            <label htmlFor="price" className="block font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              step="0.01" // Allow decimal values
            />
          </div>

          <div className="flex-1 mb-4">
            <label htmlFor="cardCount" className="block font-medium mb-2">
              cardCount
            </label>
            <input
              type="number"
              id="cardCount"
              value={cardCount}
              onChange={(e) => setcardCount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex-1 mb-4">
            <label htmlFor="ratings" className="block font-medium mb-2">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              step="0.1" // Allow decimal values
              max="5" // Limit maximum ratings
              min="0" // Limit minimum ratings
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="publishType" className="block font-medium mb-2">
            Publish Type
          </label>
          <select
            id="publishType"
            value={publishType}
            onChange={(e) => setPublishType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="upcoming">Upcoming</option>
            <option value="released">Released</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
