"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/BookNest.png";

export default function Branding() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 mt-[75px] lg:mt-[120px]">
        {/* Hero Section */}
        <Banner title="Branding" linkName="Home" />
        <div className="relative h-screen flex items-center justify-center bg-branding bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Dive into a World of Stories
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
              Discover your next favorite book at BookNest!
            </p>
            <Link href="/books">
              <button className="mt-6 px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                Explore Our Collection
              </button>
            </Link>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Our Mission
          </h2>
          <p className="text-center text-gray-700">
            At BookNest, we believe in the power of stories to inspire, educate,
            and entertain. Our mission is to create a welcoming community of
            readers who celebrate diversity in literature and share their love
            for reading.
          </p>
        </div>

        {/* Brand Story Section */}
        <div className="py-12 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-4">Our Story</h2>
          <p className="text-center text-gray-700">
            BookNest was founded out of a deep passion for books and
            storytelling. Our founder, a lifelong reader, wanted to create a
            space where everyone could find the perfect book to match their
            interests, connect with other readers, and participate in vibrant
            discussions about literature.
          </p>
        </div>

        {/* Visual Identity Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Visual Identity
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="mr-4">
              <Image src={logo} alt="BookNest Logo" width={200} height={200} />
            </div>
            <div>
              <p className="text-lg font-semibold">Color Palette:</p>
              <div className="flex mt-2">
                <div className="w-10 h-10 bg-[#F65D4E] mr-2"></div>
                <div className="w-10 h-10 bg-[#4A4A4A] mr-2"></div>
                <div className="w-10 h-10 bg-[#FFFFFF]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-12 px-6 md:px-20 bg-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-4">
            What Our Readers Say
          </h2>
          <div className="flex flex-col items-center">
            <blockquote className="text-lg italic text-gray-600">
              "BookNest has transformed my reading experience! I discover books
              I never knew existed!"
            </blockquote>
            <cite className="mt-2 text-gray-800">— Happy Reader</cite>
          </div>
        </div>

        {/* Join the Nest Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Join the Nest
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Become part of our community and receive updates, promotions, and
            exclusive content!
          </p>
          <div className="flex justify-center">
            <Link href="/subscribe">
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
