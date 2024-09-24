

import BooksCard from "@/components/BooksCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default async function Books() {
  let listOfBooks = [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await axios.get(`https://booknest-server-one.vercel.app/api/books`);
    listOfBooks = response.data;
    console.log(listOfBooks);
    
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <>
      <Navbar />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6">
        {listOfBooks.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      </div>
      <Footer />
    </>
  );
}
