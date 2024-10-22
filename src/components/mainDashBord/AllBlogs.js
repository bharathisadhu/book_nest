
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";


export default async function BlogList() {


    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  

    const [loading, setLoading] = useState(false);
    const limit = 10; // Number of rows per page


    useEffect(() => {
    
        const fetchData = async () => {
           
            try {


              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs-pagination?page=${page}&limit=${limit}`,{ cache: "no-store" });
              
               
                setBlogs(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch users:', error);
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


  if (blogs.length === 0) {
    return <div>No blogs found or failed to load blogs.</div>; 
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto">


    
          
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 whitespace-nowrap">
                        <tr>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image
            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">title</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">author</th>
                             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">category</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">date</th>
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
                />
              </td>
                                <td className="px-4 py-4 text-sm text-gray-800">{blog?.title}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">{blog?.author}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">{blog?.category}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">{blog?.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           
            <div className="flex justify-between items-center mt-4">
                <button 
                    className="btn btn-primary" 
                    onClick={handlePreviousPage} 
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {page} of {totalPages}
                </span>
                <button 
                    className="btn btn-primary" 
                    onClick={handleNextPage} 
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>

     
    </div>
  );
}
