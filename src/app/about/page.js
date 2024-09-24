"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import Link from 'next/link';

export default function AboutUs (){

    return (
        <>
       <Navbar></Navbar>
       <div className=" my-10 py-20 px-20 bg-gray-200 flex justify-between items-center">
        <h1 className=" lg:text-6xl md:text-4xl text-xl font-bold">About Us</h1>
        <div className="flex justify-center items-center gap-2">
            <Link legacyBehavior href='/'><a>
                Home
            </a></Link>
            <p><GoArrowRight /></p>
            <p className="text-orange-500">About Us</p>
        </div>
       </div>
       <div className="lg:my-20 md:my-10 my-5 p-2"><div className="flex justify-center items-center">
       <Image
          className=""
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_01_1.png"
          alt=""
          width={300}
          height={300}
        />
       
       </div>
       <div className="flex justify-center items-center my-5 md:text-3xl font-medium flex-col">
        <h1 className="">We are the premier book retailing chain in the  </h1>
        <h1>Southeastern United States with more than 260 Book</h1>
        <h1> stores in 32 states.</h1>
       </div></div>


       <div className="flex justify-center -mb-36">
        <Image
        className=" w-11/12 rounded-xl"
        src='https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_04.jpg'
        alt=""
        width={1920}
        height={1080}
        />
       
       </div>

       <div className="bg-[#FAF5F3] py-5 mb-10">
        <h1 className="lg:text-6xl md:4xl  font-bold text-center mb-5 mt-48">Our Story</h1>

        <div className="grid md:grid-flow-col w-4/5 gap-20 mx-auto">
            <div className="">

                <div>
                    <h1 className="font-bold">RETAIL STORES</h1>

                    <p className="text-justify my-10">Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat.</p>


                    <h1 className="font-bold">WHOLESALE DISTRIBUTION</h1>

                    <p className="text-justify my-10">Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.</p>


                    <div><Image
        className=" rounded-xl mb-5"
        src='https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_03.png'
        alt=""
        width={1920}
        height={1080}
        /></div>


<div>
                    <h1 className="text-2xl font-bold my-5">“Bookory are such joy ... to be cherished, handled with pleasure, read and reread and handed down to the next generation”</h1>

                    <p className="text-xl font-semibold text-center my-5"> - Poul Samuel</p>

                </div>

                </div>
            </div>
            <div className="">

                <div>
                    <h1 className="font-bold">E-COMMERCE AND INTERNET SERVICES</h1>

                    <p className="text-justify my-10">
                    Pellentesque sodales augue eget ultricies ultricies. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sagittis ultrices condimentum.

                    
                    </p>

                    <p className="text-justify my-10">
                    Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque vitae eros eget enim mollis placerat.
                    
                    </p>


                    

<div>
<div><Image
        className=" rounded-xl"
        src='https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_02.png'
        alt=""
        width={1920}
        height={1080}
        /></div>

<p className="text-justify my-10">
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.

If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.

</p>
</div>
            </div>
            </div>
        </div>
       </div>


       <div className="my-10 bg-[#a1d0b9] p-10 text-white md:flex justify-evenly items-center gap-10">

        <div>
        <h1 className="text-4xl font-bold mt-5">Join the community</h1>

        <p className=" my-5">Enter your email address to receive regular updates, as well as news on <br></br> upcoming events and specific offers.</p>


        <div className="w-full max-w-md mt-4">
            <div className="flex flex-row rounded-3xl my-2 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-white text-gray-600 text-sm sm:text-base px-4 py-3"
              />
              <button
                type="button"
                className="flex items-center justify-center bg-orange-500 px-5 text-sm sm:text-base font-semibold text-white"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="relative">

        <div>
            <Image
        className=" rounded-xl mb-5"
        src='https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h2_bg.png'
        alt=""
        width={550}
        height={550}
        />
        </div>

        <div className="absolute lg::-mt-64 -mt-52 pl-32">
        <Image
        className=" rounded-xl mb-5"
        src='https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h2_img.png'
        alt=""
        width={350}
        height={350}
        />

        </div>

        


        
        </div>

       

       </div>

      
        
        </>
    )
}