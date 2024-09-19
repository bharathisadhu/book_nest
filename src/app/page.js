
import Community from "@/components/Community";
import Analytics from "@/components/Analytics";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Review from "@/components/Review";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Banner></Banner>
    <Community></Community>
      <Review></Review>
      <Blogs />
      <Analytics />
      <Footer />
    </>
  );
}
