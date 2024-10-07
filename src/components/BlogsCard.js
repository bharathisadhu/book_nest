import Image from "next/image";
import Link from "next/link";


export default function BlogsCard({ blog }) {
  const { _id,image,title, author, date, category, shortDescription } = blog;
 

  return (
    <>
    <div className="rounded-lg  p-6 mb-6">
              <Image
                height={540}
                width={1125}
                src={image}
                alt={title}
                objectFit="cover"
                className="w-full h-auto object-cover border rounded-lg"
              />

              <h3 className="uppercase font-thin my-3">
                {date} By {author}
              </h3>
              <h2 className="text-2xl font-bold mb-4">
                {title}
              </h2>
              <p className="text-gray-600">
                {shortDescription}
              </p>
              <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
              <sapn className="flex justify-between">
                <sapn className="uppercase">
                  In <span className="text-rose-600">{category}</span>
                </sapn>
                <sapn className="font-semibold">
                <Link href={`/blogs/${_id}`}>
                Read More
            </Link>
            </sapn>
              </sapn>
            </div>
    
    </>
  );


}