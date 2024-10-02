"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Banner = () => {
  return (
    <div className="hero">
      <div className="hero-overlay bg-[#00453E] rounded-2xl border-2"></div>

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full border-5">
          <div className="container flex flex-col justify-center p-1 mx-auto sm:py-12 lg:py-4 lg:flex-row lg:justify-between">
            <div className="w-full mx-auto flex  flex-col md:flex-row  overflow-hidden">
              <div className="w-full p-8 sm:p-1 flex flex-col justify-center  text-white font-[sans-serif] ">
                <h2 className="mx-auto uppercase font-light">special offer</h2>
                <p className=" text-white mx-auto text-[25px] lg:text-[50px] mb:text-[40px] font-bold text-center ">
                  Reading is for
                  <br /> all Ages
                </p>
                <h4 className="font-semibold text-[20px] mx-auto mb-[40px] mb:mb-[20px] lg:text-[30px] mb:text-[20px]">
                  By your books In a store
                </h4>
                <button className="bg-[white] text-[black] px-4 py-2 rounded-full  w-[150px] mx-auto font-semibold ">
                  <span className="flex w-[100px] mx-auto">
                    <Link href="/books">Shop Now</Link>
                    <IoIosArrowForward className="ml-1 mt-1 text-[brown]" />
                  </span>
                </button>
              </div>

              <div className="w-full  flex p-10 lg:p-20 mb:p-15 border-5 ml-0 lg:ml-32">
                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/fYKVzJB/36809135.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/3 lg:w-1/4 mb:w-1/3 skew-y-12 my-0 rotate-15  mt-0"
                />

                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/gFfKgc4/prison-journalism-obama-becoming-review-111822.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/3 lg:w-1/4 mb:w-1/3 skew-y-20 my-5 rotate-30 mx-2  mt-0"
                />

                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/8jKkLGf/the-subtle-art-of-not-giving-a-fck-by-mark-manson-4.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/4 lg:w-1/4 mb:w-1/3  skew-y-12 my-0  rotate-100  mt-0"
                />
              </div>
            </div>
          </div>
          <div className="absolute   right-5  bottom-5    flex gap-2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full border-5">
          <div className="container flex flex-col justify-center p-1 mx-auto sm:py-12 lg:py-4 lg:flex-row lg:justify-between">
            <div className="w-full  mx-auto flex  flex-col md:flex-row  overflow-hidden">
              <div className="w-full p-8 sm:p-1 flex flex-col justify-center  text-white font-[sans-serif] ">
                <h2 className="mx-auto uppercase font-light">Cristmas offer</h2>
                <p className=" text-white mx-auto text-[25px] lg:text-[50px] mb:text-[40px] font-bold text-center ">
                  Cristmas Pop up
                  <br /> BooK Gifts Ideas
                </p>
                <h4 className="font-semibold text-[20px] mx-auto mb-[40px] mb:mb-[20px] lg:text-[30px] mb:text-[20px]">
                  Find The Perfect Gift
                </h4>
                <button className="bg-[white] text-[black] px-4 py-2 rounded-full  w-[150px] mx-auto font-semibold ">
                  <span className="flex w-[100px] mx-auto">
                    <Link href="/books">Shop Now</Link>
                    <IoIosArrowForward className="ml-1 mt-1 text-[brown]" />
                  </span>
                </button>
              </div>

              <div className="w-full  flex p-10 lg:p-20 mb:p-15 border-5 ml-0 lg:ml-32">
                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/NjS2QHT/61-R-Cpm-Hx-L-AC-UF894-1000-QL80.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/3 lg:w-1/4 mb:w-1/3 skew-y-12 my-0 rotate-15  mt-15"
                />

                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/NjS2QHT/61-R-Cpm-Hx-L-AC-UF894-1000-QL80.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/3 lg:w-1/4 mb:w-1/3 skew-y-20 my-5 rotate-30 mx-2  mt-15"
                />

                <Image
                  height={200}
                  width={200}
                  src="https://i.ibb.co.com/QHYWqFw/0-RAr-KNBFL91-Cw-Ge-WU.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl w-1/4 lg:w-1/4 mb:w-1/3  skew-y-12 my-0  rotate-100  mt-15"
                />
              </div>
            </div>
          </div>
          <div className="absolute   right-5  bottom-5    flex gap-2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
