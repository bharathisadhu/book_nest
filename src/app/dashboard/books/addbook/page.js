// src/app/dashboard/books/add/page.js
import AddBookPage from "@/components/Addbook";
import DashboardLayout from "@/components/DashboardLayout";

const AddBook = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-center mb-2 text-[#F65D4E]">
        Add a Book
      </h1>
      {/* Add your form for adding a book here */}
      <AddBookPage></AddBookPage>
    </DashboardLayout>
  );
};

export default AddBook;
