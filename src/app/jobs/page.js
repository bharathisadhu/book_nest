"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import Link from "next/link";

export default function Jobs() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <Banner title="Job Opportunities" linkName="Home" />
        <div className="relative h-screen flex items-center justify-center bg-branding bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Join the BookNest Team!
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
              We are currently not hiring, but we welcome passionate individuals
              to connect with us!
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/contact">
                <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Our Culture Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Our Culture
          </h2>
          <p className="text-center text-gray-700">
            At BookNest, we foster a culture of creativity, collaboration, and
            inclusivity. We believe that diverse perspectives fuel innovation
            and drive our mission forward.
          </p>
        </div>

        {/* Future Opportunities Section */}
        <div className="py-12 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Future Opportunities
          </h2>
          <p className="text-center text-gray-700">
            We’re always on the lookout for talented individuals who share our
            passion for books and community. Stay tuned for future openings!
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/subscribe">
              <button className="px-8 py-3 rounded-full bg-[#F65D4E] text-white font-semibold flex justify-center items-center">
                Subscribe for Updates
              </button>
            </Link>
          </div>
        </div>

        {/* Join Our Community Section */}
        <div className="py-12 px-6 md:px-20">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Join Our Community
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Become part of our growing community and connect with fellow book
            lovers. Follow us on our social media channels for updates and
            insights.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/facebook" className="text-[#F65D4E]">
              Facebook
            </Link>
            <Link href="/twitter" className="text-[#F65D4E]">
              Twitter
            </Link>
            <Link href="/instagram" className="text-[#F65D4E]">
              Instagram
            </Link>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="py-12 px-6 md:px-20 bg-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Contact Us
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Have questions or want to know more? Feel free to reach out to us!
          </p>
          <div className="flex justify-center mt-6">
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
