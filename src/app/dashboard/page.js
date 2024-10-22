<<<<<<< HEAD
"use client"
import { useEffect, useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import BarCharts from "@/components/mainDashBord/BarCharts";
import ProfitChart from "@/components/mainDashBord/ProfitChart";
import Head from "next/head";
import UserCount from '@/components/mainDashBord/UserCount';
import BookCount from '@/components/mainDashBord/BooKCountPrice';
import SaleCount from '@/components/mainDashBord/SaleCount';
import BlogCount from '@/components/mainDashBord/BlogCount';
import UsedDevice from '@/components/mainDashBord/UsedDevice';


=======
"use client";
import DashboardLayout from "@/components/DashboardLayout";
import dynamic from "next/dynamic";
import Head from "next/head";

const BarCharts = dynamic(() => import("@/components/mainDashBord/BarCharts"), {
  ssr: false,
});
const ProfitChart = dynamic(
  () => import("@/components/mainDashBord/ProfitChart"),
  { ssr: false }
);
const UserCount = dynamic(() => import("@/components/mainDashBord/UserCount"), {
  ssr: false,
});
const BookCount = dynamic(
  () => import("@/components/mainDashBord/BooKCountPrice"),
  { ssr: false }
);
const SaleCount = dynamic(() => import("@/components/mainDashBord/SaleCount"), {
  ssr: false,
});
const BlogCount = dynamic(() => import("@/components/mainDashBord/BlogCount"), {
  ssr: false,
});
>>>>>>> 98d4b26058847d6e8ec79df241ffb3568343847f

const Users = () => {
  return (
    <>
      <Head>
        <title>BookNest | Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <UserCount className=" col-span-1" />
          <BookCount className=" col-span-1" />
          <SaleCount className=" col-span-1" />
          <BlogCount className=" col-span-1" />
        </div>
<<<<<<< HEAD
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <BarCharts />
          <ProfitChart />
          <UsedDevice />
          <BarCharts />
=======
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 text-black">
          <BarCharts totalPrice={100000} /> {/* Pass totalPrice as needed */}
          <ProfitChart />
>>>>>>> 98d4b26058847d6e8ec79df241ffb3568343847f
        </div>
      </DashboardLayout>
    </>
  );
};
<<<<<<< HEAD

export default Users;












//............................Main Code...............................

// import DashboardLayout from "@/components/DashboardLayout";
// import UserCount from "@/components/mainDashBord/UserCount";
// import BookCount from "@/components/mainDashBord/BooKCountPrice";

// import SaleCount from "@/components/mainDashBord/SaleCount";
// import BlogCount from "@/components/mainDashBord/BlogCount";
// import Head from "next/head";
// const Users = () => {
//   return (
//     <>
//       <Head>
//         <title>BookNest | Dashboard</title>
//       </Head>
//       <DashboardLayout>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <UserCount className=" col-span-1" />
//           <BookCount className=" col-span-1" />
//           <SaleCount className=" col-span-1" />
//           <BlogCount className=" col-span-1" />
//         </div>
//         {/* Add more specific content here */}
        
//       </DashboardLayout>
//     </>
//   );
// };
=======
>>>>>>> 98d4b26058847d6e8ec79df241ffb3568343847f

// export default Users;
