"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const bannerData = [
  {
    title: "Reading is for People of all Ages",
    subtitle: "Special Offer",
    description: "Buy your books in a store",
    image:
      "https://t4.ftcdn.net/jpg/07/64/23/43/360_F_764234350_QUDgtPXyvJsCuJr2bZpSNfCKtYYtlrVj.jpg",
    buttonText: "Shop Now",
    buttonLink: "/books",
    bannerInnerImage:
      "https://i.ibb.co.com/d7BLpVF/360-F-764234143-OPKe-Ck-Cqubby-AFx-Hxd82r-DKjl-HY9g3sy-removebg-preview.png",
  },
  {
    title: "Christmas Pop-up Book Gifts",
    subtitle: "Holiday Special",
    description: "Find the perfect gift",
    image:
      "https://t4.ftcdn.net/jpg/03/32/05/99/360_F_332059997_pTIqpe37YPEADwKdVL0ZoAy1K1Qdm02R.jpg",
    buttonText: "Explore Gifts",
    buttonLink: "/books",
  },
];

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const prevSlider = () =>
    setCurrentSlider((current) =>
      current === 0 ? bannerData.length - 1 : current - 1
    );
  const nextSlider = useCallback(
    () =>
      setCurrentSlider((current) =>
        current === bannerData.length - 1 ? 0 : current + 1
      ),
    []
  );

  useEffect(() => {
    const intervalId = setInterval(nextSlider, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="mt-[75px] lg:mt-[120px] h-full w-full md:h-[470px] lg:h-[740px] relative overflow-hidden rounded rounded-b-lg">
      {/* Arrow Left */}
      <button
        onClick={prevSlider}
        className="absolute top-1/2 left-0 lg:left-3 z-30 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        aria-label="Previous Slide"
      >
        <svg
          className="icon h-4 w-4 fill-[#F65D4E] md:h-6 md:w-6"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>
      {/* Arrow Right */}
      <button
        onClick={nextSlider}
        className="absolute top-1/2 z-30 right-0 lg:right-3 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        aria-label="Next Slide"
      >
        <svg
          className="icon h-4 w-4 fill-[#F65D4E] md:h-6 md:w-6 rotate-180"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
        </svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center items-center rounded-full z-30 absolute bottom-4 w-full gap-1">
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-500 bg-[#F65D4E] ${
              currentSlider === idx ? "w-8" : "w-2"
            } h-2`}
          ></button>
        ))}
      </div>
      {/* Carousel container */}
      <div
        className="ease-linear duration-500 flex transform-gpu"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {bannerData.map((slide, idx) => (
          <div key={idx} className="min-w-full h-full relative">
            <Image
              width={1000}
              height={1000}
              src={slide.image}
              alt={`Banner ${idx + 1}`}
              className="brightness-90 w-full h-[270px] md:h-[470px] lg:h-[750px] object-cover"
              priority={true} // This ensures the image is preloaded for performance
            />
            <div className="absolute container mx-auto inset-0 flex items-center px-8 md:px-16 lg:px-0">
              <div className="flex flex-col text-white w-[55%] lg:w-1/2 md:space-y-1 lg:space-y-3">
                <h2 className="text-sm md:text-2xl lg:text-4xl font-semibold font-poppins uppercase md:mb-2">
                  {slide.subtitle}
                </h2>
                <h1 className="text-lg md:text-4xl font-poppins lg:text-7xl font-bold mb-4 md:leading-10">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-xl lg:text-3xl font-semibold font-poppins mb-6 lg:block hidden">
                  {slide.description}
                </p>
                <Link href={slide.buttonLink} passHref>
                  <button className="btn rounded-3xl md:text-base text-sm bg-[#F65D4E] px-4 md:px-8 text-white hover:bg-orange-500 font-poppins font-semibold hover:text-white transition-colors inline-flex items-center md:mt-2 md::mt-4">
                    {slide.buttonText}
                    <IoIosArrowForward className="md:ml-2 md:block hidden" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
