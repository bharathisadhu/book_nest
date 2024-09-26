import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";

export default function BooksCard({ book }) {
    const { id, name, image, price, category, ratings } = book;
    const [cartData, setCartData] = useState(null);

    const addToBookmark = (book) => {
        setCartData(book);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book added to bookmarks!",
            showConfirmButton: false,
            timer: 1500,
        });
    };


    return (
        <>
            <Link
                href={`/books/${id}`}
                key={id}
                className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative"
            >
                <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                    <button onClick={() => addToBookmark()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16px"
                            className="fill-gray-800 inline-block"
                            viewBox="0 0 64 64"
                        >
                            <path
                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <Image
                        width={200}
                        height={200}
                        src={image}
                        alt={name}
                        className="h-full w-full object-contain"
                    />
                </div>

                <div className="p-6 bg-white">
                    <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                    <h4 className="text-lg text-gray-800 font-bold mt-2">${price}</h4>
                    <p className="text-gray-600 text-sm mt-2">{category}</p>

                    <div className="flex space-x-2 mt-4">
                        {Array.from({ length: 5 }, (_, index) => {
                            return index < Math.round(ratings) ? (
                                <CiStar key={index} className="w-4 fill-[#facc15]" />
                            ) : (
                                <CiStar key={index} className="w-4 fill-[#CED5D8]" />
                            );
                        })}
                    </div>
                </div>
            </Link>
        </>
    );
}























//......................................Main Code..............................



// import Image from "next/image";
// import Link from "next/link";
// import { CiStar } from "react-icons/ci";

// export default function BooksCard({ book }) {
//   const { id, name, image, price, category, ratings } = book;

//   return (
//     <>
//       <Link href={`/books/${id}`} className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
//         <div className="min-h-[256px]">
//           <Image
//             height={200}
//             width={200}
//             src={image}
//             alt={name}
//             className="w-full rounded-2xl"
//           />
//         </div>

//         <div className="p-6">
//           <p>Category: {category}</p>

//           <h3 className="text-2xl text-gray-800 font-extrabold">{name}</h3>
//           <h3 className="text-gray-800 font-semibold mt-4 flex items-center">
//             Ratings: {ratings} <CiStar className="text-orange-700" />
//           </h3>

//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl text-gray-800 font-bold flex-1">${price}</h3>
//             <div className="bg-pink-100 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 className="fill-pink-600"
//                 viewBox="0 0 64 64"
//               >
//                 <path
//                   d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
//                   data-original="#000000"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// }
