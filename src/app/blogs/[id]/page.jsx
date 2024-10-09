import BlogCard from "@/components/BlogCard";

export default async function BlogPage({ params }) {
  const { id } = params;

  return (
    <>
      <BlogCard id={id} />
    </>
  );
}
