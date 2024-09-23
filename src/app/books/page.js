import axios from "axios";
import BooksCard from "@/components/BooksCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

async function fetchBooks() {
  try {
    const apiResponse = await axios.get(
      "http://localhost:3000/popular-data.json"
    ); // Change this URL as needed
    const result = apiResponse.data;

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export default async function Books() {
  const listOfBooks = await fetchBooks();

  return (
    <>
      <Navbar />
      {/* Render the list of books */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {listOfBooks &&
          listOfBooks.map((book) => <BooksCard key={book.id} book={book} />)}
      </div>
      <Footer />
    </>
  );
}
