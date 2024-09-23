
// import BooksCard from "@/components/BooksCard";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import axios from "axios";


// export default async function Books() {
//   const response = await axios.get(`http://localhost:3000/popular-data.json`)
//   const listOfBooks = await response.data
//   return (
//     <>
//       <Navbar />
//       {/* Render the list of books */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6">
//         {listOfBooks &&
//           listOfBooks.map((book) => <BooksCard key={book.id} book={book} />)}
//       </div>
//       <Footer />
//     </>
//   );
// }


import BooksCard from "@/components/BooksCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default async function Books() {
  let listOfBooks = [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${baseUrl}/popular-data.json`);
    listOfBooks = response.data;
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
