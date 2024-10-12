"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    fetch(`${baseURL}/api/blogs`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [baseURL]);

  return (
    <div className="bg-gray-50 w-full p-4 my-10 md:my-12 lg:my-28 container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl lg:text-4xl font-semibold text-black">
          Latest Blog Post
        </h2>
        <div className="border-t-2 border-gray-300 w-[25%] md:w-[60%] lg:w-[65%] mt-4"></div>
        <Link href={"/blogs"}>
          <button className="btn rounded-3xl bg-[#F65D4E] text-white px-8">
            View All
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="flex items-center space-x-4">
              <Image
                src={post.image}
                alt={post.title}
                width={112} // Fixed width
                height={80} // Fixed height
                className="w-28 h-20 object-cover rounded-md"
              />
              <div>
                <p className="text-gray-400 text-sm">{post.date}</p>
                <Link href={`/blogs/${post._id}`}><h3 className="text-lg font-semibold hover:text-red-400">
                  {post.title}
                </h3></Link>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 max-h-max space-y-6">
          {posts.slice(3, 4).map((post) => (
            <div key={post.id} className="relative rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={960} // Adjust based on your layout
                height={384} // Adjust based on your layout
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
              <div className="absolute bottom-0 left-0 px-8 pt-52 w-full h-full">
                <p className="text-white text-sm">{post.date} / BY ADMIN</p>
                <Link href={`/blogs/${post._id}`}><h3 className="text-lg font-semibold hover:text-red-400">
                  {post.title}
                </h3></Link>
                <button className="text-white mt-6 underline">Read More</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {posts.slice(5, 9).map((post) => (
            <div key={post.id} className="flex items-center space-x-4">
              <Image
                src={post.image}
                alt={post.title}
                width={112} // Fixed width
                height={80} // Fixed height
                className="w-28 h-20 object-cover rounded-md"
              />
              <div>
                <p className="text-gray-400 text-sm">{post.date}</p>
                <Link href={`/blogs/${post._id}`}><h3 className="text-lg font-semibold hover:text-red-400">
                  {post.title}
                </h3></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
