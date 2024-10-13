"use client";
import { useState, useEffect } from "react";
import { FaBlog } from "react-icons/fa";

const BlogCount = () => {
  const [Blog, setBlog] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch comments from the backend
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${baseUrl}/api/blogs`);
      const data = await response.json();

      setBlog(data);
    };
    fetchUser();
  }, [baseUrl]);

  return (
    <>
      <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center">
        <div className="flex items-center gap-8">
          {/* <p className="font-bold text-[red]">User Information</p> */}
          <div className="border border-solid rounded-full p-4 bg-slate-100">
          <FaBlog className="text-5xl text-yellow-400"/>
          </div>
          <div className=" border-t-slate-700">
            <div className="text-lg font-medium">Total Blogs</div>
            <div className="text-3xl font-bold">{Blog.length}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCount;
