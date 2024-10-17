import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
const getBlogById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function BlogCard({ id }) {
  const { topic } = await getBlogById(id);
  const { image, title, author, date, category, content } = topic;

  return (
    <>
      <div className="rounded-l mb-6 mx-5">
        <div>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10 rounded-xl mb-10">
            <h2 className="lg:py-10 lg:ml-10 font-extrabold text-lg md:text-xl lg:text-3xl">
              {title}
            </h2>

            <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
              <Link href="/">home</Link>

              <GoArrowRight className="" />
              <span className="text-orange-600">{category}</span>
            </h3>
          </div>
        </div>
        <div className="container mx-auto">
          <Image
            height={1000}
            width={1125}
            src={image}
            alt={title}
            objectFit="cover"
            className="w-full h-96 lg:h-[600px] object-cover border rounded-xl"
          />

          <h3 className="uppercase font-thin my-3">
            {date} By {author} ||{" "}
            <span className="uppercase">
              In <span className="text-[#F65D4E]">{category}</span>
            </span>
          </h3>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 text-justify">{content}</p>
          <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
        </div>
      </div>
    </>
  );
}
