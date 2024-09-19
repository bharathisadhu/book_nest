
import Brand from "@/components/Brand";


import Community from "@/components/Community";
import Analytics from "@/components/Analytics";
import Blogs from "@/components/Blogs";

import Footer from "@/components/Footer";
import Review from "@/components/Review";
import Navbar from "@/components/Navbar";
import PopularBooks from "@/components/PopularBooks";


export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Community></Community>
      <Review></Review>
      <Blogs />
      <Community></Community>
      <Analytics />
      <PopularBooks></PopularBooks>
      <Brand></Brand>
      <Footer />
    </>
  );
}
