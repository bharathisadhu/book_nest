"use client";
// Import Swiper React components
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Brand() {
  return (
    <div className="container mx-auto my-6 md:my-14 lg:my-28">
      <Swiper
        slidesPerView={3} // Default for large screens (desktop)
        spaceBetween={30}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          // When window width is <= 576px (mobile), 3 slides per view
          576: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // When window width is > 768px and <= 1024px (tablet), 4 slides per view
          768: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          // When window width is > 1280px (desktop), 6 slides per view
          1280: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper flex items-center justify-center"
      >
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_1.svg"
            alt="Brand 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_2.svg"
            alt="Brand 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_3.svg"
            alt="Brand 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_4.svg"
            alt="Brand 4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_5.svg"
            alt="Brand 5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="md:h-20 lg:h-32"
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/brand_6.svg"
            alt="Brand 6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="h-16 md:h-20 lg:h-36"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kWGkqPFdXNC5JisMO8VUSusMafaFfKFnQA&s"
            alt="Brand 7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="h-20 lg:h-40"
            src="https://cdn.freebiesupply.com/logos/large/2x/the-black-book-logo-png-transparent.png"
            alt="Brand 8"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={500}
            height={500}
            className="h-20 lg:h-40"
            src="https://d3bzyjrsc4233l.cloudfront.net/news/Peach_sSVKDnq.png"
            alt="Brand 9"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
