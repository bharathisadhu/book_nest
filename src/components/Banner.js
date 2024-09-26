"use client";

import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const Banner = () => {
  return (
    <div className="hero min-h-screen mb-20 rounded-lg overflow-hidden">
      <div className="hero-overlay bg-[#00453E]"></div>

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="container flex flex-col justify-center p-1 mx-auto sm:py-4 lg:py-4 lg:flex-row lg:justify-between">
            <div className="w-full mx-auto flex flex-col md:flex-row overflow-hidden">
              {/* Left Side: Text */}
              <div className="w-full p-4 flex flex-col justify-center text-white font-[sans-serif]">
                <h2 className="mx-auto uppercase font-light">special offer</h2>
                <p className="text-white mx-auto font-bold text-[45px] text-center">
                  Reading is for
                  <br /> all Ages
                </p>
                <h4 className="font-semibold text-lg mx-auto mb-[30px]">
                  Buy your books in a store
                </h4>
                <button className="bg-[white] text-[black] px-4 py-2 rounded-full w-[150px] mx-auto font-semibold">
                  <span className="flex w-[100px] mx-auto">
                    Shop Now{" "}
                    <IoIosArrowForward className="ml-1 mt-1 text-[brown]" />
                  </span>
                </button>
              </div>

              {/* Right Side: Images */}
              <div className="w-full flex justify-evenly p-2">
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/fYKVzJB/36809135.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/gFfKgc4/prison-journalism-obama-becoming-review-111822.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/8jKkLGf/the-subtle-art-of-not-giving-a-fck-by-mark-manson-4.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <div className="container flex flex-col justify-center p-1 mx-auto sm:py-8 lg:py-6 lg:flex-row lg:justify-between">
            <div className="w-full mx-auto flex flex-col md:flex-row overflow-hidden">
              {/* Left Side: Text */}
              <div className="w-full p-4 flex flex-col justify-center text-white font-[sans-serif]">
                <h2 className="mx-auto uppercase font-light">
                  Christmas offer
                </h2>
                <p className="text-white mx-auto font-bold text-[40px] text-center">
                  Christmas Pop-up
                  <br /> Book Gift Ideas
                </p>
                <h4 className="sm:text-[10px] md:text-xl lg:text-2xl mx-auto mb-[30px]">
                  Find The Perfect Gift for Everyone
                </h4>
                <button className="bg-[white] text-[black] px-4 py-2 rounded-full w-[150px] mx-auto font-semibold">
                  <span className="flex w-[100px] mx-auto">
                    Shop Now{" "}
                    <IoIosArrowForward className="ml-1 mt-1 text-[brown]" />
                  </span>
                </button>
              </div>

              {/* Right Side: Images */}
              <div className="w-full flex justify-evenly p-8">
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/NjS2QHT/61-R-Cpm-Hx-L-AC-UF894-1000-QL80.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/pZdjnfB/44767458.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
                <Image
                  height={250}
                  width={150}
                  src="https://i.ibb.co.com/QHYWqFw/0-RAr-KNBFL91-Cw-Ge-WU.jpg"
                  alt="Banner Image"
                  className="max-w-sm rounded-lg shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
