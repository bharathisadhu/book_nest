import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

// GET: Retrieve total quantity for a specific bookId
export async function GET(req) {
  try {
    const db = await connectDB();
    await connectDB();

    const response = await fetch(
      "https://booknest-self.vercel.app/api/payments"
    );
    const data = await response.json();

    //   const data = [
    //   {
    //     "_id": "670ed8238e81d91c9096962b",
    //     "email": "monsur286512@gmail.com",
    //     "name": "Abul Monsur Mohammad Kachru",
    //     "books": [
    //       {
    //         "bookId": "66f2b86492d389553d55b00e",
    //         "bookName": "1984",
    //         "quantity": 5,
    //         "price": 9.99
    //       },
    //       {
    //         "bookId": "66f2b86492d389553d55b00f",
    //         "bookName": "The Glass Castle",
    //         "quantity": 1,
    //         "price": 10.99
    //       },
    //       {
    //         "bookId": "66f2b86492d389553d55b010",
    //         "bookName": "1984",
    //         "quantity": 110,
    //         "price": 9.99
    //       }
    //     ],
    //     "totalAmount": 12876.479,
    //     "transactionId": "pi_3QAHrqP0DlsQZQqr1Jq3AvQs",
    //     "status": "completed"
    //   },
    //   {
    //     "_id": "670f2021753edc8433963a6e",
    //     "email": "jrazad10@gmail.com",
    //     "name": "Mohammad Azad",
    //     "books": [
    //       {
    //         "bookId": "66f2b86492d389553d55b00e",
    //         "bookName": "1984",
    //         "quantity": 5,
    //         "price": 9.99
    //       },
    //       {
    //         "bookId": "66f2b86492d389553d55b00f",
    //         "bookName": "The Glass Castle",
    //         "quantity": 1,
    //         "price": 10.99
    //       },
    //       {
    //         "bookId": "66f2b86492d389553d55b010",
    //         "bookName": "1984",
    //         "quantity": 90,
    //         "price": 9.99
    //       }
    //     ],
    //     "totalAmount": 11705.89,
    //     "transactionId": "pi_3QAMf7P0DlsQZQqr1z9OVtxJ",
    //     "status": "pending"
    //   }
    // ];

    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Missing bookId parameter" },
        { status: 400 }
      );
    }

    // Query MongoDB to get all payments that include the specified bookId
    const payments = await db
      .collection("payments")
      .find({ "books.bookId": bookId }) // Query for the specific bookId in the books array
      .toArray();

    // Calculate total quantity for the specified bookId
    let totalQuantity = 0;
    payments.forEach((payment) => {
      payment.books.forEach((book) => {
        if (book.bookId === bookId) {
          totalQuantity += book.quantity; // Sum up the quantity of the matching bookId
        }
      });
    });

    // Return the total quantity as the response
    return NextResponse.json({ totalQuantity });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payments" },
      { status: 500 }
    );
  }
}
