// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
import DashboardLayout from "@/components/DashboardLayout";
import BlogTable from "@/components/mainDashBord/AllBloga";

const Blogs = () => {
  return (
    // <RootLayout showNavbar={false}  showFooter={false}>
    <DashboardLayout>
     
      <BlogTable />
    </DashboardLayout>
    // </RootLayout>
  );
};

export default Blogs;
