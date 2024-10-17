// import DashboardLayout from "@/components/DashboardLayout";
// import UserCount from "@/components/mainDashBord/UserCount";
// import BookCount from "@/components/mainDashBord/BooKCountPrice";
// import SaleCount from "@/components/mainDashBord/SaleCount";
// import BlogCount from "@/components/mainDashBord/BlogCount";
// import BarCharts from "@/components/mainDashBord/BarCharts";
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
//         <div>
//           <BarCharts />
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default Users;

"use client"
import { useEffect, useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import BarCharts from "@/components/mainDashBord/BarCharts";
import ProfitChart from "@/components/mainDashBord/ProfitChart";
import Head from "next/head";

const dataStatsList = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5626 13.0002C10.5626 11.654 11.6539 10.5627 13.0001 10.5627C14.3463 10.5627 15.4376 11.654 15.4376 13.0002C15.4376 14.3464 14.3463 15.4377 13.0001 15.4377C11.6539 15.4377 10.5626 14.3464 10.5626 13.0002Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.16675 13.0002C2.16675 14.7762 2.62713 15.3743 3.54788 16.5705C5.38638 18.959 8.4697 21.6668 13.0001 21.6668C17.5305 21.6668 20.6138 18.959 22.4523 16.5705C23.373 15.3743 23.8334 14.7762 23.8334 13.0002C23.8334 11.2242 23.373 10.6261 22.4523 9.42985C20.6138 7.04135 17.5305 4.3335 13.0001 4.3335C8.4697 4.3335 5.38638 7.04135 3.54788 9.42985C2.62713 10.6261 2.16675 11.2242 2.16675 13.0002ZM13.0001 8.93766C10.7564 8.93766 8.93758 10.7565 8.93758 13.0002C8.93758 15.2438 10.7564 17.0627 13.0001 17.0627C15.2437 17.0627 17.0626 15.2438 17.0626 13.0002C17.0626 10.7565 15.2437 8.93766 13.0001 8.93766Z"
          fill="white"
        />
      </svg>
    ),
    color: "#3FD97F",
    title: "Total Views",
    value: "3.456K",
    growthRate: 0.43,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
          fill="white"
        />
      </svg>
    ),
    color: "#FF9C55",
    title: "Total Profit",
    value: "$42.2K",
    growthRate: 4.35,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.0425 4.80065L16.8758 3.66364C14.9739 2.66555 14.0229 2.1665 13 2.1665C11.977 2.1665 11.026 2.66555 9.12411 3.66363L6.95744 4.80065C5.03588 5.80904 3.90635 6.40179 3.20629 7.1946L13 12.0914L22.7936 7.1946C22.0936 6.40179 20.964 5.80904 19.0425 4.80065Z"
          fill="white"
        />
        <path
          d="M23.5607 8.62788L13.8125 13.502V23.7292C14.5902 23.5355 15.4751 23.0711 16.8758 22.336L19.0425 21.199C21.3734 19.9758 22.5389 19.3642 23.1861 18.2651C23.8333 17.1661 23.8333 15.7984 23.8333 13.0632V12.9365C23.8333 10.8861 23.8333 9.60421 23.5607 8.62788Z"
          fill="white"
        />
        <path
          d="M12.1875 23.7292V13.502L2.43923 8.62788C2.16663 9.60421 2.16663 10.8861 2.16663 12.9365V13.0632C2.16663 15.7984 2.16663 17.1661 2.81385 18.2651C3.46107 19.3642 4.62662 19.9758 6.95753 21.199L9.12422 22.336C10.524 23.0711 11.4088 23.5355 12.1875 23.7292Z"
          fill="white"
        />
      </svg>
    ),
    color: "#8C9EDE",
    title: "Total Sales",
    value: "1,789",
    growthRate: -1.23,
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.3641 7.23258L11.8313 12.7863L14.8752 15.8302L20.407 10.2984C20.5858 10.1195 20.5858 9.74541 20.407 9.56656L18.5752 7.73483C18.3964 7.556 18.0223 7.556 17.8435 7.73483L14.9106 10.6677L11.8313 7.5884L7.66372 11.756L5.17808 9.27042C4.99923 9.09156 4.62514 9.09156 4.4463 9.27042L2.61456 11.1021C2.43571 11.2809 2.43571 11.654 2.61456 11.8329L6.52814 15.7465L9.48198 12.7927L7.90496 11.2157L11.6188 7.50188L14.9166 10.7997L19.3027 6.41354L21.2108 8.32166C21.3896 8.50052 21.7637 8.50052 21.9425 8.32166L24.4052 5.85894C24.584 5.68009 24.584 5.306 24.4052 5.12714L22.5735 3.29541C22.3947 3.11656 22.0206 3.11656 21.8418 3.29541L19.3266 5.81061L17.3641 7.23258Z"
          fill="white"
        />
      </svg>
    ),
    color: "#F95656",
    title: "Total Blogs",
    value: "102",
    growthRate: 1.50,
  },
];

const Users = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering until mounted

  return (
    <>
      <Head>
        <title>BookNest | Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {dataStatsList.map((item, index) => (
            <div
              key={index}
              className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
            >
              <div
                className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                    {item.value}
                  </h4>
                  <span className="text-body-sm font-medium">{item.title}</span>
                </div>

                <span
                  className={`flex items-center gap-1.5 text-body-sm font-medium ${item.growthRate > 0 ? "text-green" : "text-red"}`}
                >
                  {item.growthRate}%
                  {item.growthRate > 0 ? (
                    <svg
                      className="fill-current"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="fill-current"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <BarCharts />
          <ProfitChart />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Users;
















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
//         <div>
//           hello
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default Users;
