import connectDB from "@/lib/connectDB";
import { Book } from "../../../../models/Book";

// Connect to the database
await connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query; // Get the search query from the URL
    try {
      const books = await Book.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Search by book name
          { author: { $regex: query, $options: "i" } }, // Search by author
          { category: { $regex: query, $options: "i" } }, // Search by category
        ],
      });

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
