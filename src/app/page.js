import Category from "@/components/Category";
import Discount from "@/components/Discount";
import Brand from "@/components/Brand";
import Community from "@/components/Community";
import Analytics from "@/components/Analytics";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Review from "@/components/Review";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import PopularBooks from "@/components/PopularBooks";
import Head from "next/head";

const metadata = {
  title: "BookNest | Home",
  description: "Read for Peace",
  favicon: "BookNest.png",
};

export default function Home() {
  return (
    <main>
      <Head>
        <title>BookNest | Home</title>
      </Head>
      <Navbar />
      <Banner />
      <Category></Category>
      <Discount></Discount>
      <PopularBooks />
      <Brand />
      <Review />
      <Community />
      <Blogs />
      <Analytics />
      <Footer />
    </main>
  );
}
