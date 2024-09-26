
"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import Swal from 'sweetalert2';

const Page = () => {
    const [wishStorage, setWishStorage] = useState(() => {
        const storedWish = JSON.parse(localStorage.getItem('bookmark'));
        return storedWish || [];
    });
    const [cartNum, setCartNum] = useState(wishStorage.length);

    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedWishStorage = wishStorage.filter(item => item.id !== id);
                localStorage.setItem('bookmark', JSON.stringify(updatedWishStorage));
                setWishStorage(updatedWishStorage);
                setCartNum(updatedWishStorage.length);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been removed from the wishlist.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <>
            <Navbar cartNum={cartNum} />
            <div className="mb-3">
                <div className="font-sans bg-white max-w-6xl mx-auto p-4">
                    <h2 className="text-3xl font-bold text-gray-800">Your Wishlist ({cartNum})</h2>
                    <div className="overflow-x-auto">
                        <table className="mt-12 w-full border-collapse divide-y">
                            <thead className="whitespace-nowrap text-left">
                                <tr>
                                    <th className="text-base text-gray-500 font-medium p-2">Description</th>
                                    <th className="text-base text-gray-500 font-medium p-2">Rating</th>
                                    <th className="text-base text-gray-500 font-medium p-2">Category</th>
                                    <th className="text-base text-gray-500 font-medium p-2">Price</th>
                                    <th className="text-base text-gray-500 font-medium p-2">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="whitespace-nowrap divide-y">
                                {wishStorage.map((c) => (
                                    <tr key={c.id}>
                                        <td className="px-2 py-4">
                                            <div className="flex items-center gap-4 w-max">
                                                <div className="h-32 shrink-0">
                                                    <Image
                                                        height={200}
                                                        width={200}
                                                        src={c.image}
                                                        alt={c.name}
                                                        className="w-full h-full object-contain rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-gray-800">{c.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-4">
                                            <span className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg text-base p-1">
                                                {c.ratings} <CiStar className="text-orange-700" />
                                            </span>
                                        </td>
                                        <td className="px-2 py-4">{c.category}</td>
                                        <td className="px-2 py-4">
                                            <h4 className="text-base font-bold text-gray-800">${c.price}</h4>
                                        </td>
                                        <td className="px-2 py-4">
                                            <button
                                                type="button"
                                                className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg"
                                                onClick={() => handleRemove(c.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-red-500 inline" viewBox="0 0 24 24">
                                                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;





