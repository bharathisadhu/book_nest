"use client";

import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import Azad from "../../../public/Azad.jpg";
import Badhon from "../../../public/Badhon.jpg";
import Devesh from "../../../public/devesh.jpeg";
import Didar from "../../../public/didar.png";
import Fahim from "../../../public/fahim.jpeg";
import Monsur from "../../../public/Monsur.jpeg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>BookNest | About Us</title>
      </Head>
      <Navbar />
      <div className="my-10 py-20 px-20 bg-gray-200 flex justify-between items-center">
        <h1 className="lg:text-6xl md:text-4xl text-xl font-bold">About Us</h1>
        <div className="flex justify-center items-center gap-2">
          <Link legacyBehavior href="/">
            <a>Home</a>
          </Link>
          <p>
            <GoArrowRight />
          </p>
          <p className="text-orange-500">About Us</p>
        </div>
      </div>

      <div className="lg:my-20 md:my-10 my-5 p-2">
        <div className="flex justify-center items-center">
          <Image
            className=""
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_01_1.png"
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div className="flex justify-center items-center my-5 md:text-3xl font-medium flex-col">
          <h1>We are the premier book retailing chain in the</h1>
          <h1>Southeastern United States with more than 260 Book</h1>
          <h1>stores in 32 states.</h1>
        </div>
      </div>

      <div className="flex justify-center -mb-36">
        <Image
          className="w-11/12 rounded-xl"
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_04.jpg"
          alt=""
          width={1920}
          height={1080}
        />
      </div>

      <div className="bg-[#FAF5F3] py-5 mb-10">
        <h1 className="lg:text-6xl md:4xl font-bold text-center mb-5 mt-48">
          Our Story
        </h1>

        <div className="grid md:grid-flow-col w-4/5 gap-20 mx-auto">
          <div>
            <h1 className="font-bold">RETAIL STORES</h1>

            <p className="text-justify my-10">
              Since our founding, we have focused on making a wide variety of
              books accessible to everyone. Whether it's bestsellers, classics,
              or textbooks, we aim to serve every reader's need through our
              extensive network of stores.
            </p>

            <h1 className="font-bold">WHOLESALE DISTRIBUTION</h1>

            <p className="text-justify my-10">
              Alongside our retail presence, we manage wholesale distribution
              for independent bookstores and educational institutions, ensuring
              that knowledge and culture are shared widely across the region.
            </p>

            <Image
              className="rounded-xl mb-5"
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_03.png"
              alt=""
              width={1920}
              height={1080}
            />

            <h1 className="text-2xl font-bold my-5">
              “Books are more than objects, they are gateways to new worlds.”
            </h1>

            <p className="text-xl font-semibold text-center my-5">
              - Poul Samuel
            </p>
          </div>

          <div>
            <h1 className="font-bold">E-COMMERCE AND INTERNET SERVICES</h1>

            <p className="text-justify my-10">
              Our online store provides an equally robust selection, allowing
              customers to browse thousands of titles, order online, and have
              books delivered to their doorsteps. We strive to create a seamless
              shopping experience for all our readers.
            </p>

            <p className="text-justify my-10">
              As the digital age evolves, so does our approach to offering
              e-books, audiobooks, and online reading communities. We connect
              readers through various platforms, making the joy of reading more
              accessible than ever.
            </p>

            <Image
              className="rounded-xl"
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_02.png"
              alt=""
              width={1920}
              height={1080}
            />

            <p className="text-justify my-10">
              We're constantly innovating to meet the needs of our customers,
              providing a blend of tradition and modern convenience in our
              services.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="my-20 bg-gray-100 py-16">
        <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold text-center mb-10">
          Meet Our Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-4/5 mx-auto">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Azad}
              alt="Team Member 1"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">Mohammad Azad</h2>
            <p className="text-gray-500">CEO</p>
            <p className="mt-3">
              Azad is an expert in business development and brings over 15 years
              of experience to the team. His vision has been the driving force
              behind our success.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Badhon}
              alt="Team Member 2"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">Badhon Sarker</h2>
            <p className="text-gray-500">Marketing Manager</p>
            <p className="mt-3">
              Badhon leads our marketing efforts, crafting innovative campaigns
              that expand our reach and engage our loyal customer base.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Devesh}
              alt="Team Member 3"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">Devesh Biswas</h2>
            <p className="text-gray-500">Product Manager</p>
            <p className="mt-3">
              Devesh manages the product development, ensuring that each product
              is of the highest quality and meets customer needs.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Didar}
              alt="Team Member 4"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">MD Didarul Islam</h2>
            <p className="text-gray-500">Chief Financial Officer</p>
            <p className="mt-3">
              Didar oversees the financial health of our company, managing our
              resources and ensuring long-term sustainability.
            </p>
          </div>

          {/* Team Member 5 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Fahim}
              alt="Team Member 5"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">MD Fahim Hossain</h2>
            <p className="text-gray-500">Lead Developer</p>
            <p className="mt-3">
              Fahim heads our development team, delivering seamless and scalable
              technology solutions that power our digital services.
            </p>
          </div>

          {/* Team Member 6 */}
          <div className="flex flex-col items-center text-center">
            <Image
              className="rounded-full"
              src={Monsur}
              alt="Team Member 6"
              width={200}
              height={200}
            />
            <h2 className="mt-5 text-xl font-semibold">
              Abul Monsur Mohammad Kachru
            </h2>
            <p className="text-gray-500">UX/UI Designer</p>
            <p className="mt-3">
              Monsur creates intuitive and beautiful designs that provide a
              user-friendly experience for all our customers across digital
              platforms.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
