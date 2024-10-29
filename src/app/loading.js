"use client";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-32 py-80">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#F65D4E] animate-spin"></div>
      </div>
    </div>
  );
}

// "use client";

// export default function Loader() {
//   return (
//     <div className=" p-6 rounded-md bg-white shadow-md mx-auto max-w-fit">
//                     <div className="animate-pulse">
//                         {/* Product Image Skeleton */}
//                         <div className="w-[300px] lg:h-52 md:h-52 h-48 rounded-lg bg-gray-300 mb-6"></div>
//                         {/* Product Title Skeleton */}
//                         <div className="w-[290px] h-4 rounded-lg bg-gray-300 mb-4"></div>
//                         {/* product heading skeleton */}
//                         <div className="w-[220px] h-4 rounded-lg bg-gray-300 mb-4"></div>
//                         {/* Product Description Skeleton */}
//                         <div className="w-[200px] h-4 rounded-lg bg-gray-300 mb-4"></div>
//                     </div>
//                 </div>
//   );
// }



