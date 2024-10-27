"use client";
import DashboardLayout from "@/components/DashboardLayout";
import dynamic from "next/dynamic";
import Head from "next/head";

const BarCharts = dynamic(
  () => import("@/components/mainDashBoard/BarCharts"),
  {
    ssr: false,
  }
);
const ProfitChart = dynamic(
  () => import("@/components/mainDashBoard/ProfitChart"),
  { ssr: false }
);
const UserCount = dynamic(
  () => import("@/components/mainDashBoard/UserCount"),
  {
    ssr: false,
  }
);
const BookCount = dynamic(
  () => import("@/components/mainDashBoard/BooKCountPrice"),
  { ssr: false }
);
const SaleCount = dynamic(
  () => import("@/components/mainDashBoard/SaleCount"),
  {
    ssr: false,
  }
);
const BlogCount = dynamic(
  () => import("@/components/mainDashBoard/BlogCount"),
  {
    ssr: false,
  }
);

const Users = () => {
  return (
    <>
      <Head>
        <title>BookNest | Dashboard</title>
      </Head>
      <DashboardLayout>
      </DashboardLayout>
    </>
  );
};

export default Users;
