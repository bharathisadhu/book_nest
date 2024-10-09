import BlogCard from "@/components/BlogCard";

import CommentsList from "@/components/CommentsList";

export default async function BlogPage({ params }) {
  const { id } = params;

  return (
    <>
      <BlogCard id={id} />

      <main className="container mx-auto p-6">
        <CommentsList id={id} />
      </main>
    </>
  );
}
