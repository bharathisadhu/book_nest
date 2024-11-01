"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Number of rows per page

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Add Book State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [error, setError] = useState("");

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isAddBookModalOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isAddBookModalOpen, isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs-pagination?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );

        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const removeBook = async (id) => {
    const bookToDelete = blogs.find((blog) => blog._id === id);
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        await Swal.fire({
          title: "Error!",
          text: "There was an error deleting the Blog.",
          icon: "error",
        });
        setBlogs((prevBlogs) => [...prevBlogs, bookToDelete]);
      } else {
        await Swal.fire({
          title: "Deleted!",
          text: "The blog has been deleted.",
          icon: "success",
        });
      }
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, bookToDelete]);
    }
  };

  const updateBlog = async (blogData) => {
    setIsUpdating(true); // Set loading state immediately

    const previousBlog = blogs.find((blog) => blog._id === blogData._id);
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === blogData._id ? { ...blog, ...blogData } : blog
      )
    );

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        blogData.image = uploadedImageUrl; // Set the uploaded image URL
      }
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      }
    );

    if (res.ok) {
      const updatedBlog = await res.json();

      await Swal.fire({
        title: "Updated!",
        text: "The Blog has been updated.",
        icon: "success",
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBook : blog
        )
      );
      setIsModalOpen(false);
      setSelectedBlog(null);
      setImageFile(null); // Reset the image file state
      setImageUrl(""); // Reset the image URL state
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error updating the Blog.",
        icon: "error",
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === previousBlog._id ? previousBlog : blog
        )
      );
    }
    setIsUpdating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setSelectedBlog((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
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

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setImageUrl(blog.image || ""); // Set the current image URL
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    setImageFile(null); // Reset the image file state
    setImageUrl(""); // Reset the image URL state
  };

  const handleAddBookInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "shortDescription":
        setShortDescription(value);
        break;
      case "content":
        setContent(value);
        break;

      default:
        break;
    }
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAdd(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.url;

      const blogData = {
        title,
        author,
        shortDescription,
        content,
        category,
        image: imageUrl,
        date: new Date().toISOString().split("T")[0],
      };

      const response = await axios.post("/api/blogs", blogData);

      // Update the book list
      setBlogs((prev) => [...prev, response.data]);

      // Show SweetAlert confirmation
      Swal.fire({
        icon: "success",
        title: "Blog Added!",
        text: `${blogData?.title} has been added successfully!`,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });

      setIsAddBookModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding blog:", error);
      setError("Failed to add the blog. Please try again.");
    } finally {
      setIsLoadingAdd(false);
    }
  };

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

  if (blogs.length === 0) {
    return <div>No blogs found or failed to load blogs.</div>;
  }

  return (
    <div className="font-sans ">
      <div className="mb-4">
        <button
          onClick={() => setIsAddBookModalOpen(true)} // Open Add Book modal
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          Add New Blog
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              title
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              date
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  width={40}
                  height={60}
                  className="w-10 h-10 object-cover"
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{blog?.title}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {blog?.author}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {blog?.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{blog?.date}</td>

              <td className="flex px-4 py-4 text-sm text-gray-800">
                <button onClick={() => handleEditClick(blog)}>
                  <HiPencilAlt size={24} />
                </button>
                <button
                  onClick={() => removeBook(blog._id)}
                  className="text-red-400 ml-2"
                >
                  <HiOutlineTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Blog</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBlog(selectedBlog);
              }}
              className="flex"
            >
              <div className="flex-1">
                <div className="mt-4">
                  <label className="block text-sm">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={selectedBlog?.title || ""}
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
                    value={selectedBlog?.author || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={selectedBlog?.category || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">shortDescription</label>
                  <textarea
                    name="shortDescription"
                    value={selectedBlog?.shortDescription || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full h-32"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Content</label>
                  <textarea
                    name="content"
                    value={selectedBlog?.content || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full h-32"
                    required
                  />
                </div>
              </div>

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
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateBlog(selectedBlog);
                }}
                className="bg-[#F65D4E] text-white px-4 py-2 rounded"
              >
                {isUpdating ? "Updating..." : "Update Blog"}
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

      {isAddBookModalOpen && (
        <div className="fixed inset-0 p-4 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[#F65D4E] text-xl font-bold">
                Add New Blog{" "}
              </h3>
              <button
                onClick={() => setIsAddBookModalOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddBookSubmit} className="space-y-4 mt-8 font-poppins">
              <div className="flex gap-4">
                <div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block mt-2 font-semibold">
                      Name of the Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter title name"
                      value={title}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-red-400 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block mt-2 font-semibold">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Enter product category"
                      value={category}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-red-400 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block mt-2 font-semibold">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      placeholder="Write about short Description"
                      value={shortDescription}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-red-400 focus:bg-transparent rounded-lg"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block font-semibold">
                      Content
                    </label>
                    <textarea
                      name="content"
                      placeholder="Write about short Description"
                      value={content}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-red-400 focus:bg-transparent rounded-lg"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className=" flex-wrap">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block font-semibold mt-2">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      placeholder="Enter Author name"
                      value={author}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-red-400 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <label className="block text-sm font-semibold mt-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 w-48 rounded-md"
                  />
                  {imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={imageUrl}
                        alt="Book cover preview"
                        width={200}
                        height={300}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsAddBookModalOpen(false)} // Close modal
                  className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#F65D4E] hover:bg-red-400 font-semibold"
                  disabled={isLoadingAdd}
                >
                  {isLoadingAdd ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
