"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Image from "next/image";
import Link from "next/link";

export default function Advertise() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 mt-[75px] lg:mt-[120px]">
        {/* Hero Section */}
        <Banner title="Advertise with Us" linkName="Home" />
        <div className="relative h-screen flex items-center justify-center bg-branding bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Reach Your Audience at BookNest
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
              Promote your books and connect with passionate readers!
            </p>
            <Link href="/contact">
              <button className="mt-6 px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Why Advertise with Us Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Why Advertise with Us?
          </h2>
          <p className="text-center text-gray-700">
            At BookNest, we have a dedicated community of readers who are eager
            to discover new books. By advertising with us, you can:
          </p>
          <ul className="mt-4 list-disc list-inside text-center text-gray-700">
            <li>Gain visibility among avid readers</li>
            <li>Boost sales and readership</li>
            <li>Engage with a community passionate about literature</li>
          </ul>
        </div>

        {/* Advertising Options Section */}
        <div className="py-12 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Our Advertising Options
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/3 p-4 text-center">
              <h3 className="text-xl font-semibold">Sponsored Posts</h3>
              <p className="mt-2 text-gray-700">
                Feature your book in a dedicated post, reaching our audience
                directly.
              </p>
            </div>
            <div className="md:w-1/3 p-4 text-center">
              <h3 className="text-xl font-semibold">Banner Ads</h3>
              <p className="mt-2 text-gray-700">
                Place a banner ad on our website to catch the attention of
                visitors.
              </p>
            </div>
            <div className="md:w-1/3 p-4 text-center">
              <h3 className="text-xl font-semibold">Email Promotions</h3>
              <p className="mt-2 text-gray-700">
                Reach our subscribers through targeted email campaigns to
                promote your books.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-12 px-6 md:px-20 bg-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-4">
            What Our Advertisers Say
          </h2>
          <div className="flex flex-col items-center">
            <blockquote className="text-lg italic text-gray-600">
              "Advertising on BookNest significantly increased my book sales!
              Highly recommend!"
            </blockquote>
            <cite className="mt-2 text-gray-800">— Satisfied Author</cite>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Ready to Advertise?
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Contact us today to discuss your advertising needs and how we can
            help you grow your audience!
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
