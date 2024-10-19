import DashboardLayout from "@/components/DashboardLayout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";
import Head from "next/head";
import SaleCount from "@/components/mainDashBord/SaleCount";
import BlogCount from "@/components/mainDashBord/BlogCount";
import BarCharts from "@/components/mainDashBord/BarCharts";
import ProfitChart from "@/components/mainDashBord/ProfitChart";
import UsedDevice from "@/components/mainDashBord/UsedDevice";

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
          <UsedDevice />
          <BarCharts />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminDashboard;
