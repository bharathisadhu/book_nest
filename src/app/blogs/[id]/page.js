import BlogCard from "@/components/BlogCard";

import CommentsList from "@/components/CommentsList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function BlogPage({ params }) {
  const { id } = params;

  return (
    <>
    <Navbar />
      <BlogCard id={id} />

      <main className="container mx-auto p-6">
        <CommentsList id={id} />
      </main>
      <Footer />
    </>
  );
}
