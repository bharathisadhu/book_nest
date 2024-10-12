// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
import DashboardLayout from "@/components/DashboardLayout";
import BooksList from "@/components/ProductList";

const books = () => {
  return (
    <main>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-center mb-2">Books List </h1>
        {/* Add more specific content here */}
        <BooksList />
      </DashboardLayout>
    </main>
  );
};

export default books;
