import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB"; // Adjust import to your actual file

<<<<<<< HEAD
export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectDB();
=======



// GET: Retrieve all payments
export async function GET(req) {
  try {
    await connectDB();

   
    // const response = await fetch('https://booknest-self.vercel.app/api/payments');
    // const data = await response.json();

    //http://localhost:3000/api/payments-total-quantity?blogId=66f2b86492d389553d55b018
    

    const data = [
    {
      "_id": "670ed8238e81d91c9096962b",
      "email": "monsur286512@gmail.com",
      "name": "Abul Monsur Mohammad Kachru",
      "books": [
        {
          "bookId": "66f2b86492d389553d55b00e",
          "bookName": "1984",
          "quantity": 5,
          "price": 9.99
        },
        {
          "bookId": "66f2b86492d389553d55b00f",
          "bookName": "The Glass Castle",
          "quantity": 1,
          "price": 10.99
        },
        {
          "bookId": "66f2b86492d389553d55b010",
          "bookName": "1984",
          "quantity": 110,
          "price": 9.99
        }
      ],
      "totalAmount": 12876.479,
      "transactionId": "pi_3QAHrqP0DlsQZQqr1Jq3AvQs",
      "status": "completed"
    },
   
  ];

>>>>>>> 336a26d4ae290f00b894af70e3707b5c04b1bc20

    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get("bookId"); // Corrected the parameter name to `bookId`

    if (!bookId) {
      return NextResponse.json(
        { error: "bookId not provided" },
        { status: 400 }
      );
    }

    // Find all documents where the `bookId` exists in the books array
    const payments = await db
      .collection("payments")
      .find({
        books: {
          $elemMatch: { bookId },
        },
      })
      .toArray(); // Convert the cursor to an array

    // Calculate the total quantity for the specified bookId
    let totalQuantity = 0;
    payments.forEach((order) => {
      order.books.forEach((book) => {
        if (book.bookId === bookId) {
          totalQuantity += book.cardCount;
        }
      });
    });

<<<<<<< HEAD
    // Return the total quantity as a JSON response
    return NextResponse.json(totalQuantity);
=======


    return NextResponse.json(bookId);



  


>>>>>>> 336a26d4ae290f00b894af70e3707b5c04b1bc20
  } catch (error) {
    console.error("Error fetching total quantity:", error);
    return NextResponse.json(
      { error: "Failed to calculate total quantity" },
      { status: 500 }
    );
  }
}
