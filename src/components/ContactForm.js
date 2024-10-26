"use client";

import {useForm, ValidationError } from '@formspree/react';
import Link from 'next/link';
import React from 'react';
// import { useForm } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xwpkvpda"); //xvgporjo 
  if (state.succeeded) {
    return <p className='text-[red] p-5 text-[25px]'>Thanks for join us!
    <br></br>
 
            <Link href="/">
              back to home
            </Link>
        
    
    </p>;
  }
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div className="my-10">
        
          <input
            className="w-full px-5 py-3 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
          />
          <ValidationError 
        prefix="name" 
        field="name"
        errors={state.errors}
      />
        </div>
        <div className="my-10">
         
          <input
            className="w-full px-5 py-3 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />

        <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
        </div>
        <div className="my-10">
         
          <textarea
            className="w-full px-5 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="message"
            rows="4"
            name="message"
            placeholder="Your Message"
          ></textarea>

<ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
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
          type="submit" disabled={state.submitting}
          className="bg-[#f4402f] text-white py-4 px-10 rounded-full hover:bg-blue-600 transition duration-300 flex"
        >
          Send Message <span><IoIosArrowForward className="ml-1 mt-1 text-[white]" /></span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;