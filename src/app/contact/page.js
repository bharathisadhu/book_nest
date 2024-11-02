import Navbar from "@/components/Navbar";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Head from "next/head";
import Banner from "@/components/share/banner";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>BookNest | Contact</title>
      </Head>
      <Navbar />
      <Banner title="Contact Us" linkName="Home" />
      {/* Main section */}
      <div className="flex flex-col lg:flex-row p-2 lg:gap-3 mt-10 md:mt-16 lg:mt-20 mb-10 container mx-auto">
        {/* Left - Map Section */}
        <div className="w-full lg:w-1/2 h-[460px] lg:h-[620px] mb-6 lg:mb-0 pr-0">
          <iframe
            className="w-full h-full rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.844319020345!2d90.37464971498071!3d23.75080659460505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70f1e34f6fd%3A0x67f4de71f62ff7e!2sDhaka!5e0!3m2!1sen!2sbd!4v1620069151739!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
        {/* Right - Contact Form */}
        <div className="w-full lg:w-1/2 lg:pl-10">
          <h1 className="text-3xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg mb-6">
            Connect with us today for inquiries or collaboration. We’re here to
            assist you, feel free to reach out!
          </p>
          <ContactForm />
        </div>
      </div>
      <hr className="my-6 border-t-1 border-gray-300" />
      <h2 className="container mx-auto px-4 py-8 text-center uppercase text-xl font-bold">
        our book store
      </h2>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-0 md:grid-cols-1 lg:grid-cols-3">
          <div className="rounded-lg p-4">
            <Image
              height={200}
              width={200}
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_1.png"
              alt="Card Image 1"
              className="w-full h-48 object-cover border rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-10">Dhaka, Bangladesh</h2>
            <p className="text-gray-600 my-10">
            Titumir College gate, Mohakhali
              <br />
              <span className="font-poppins font-bold">Hotline:</span> +(880) 1552404583
              <br />
             <span className="font-poppins font-bold">Email:</span> booknest21@gmail.com
            </p>

            <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
            <p className="text-gray-600 my-10">
              Open: 10:00AM – Close: 09:00PM
              <br />
              Saturday – Sunday: Close
            </p>
          </div>

          <div className="rounded-lg p-4">
            <Image
              height={200}
              width={200}
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_2.png"
              alt="Card Image 2"
              className="w-full h-48 object-cover border rounded-lg"
            />

            <h2 className="text-xl font-semibold mt-10">Chattogram, Bangladesh</h2>
            <p className="text-gray-600 my-10">
             Beside Chittagong College, Chawkbazar, Chattogram
              <br />
              Hotline: +(880) 1741153348
              <br />
              <span className="font-poppins font-bold">Email:</span> booknest21@gmail.com
            </p>

            <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
            <p className="text-gray-600 my-10">
            Open: 10:00AM – Close: 09:00PM
              <br />
              Saturday – Sunday: Close
            </p>
          </div>

          <div className="rounded-lg p-4">
            <Image
              height={200}
              width={200}
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_3.png"
              alt="Card Image 3"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-10">Barishal, Bangladesh</h2>
            <p className="text-gray-600 my-10">
            Beside Barishal College, Barishal
              <br />
              Hotline: +(880) 1330927666
              <br />
              <span className="font-poppins font-bold">Email:</span> booknest21@gmail.com
            </p>
            <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
            <p className="text-gray-600 my-10">
            Open: 10:00AM – Close: 09:00PM
              <br />
              Saturday – Sunday: Close
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
