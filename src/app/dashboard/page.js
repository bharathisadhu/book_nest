// src/app/dashboard/users/page.js
import DashboardLayout from "@/components/DashboardLayout";
// import RootLayout from "@/app/layout";

const Users = () => {
  return (
    // <RootLayout showNavbar={false} showFooter={false}>
    <DashboardLayout>
      <h1 className="text-2xl font-bold">This is the main dashboard</h1>
      <p>This is the dashboard page content.</p>
      {/* Add more specific content here */}
    </DashboardLayout>
    // </RootLayout>
  );
};

export default Users;
