import DashboardLayout from "@/components/DashboardLayout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";

import SaleCount from "@/components/mainDashBord/SaleCount";
import BlogCount from "@/components/mainDashBord/BlogCount";
import Head from "next/head";
const Users = () => {
  return (
    <>
      <Head>
        <title>BookNest | Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="flex flex-col lg:flex-row">
          <UserCount />
          <BookCount />
          <SaleCount />
          <BlogCount />
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>
    </>
  );
};

export default Users;
