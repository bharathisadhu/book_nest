


import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";

export default async function BookDetails({ params }) {
  let listOfBooks = [];

  // Fetching data with error handling
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/popular-data.json`);
    listOfBooks = response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return <p className="text-3xl">Error fetching book details.</p>;
  }

  // Find the specific book by ID
  const bookDetails = listOfBooks.find(book => book.id === parseInt(params.details));

  if (!bookDetails) {
    return <p className="text-3xl">Book not found.</p>;
  }

  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <Image
            height={200}
            width={200}
            src={bookDetails.image}
            alt={bookDetails.name}
          />
        </figure>
        <div className="card-body">
          <p>Category: {bookDetails.category}</p>
          <h2 className="card-title">{bookDetails.name}</h2>
          <p>Author: {bookDetails.author}</p>
          <p className="flex items-center">
            Ratings: {bookDetails.ratings} <CiStar className="text-orange-700" />
          </p>
          <p>Price: ${bookDetails.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </>
  );
}
