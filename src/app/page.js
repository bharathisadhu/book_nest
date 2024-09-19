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
      <Analytics />
      <PopularBooks></PopularBooks>
      <Footer />
    </>
  );
}
