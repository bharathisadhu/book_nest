// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
import BooksList from "@/components/BookList";
import DashboardLayout from "@/components/DashboardLayout";

const books = () => {
  return (
    <main>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-center mb-2 text-[#F65D4E]">Books List </h1>
        {/* Add more specific content here */}
        <BooksList />
      </DashboardLayout>
    </main>
  );
};

export default books;
