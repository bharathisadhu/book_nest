
"use client";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("popular-data.json")
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, []);

  return (
    <div className="container mx-auto my-6 md:my-14 lg:my-28 relative">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
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
            <div className="relative flex flex-col items-center transition-transform cursor-pointer  group mt-10">
              <div className="h-24 w-24 lg:h-40 lg:w-40 rounded-full bg-slate-200 absolute z-10
        group-hover:bg-red-600 top-3/4 transform -translate-y-1/2"></div>
              <Image
                src={cat.image}
                className="lg:w-[110px] lg:h-[170px] w-14 h-18 relative z-20 transform transition-transform duration-300 lg:group-hover:-translate-y-10 group-hover:-translate-y-4 rounded-sm"
                alt={cat.name}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
            </div>

            <p className="text-center text-lg font-medium text-gray-700 mt-14">
              {cat.category}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
