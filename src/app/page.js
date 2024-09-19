
import Community from "@/components/Community";
import Analytics from "@/components/Analytics";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Review from "@/components/Review";

export default function Home() {
  return (
    <>

    <Community></Community>
      <Review></Review>
      <Blogs />
      <Analytics />
      <Footer />
    </>
  );
}
