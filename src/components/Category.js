"use client"
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';

// // import required modules
// import { FreeMode, Pagination } from 'swiper/modules';

// import React from 'react'

// function Category () {
//   return (
//     <>
//     <Swiper
//       slidesPerView={3}
//       spaceBetween={30}
//       freeMode={true}
//       pagination={{
//         clickable: true,
//       }}
//       modules={[FreeMode, Pagination]}
//       className="mySwiper"
//     >
//       <SwiperSlide>Slide 1</SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//       <SwiperSlide>Slide 5</SwiperSlide>
//       <SwiperSlide>Slide 6</SwiperSlide>
//       <SwiperSlide>Slide 7</SwiperSlide>
//       <SwiperSlide>Slide 8</SwiperSlide>
//       <SwiperSlide>Slide 9</SwiperSlide>
//     </Swiper>
//   </>
//   )
// }

// export default Category


import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("/popular-data.json")
      .then((response) => response.json())
      .then((data) => setCategory(data));
  }, []);

  return (
    <div className='my-10 p-5 container mx-auto relative'>
      <Swiper
        slidesPerView={5}
        spaceBetween={100}
        modules={[Pagination]}
        className="mySwiper"
      >
        {category.map((cat) => (
          <SwiperSlide key={cat.image}>
            <div className="relative flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
              <div className="h-44 w-44 lg:h-72 lg:w-72 rounded-full bg-slate-200 p-5 absolute z-10 group-hover:bg-red-600"></div>
              <Image
                src={cat.image}
                className="lg:w-full lg:h-72 w-52 h-44 bottom-20  relative z-20"
                alt={cat.name}
                width={200}
                height={200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;