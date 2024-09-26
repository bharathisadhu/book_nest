import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";
const BlogsPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10">
        <h2 className=" lg:py-10 lg:ml-10 font-extrabold text-5xl">Blogs</h2>

        <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
          <Link href="/">HOME</Link>

          <GoArrowRight className="" />
          <sapn className="text-orange-600">Blogs</sapn>
        </h3>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog Content Section (Spans 2 Columns on Large Screens) */}
          <div className="lg:col-span-2">
            <div className="rounded-lg  p-6 mb-6">
              <Image
                height={540}
                width={1125}
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/blog_7-1125x540.jpg"
                alt="Card Image 1"
                className="w-full h-auto object-cover border rounded-lg"
              />

              <h3 className="uppercase font-thin my-3">
                November 14, 2022 By huongdo
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                5 Attractive Bookstore WordPress Themes
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat
              </p>
              <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
              <sapn className="flex justify-between">
                <sapn className="uppercase">
                  In <span className="text-rose-600">Category Name</span>
                </sapn>
                <sapn className="font-semibold">Read More</sapn>
              </sapn>
            </div>

            <div className="rounded-lg  p-6 mb-6">
              <Image
                height={540}
                width={1125}
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_6-1046x540.jpg"
                alt="Card Image 1"
                className="w-full h-auto object-cover border rounded-lg"
              />

              <h3 className="uppercase font-thin my-3">
                November 14, 2022 By huongdo
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                Behind the Scenes with Author Victoria Aveyard
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna lirabe ites
                ipsum dolor sit amet…
              </p>
              <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
              <sapn className="flex justify-between">
                <sapn className="uppercase">
                  In <span className="text-rose-600">Cultural</span>
                </sapn>
                <sapn className="font-semibold">Read More</sapn>
              </sapn>
            </div>

            <div className="rounded-lg  p-6 mb-6">
              <Image
                height={540}
                width={1125}
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_5-1125x540.jpg"
                alt="Card Image 1"
                className="w-full h-auto object-cover border rounded-lg"
              />

              <h3 className="uppercase font-thin my-3">
                November 14, 2022 By admin
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                Oprah’s Latest Book Club Pick is Being Adapted for TV!
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna lirabe ites
                ipsum dolor sit amet…
              </p>
              <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
              <sapn className="flex justify-between">
                <sapn className="uppercase">
                  In <span className="text-rose-600">Arts & Literature</span>
                </sapn>
                <sapn className="font-semibold">Read More</sapn>
              </sapn>
            </div>

            {/* Add more blog posts here */}
          </div>

          {/* Categories Section (1 Column on Large Screens) */}
          <div className="p-6 hidden lg:block">
            <div className="container mx-auto rounded-lg border-2">
              <h2 className="py-5 pl-10 text-xl font-bold">Search</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
                <FaSearch className="absolute right-12 top-8 text-gray-400" />
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Categories</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
                <ul>
                  <li className="flex gap-1">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Arts & Literature</sapn>
                  </li>

                  <li className="flex gap-1 my-3">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Cultural</sapn>
                  </li>

                  <li className="flex gap-1 my-3">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>European</sapn>
                  </li>

                  <li className="flex gap-1">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Uncategorized</sapn>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Recent Posts</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
                <ul>
                  <li className="flex gap-3 my-5">
                    <div className="w-1/4">
                      <Image
                        height={80}
                        width={80}
                        src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_5-150x150.jpg"
                        alt="Card Image 1"
                        className="w-[80px] h-auto object-cover border rounded-lg"
                      />
                    </div>

                    <div className="w-3/4">
                      <h3 className="font-thin uppercase text-[15px]">
                        November 14, 2022
                      </h3>
                      <h2 className="font-semibold leading-5">
                        7 Books to Combat Racism
                      </h2>
                    </div>
                  </li>
                  <li className="flex gap-3 my-5">
                    <div className="w-1/4">
                      <Image
                        height={80}
                        width={80}
                        src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_6-150x150.jpg"
                        alt="Card Image 1"
                        className="w-[80px] h-auto object-cover border rounded-lg"
                      />
                    </div>

                    <div className="w-3/4">
                      <h3 className="font-thin uppercase text-[15px]">
                        November 14, 2022
                      </h3>
                      <h2 className="font-semibold leading-5">
                        Behind the Scenes with Author Victoria Aveyard
                      </h2>
                    </div>
                  </li>

                  <li className="flex gap-3 my-5">
                    <div className="w-1/4">
                      <Image
                        height={80}
                        width={80}
                        src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_4-150x150.jpg"
                        alt="Card Image 1"
                        className="w-[80px] h-auto object-cover border rounded-lg"
                      />
                    </div>

                    <div className="w-3/4">
                      <h3 className="font-thin uppercase text-[15px]">
                        November 14, 2022
                      </h3>
                      <h2 className="font-semibold leading-5">
                        7 Books to Combat Racism
                      </h2>
                    </div>
                  </li>
                  <li className="flex gap-3 my-5">
                    <div className="w-1/4">
                      <Image
                        height={80}
                        width={80}
                        src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/blog_3-150x150.jpg"
                        alt="Card Image 1"
                        className="w-[80px] h-auto object-cover border rounded-lg"
                      />
                    </div>

                    <div className="w-3/4">
                      <h3 className="font-thin uppercase text-[15px]">
                        November 14, 2022
                      </h3>
                      <h2 className="font-semibold leading-5">
                        Top 10 Books to Make It a Great Year
                      </h2>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Tags</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 pl-10">
                <sapn className="mr-5">Book</sapn>
                <sapn className="mr-5">Hardback</sapn>
                <sapn className="mr-5">Mixed media</sapn>
                <sapn className="mr-5">Paperback</sapn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogsPage;
