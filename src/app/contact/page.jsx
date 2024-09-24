import Navbar from '@/components/Navbar';
import { Span } from 'next/dist/trace';
import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <>
    <Navbar/>
    

    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10">
      <h2 className=" lg:py-10 lg:ml-10 font-extrabold text-5xl">CONTACT</h2>
      
      <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">

      <Link href="/">
      HOME
        </Link>
        
        <GoArrowRight className="" /><sapn className="text-orange-600">CONTACT</sapn>
      
      </h3>
    </div>



    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-2 lg:p-10 lg:gap-3 mt-10">
    {/* Left - Map Section */}
    <div className="w-full lg:w-1/2 h-[460px] lg:h-[460px] mb-6 lg:mb-0 pr-0">
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
        Connect with us today for inquiries or collaboration. We’re here to assist you, feel free to reach out!
      </p>

      <form className="">
        <div className="my-10">
        
          <input
            className="w-full px-5 py-3 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            id="name"
            placeholder="Your Name"
          />
        </div>
        <div className="my-10">
         
          <input
            className="w-full px-5 py-3 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div className="my-10">
         
          <textarea
            className="w-full px-5 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="message"
            rows="4"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div>
        <div className="">
  <label className="label cursor-pointer  lg:flex mb-5">
    
    <input type="checkbox" defaultChecked className="checkbox" />
    <span className="">Save my name, email, and website in this browser for the next time I comment.</span>
  </label>
</div>
        </div>
        <button
          type="submit"
          className="bg-[#f4402f] text-white py-4 px-10 rounded-full hover:bg-blue-600 transition duration-300 flex"
        >
          Send Message <span><IoIosArrowForward className="ml-1 mt-1 text-[white]" /></span>
        </button>
      </form>
    </div>
  </div>
  <hr className="my-6 border-t-1 border-gray-300" />
  <h2 className="container mx-auto px-4 py-8 text-center uppercase text-xl font-bold">our book store</h2>
  <div className="container mx-auto px-4 py-8">
  
  <div className="grid gap-0 md:grid-cols-1 lg:grid-cols-3">
   
    <div className=" rounded-lg  p-4">
    

    <Image
                height={200}
                width={200}
                  src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_1.png"
                  alt="Card Image 1"
                  className="w-full h-48 object-cover border rounded-lg"
                />
      <h2 className="text-xl font-semibold mt-10">New York</h2>
      <p className="text-gray-600 my-10">3164 N Delaware Rd Milan, Indiana(IN), 47031<br/>Hotline: +(84) 2500 888 33<br/>support@example.com</p>

      <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
      <p className="text-gray-600 my-10">Open: 8:00AM – Close: 18:00PM<br/>Saturday – Sunday: Close</p>

    </div>

   
    <div className=" rounded-lg  p-4">


    <Image
                height={200}
                width={200}
                  src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_2.png"
                  alt="Card Image 2"
                  className="w-full h-48 object-cover border rounded-lg"
                />

 

      <h2 className="text-xl font-semibold mt-10">Las Vegas</h2>
      <p className="text-gray-600 my-10">3164 N Delaware Rd Milan, Indiana(IN), 47031<br/>Hotline: +(84) 2500 888 33<br/>support@example.com</p>

      <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
      <p className="text-gray-600 my-10">Open: 8:00AM – Close: 18:00PM<br/>Saturday – Sunday: Close</p>

      
      
    </div>

   
    <div className=" rounded-lg  p-4">
 

    <Image
                height={200}
                width={200}
                  src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/contact_pic_3.png"
                  alt="Card Image 3"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
      <h2 className="text-xl font-semibold mt-10">Los Angeles</h2>
      <p className="text-gray-600 my-10">3164 N Delaware Rd Milan, Indiana(IN), 47031<br/>Hotline: +(84) 2500 888 33<br/>support@example.com</p>

      <h2 className="text-xl font-semibold mt-4">Working Hours</h2>
      <p className="text-gray-600 my-10">Open: 8:00AM – Close: 18:00PM<br/>Saturday – Sunday: Close</p>
    </div>
  </div>
</div>
  <Footer/>
  </>
  );
};

export default ContactPage;