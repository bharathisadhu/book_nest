
'use client'


import React, { useRef, } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";


export default function () {
    return(
        <>
        <div className="relative  md:mb-72 mb-96 my-30 ">
        <img
          className="md:h-full h-60 w-full"
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-bg2.jpg"
          alt=""
        />

        <div className="lg:w-1/3 w-2/3 rounded-lg absolute lg:-mt-60 -mt-44 ml-20 lg:ml-20 bg-gray-50 border-2 p-2">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <h1 className="text-3xl font-semibold mt-10 text-center text-gray-600">
                What people saying!
              </h1>

              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>

              <p className="font-medium my-10 px-10">
                "BookNest is my go-to bookstore for all genres. The variety is
                fantastic, and the staff are incredibly helpful in recommending
                new reads."
              </p>

              <h1 className="text-2xl font-medium text-center mb-20">
                Alice Johnson
              </h1>
            </SwiperSlide>

            <SwiperSlide>
              <h1 className="text-3xl font-semibold mt-10 text-center text-gray-600">
                What people saying!
              </h1>

              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>

              <p className="font-medium my-10 px-10">
                "The collection at BookNest is impressive, but I especially
                appreciate the discounts and promotional offers they frequently
                provide."
              </p>

              <h1 className="text-2xl font-medium text-center mb-20">
                Sophia Martinez
              </h1>
            </SwiperSlide>

            <SwiperSlide>
              <h1 className="text-3xl font-semibold mt-10 text-center text-gray-600">
                What people saying!
              </h1>

              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>

              <p className="font-medium my-10 px-10">
                "I love the user-friendly website of BookNest. It makes finding
                books easy, and their delivery service is always on time. Highly
                recommended!."
              </p>

              <h1 className="text-2xl font-medium text-center lg:mb-20">
                Michael Roberts
              </h1>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>


        </>
    )
}