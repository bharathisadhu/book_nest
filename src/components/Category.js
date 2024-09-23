
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

















// "use client";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// // Import required modules
// import { Pagination } from "swiper/modules";
// import Image from "next/image";

// const Category = () => {
//   const [category, setCategory] = useState([]);

//   useEffect(() => {
//     fetch("/popular-data.json")
//       .then((response) => response.json())
//       .then((data) => setCategory(data));
//   }, []);

//   return (
//     <div className="my-10 p-5 container mx-auto relative">
//       <Swiper
//         slidesPerView="auto"
//         spaceBetween={20}
//         modules={[Pagination]}
//         className="mySwiper"
//       >
//         {category.map((cat) => (
//           <SwiperSlide
//             key={cat.image}
//             className="max-w-[80%] sm:max-w-[45%] md:max-w-[30%] lg:max-w-[18%] flex justify-center"
//           >
//             <div className="relative flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group">
//               <div className="h-28 w-28 md:h-44 md:w-44 lg:h-72 lg:w-72 rounded-full bg-slate-200 p-5 absolute z-10 group-hover:bg-red-600 transition-all"></div>
//               <Image
//                 src={cat.image}
//                 className="w-28 h-28 md:w-44 md:h-44 lg:w-72 lg:h-72 bottom-10 md:bottom-16 lg:bottom-20 relative z-20"
//                 alt={cat.name}
//                 width={200}
//                 height={200}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Category;

