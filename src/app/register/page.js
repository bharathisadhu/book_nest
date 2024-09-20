"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle the submitted data here
  };

  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center p-6">
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden rounded-xl shadow-md md:h-[90%] md:w-[80%] lg:h-[70%] border">
          {/* Register design side */}
          <div className="relative h-full items-center justify-center bg-[#F65D4E] md:flex md:w-[100%] lg:w-[50%]">
            <div className="space-y-2 text-center">
              <h2 className="md:text-4xl font-medium text-white pt-4">Now</h2>
              <h2 className="animate-pulse text-3xl md:text-5xl lg:text-5xl font-semibold text-white">
                Find your Book Here
              </h2>
              <p className="animate-pulse text-xl md:text-3xl lg:text-4xl font-poppins font-semibold text-white pt-6">
                Easy and fast.
              </p>
              <Marquee>
                <Image
                  width={500}
                  height={500}
                  className="w-full lg:pt-20"
                  src="https://i.ibb.co.com/ySRSNtB/vector-bookshelf-made-wood-books-260nw-2223713083-removebg-preview.png"
                  alt=""
                />
              </Marquee>
            </div>
          </div>

          {/* Input side */}
          <div className="flex w-full flex-col justify-center shadow-2xl shadow-orange-50 lg:w-[60%] space-y-6 my-4">
            <p className="-mb-4 text-center text-xl font-bold">START FOR FREE</p>
            <h2 className="text-center text-3xl font-bold">Sign Up to BookNest</h2>
            <form
              onSubmit={handleSubmit(onSubmit)} // Corrected here
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <input
                {...register("name", { required: true })}
                className="w-[80%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50 lg:w-[60%]"
                type="text"
                placeholder="Your Name"
                name="name"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
              <input
                {...register("photo", { required: true })}
                className="w-[80%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50 lg:w-[60%]"
                type="text"
                placeholder="Photo URL"
                name="photo"
              />
              {errors.photo && (
                <span className="text-red-600">Please provide your photo URL</span>
              )}
              <input
                {...register("email", { required: true })}
                className="w-[80%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50 lg:w-[60%]"
                type="email"
                placeholder="Email"
                name="email"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
              <input
                {...register("password", { required: true })}
                className="w-[80%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50 lg:w-[60%]"
                type="password"
                placeholder="Password"
                name="password"
              />
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}
              <p className="text-[14px] font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-[#F65D4E] text-[16px] font-bold">
                  Login Now
                </Link>
              </p>
              <input
                className="w-[92%] rounded-lg bg-[#F65D4E] px-6 py-2 font-bold text-white md:w-[88%] lg:w-[65%]"
                type="submit"
                value="Sign Up"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
