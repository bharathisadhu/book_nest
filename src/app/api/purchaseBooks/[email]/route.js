import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { email } = params;
    const db = await connectDB();
    const paymentsCollection = db.collection("payments");
    const booksCollection = db.collection("books");

    // Find all payments made by the user with the given email
    const payments = await paymentsCollection.find({ email }).toArray();

    // Extract the unique book IDs from the payments
    const bookIds = Array.from(
      new Set(
        payments.flatMap((payment) => payment.books.map((book) => book.bookId))
      )
    );

    // Fetch the book details for the unique book IDs
    const books = await booksCollection
      .find({
        _id: { $in: bookIds.map((id) => new ObjectId(id)) },
      })
      .toArray();

    // Map the book details to the payment data
    const purchasedBooks = payments.flatMap((payment) => {
      return payment.books.map((book) => {
        const bookDetails = books.find((b) => b._id.toString() === book.bookId);
        return { ...book, ...bookDetails };
      });
    });

    return new Response(JSON.stringify(purchasedBooks), { status: 200 });
  } catch (error) {
    console.error("Error fetching purchased books:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch purchased books" }),
      { status: 500 }
    );
  }
}
