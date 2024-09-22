"use client";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("/popular-data.json")
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, []);

  return (
    <div className="container mx-auto my-6 md:my-14 lg:my-28 relative">
      <Swiper
        slidesPerView={3} // Default for large screens (desktop)
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          576: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper flex items-center justify-center"
      >
        {category.map((cat) => (
          <SwiperSlide key={cat.image}>
            <div className="relative flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group mt-32">
              {/* Circle Positioned Center */}
              <div className="h-24 w-24 lg:h-48 lg:w-48 rounded-full bg-slate-200 p-5 absolute z-10 group-hover:bg-red-600 top-1/2 transform -translate-y-1/2"></div>
              <Image
                src={cat.image}
                className="lg:w-[150px] lg:h-[210px] w-20 h-20 relative z-20 transform -translate-y-1/2"
                alt={cat.name}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-center text-lg font-medium text-gray-700">
              {cat.category}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;





