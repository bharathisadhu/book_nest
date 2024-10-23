"use client";

import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const Banner = ({ title, linkName }) => {
  return (
    <div className="bg-branding relative mt-[75px] lg:mt-[120px] flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 py-10 rounded-xl overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#eb6f64] to-gray-900 opacity-50"></div>

      {/* Content */}
      <h2 className="relative lg:py-10 lg:ml-10 font-extrabold text-5xl z-10 text-white">
        {title}
      </h2>

      <h3 className="relative lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2 z-10 text-white">
        <Link href="/">{linkName}</Link>
        <GoArrowRight className="" />
        <span className="text-orange-600">{title}</span>
      </h3>
    </div>
  );
};

export default Banner;
