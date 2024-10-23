"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/BookNest.png";

export default function Design() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 mt-[75px] lg:mt-[120px]">
        {/* Hero Section */}
        <Banner title="Design" linkName="Home" />
        <div className="relative h-screen flex items-center justify-center bg-branding bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Crafting Beautiful Experiences
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
              Design matters at BookNest!
            </p>
            <Link href="/explore-design">
              <button className="mt-6 px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                Explore Our Design Principles
              </button>
            </Link>
          </div>
        </div>

        {/* Our Design Philosophy Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Our Design Philosophy
          </h2>
          <p className="text-center text-gray-700">
            At BookNest, we prioritize a user-centered design approach, creating
            visually appealing and intuitive experiences for our readers. Our
            goal is to ensure that the design reflects our love for books and
            storytelling.
          </p>
        </div>

        {/* Design Elements Section */}
        <div className="py-12 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Key Design Elements
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="mr-4">
              <Image src={logo} alt="BookNest Logo" width={200} height={200} />
            </div>
            <div>
              <p className="text-lg font-semibold">Typography:</p>
              <p className="text-gray-700">
                We use a combination of serif and sans-serif fonts to create a
                balance between tradition and modernity.
              </p>
              <p className="mt-4 text-lg font-semibold">Color Palette:</p>
              <div className="flex mt-2">
                <div className="w-10 h-10 bg-[#F65D4E] mr-2"></div>
                <div className="w-10 h-10 bg-[#4A4A4A] mr-2"></div>
                <div className="w-10 h-10 bg-[#FFFFFF]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Inspiration Section */}
        <div className="py-12 px-6 md:px-20 bg-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Our Design Inspirations
          </h2>
          <div className="flex flex-col items-center">
            <blockquote className="text-lg italic text-gray-600">
              "Great design is a reflection of our love for storytelling and the
              pursuit of knowledge."
            </blockquote>
            <cite className="mt-2 text-gray-800">— Design Team</cite>
          </div>
        </div>

        {/* Join the Design Community Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Join the Design Community
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Be part of our creative journey! Get updates, tips, and inspiration
            right in your inbox.
          </p>
          <div className="flex justify-center">
            <Link href="/subscribe-design">
              <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
                Subscribe Now
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
