'use client'
import React, { useEffect, useState } from "react";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
         const response = await fetch(`${baseUrl}/api/blogs`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data); // Assuming data is an array of blog objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [baseUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
             
              <td className="border border-gray-300 p-2">{blog.title}</td>
              <td className="border border-gray-300 p-2">{blog.author}</td>
              <td className="border border-gray-300 p-2">{blog.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;