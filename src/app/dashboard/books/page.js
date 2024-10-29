// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
// import AddBook from "@/components/Addbook";
import BooksList from "@/components/BookList";
import DashboardLayout from "@/components/DashboardLayout";
const books = () => {
  return (
    <main>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-center mb-2 text-[#F65D4E]">
          Books List{" "}
        </h1>
        {/* Add more specific content here */}
        {/* <AddBook /> */}
        <BooksList />
      </DashboardLayout>
    </main>
  );
};

export default books;
