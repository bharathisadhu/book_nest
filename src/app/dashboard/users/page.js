// src/app/dashboard/insight/page.js
import RootLayout from "@/app/layout";
import DashboardLayout from "@/components/DashboardLayout";
import UsersList from "@/components/UsersList";

const Users = () => {
  return (
    <RootLayout showNavbar={false}  showFooter={false}>
    <DashboardLayout>
      <h1 className="text-2xl font-bold">This is the users </h1>
      {/* Add more specific content here */}
      <UsersList />
    </DashboardLayout>
    </RootLayout>
  );
};

export default Users;
