"use client";

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const ContactForm = () => {
  return (
    <div>
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
  );
};

export default ContactForm;