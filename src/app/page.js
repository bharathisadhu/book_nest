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

export default function Home() {
  return (
    <>
      <Category></Category>
      <Discount></Discount>
      <Navbar />
      <Banner />
      <PopularBooks />
      <Brand />
      <Review />
      <Blogs />
      <Community />
      <Analytics />
      <Footer />
    </>
  );
}
