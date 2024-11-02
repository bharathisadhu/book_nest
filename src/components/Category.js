"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/books`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure that the data is an array and handle the case if it's not
        if (Array.isArray(data)) {
          setCategory(data);
        } else {
          setCategory([]); // Fallback in case data is not an array
        }
        setLoading(false);
      })
      .catch(() => {
        setCategory([]); // Set to an empty array on error
        setLoading(false);
      });
  }, [baseUrl]);

  const handleCategoryClick = (category) => {
    router.push(`/books?category=${encodeURIComponent(category)}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto my-4 md:my-8 lg:mt-20 lg:mb-24 relative">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper flex items-center justify-center"
      >
        {category.length > 0 ? (
          category.map((cat) => (
            <SwiperSlide key={cat._id}>
              <div
                className="relative flex flex-col items-center transition-transform cursor-pointer group mt-10"
                onClick={() => handleCategoryClick(cat.category)}
              >
                <div
                  className="h-36 w-36 lg:h-48 lg:w-48 rounded-full bg-slate-200 absolute z-10
                  group-hover:bg-red-600 top-3/4 transform -translate-y-1/2"
                ></div>
                <Image
                  src={cat.image}
                  className="lg:w-[120px] lg:h-[180px] w-24 h-40 relative z-20 transform transition-transform duration-300 lg:group-hover:-translate-y-10 group-hover:-translate-y-4 rounded-sm "
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
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </Swiper>
    </div>
  );
};

export default Category;
