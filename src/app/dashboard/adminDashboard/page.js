import dynamic from "next/dynamic";
import DashboardLayout from "@/components/DashboardLayout";
import Head from "next/head";

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

const metadata = {
  title: "BookNest | Admin Dashboard",
  description: "Read for Peace",
  favicon: "BookNest.png",
};

const AdminDashboard = () => {
  return (
    <div className="lg:max-h-screen overflow-x-auto overflow-y-auto">
      <Head>
        <title>BookNest | Admin Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <UserCount className=" col-span-1" />
          <BookCount className=" col-span-1" />
          <SaleCount className=" col-span-1" />
          <BlogCount className=" col-span-1" />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <BarCharts />
          <ProfitChart />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminDashboard;
