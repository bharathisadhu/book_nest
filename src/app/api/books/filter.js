import connectDB from "@/utils/connectDB";
import { ObjectId } from "mongodb";

export default async function GET(req, res) {
  try { 
    const db = await connectDB();
    const {
      page = 1,
      limit = 12,
      sort = "",
      category,
      author,
      minPrice,
      maxPrice,
      search,
    } = req.query;

    const filter = {};

    // Category filter
    if (category) filter.category = { $in: category.split(",") };
    // Author filter
    if (author) filter.author = { $in: author.split(",") };
    // Price range filter
    if (minPrice && maxPrice)
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    // Search filter
    if (search) {
      filter.title = { $regex: new RegExp(search, "i") }; // Case-insensitive search
    }

    let sortOptions = {};
    if (sort === "price_asc") sortOptions.price = 1;
    if (sort === "price_desc") sortOptions.price = -1;
    if (sort === "rating_desc") sortOptions.ratings = -1;
    if (sort === "rating_asc") sortOptions.ratings = 1;

    const skip = (page - 1) * parseInt(limit);
    const booksCollection = db.collection("books");

    const books = await booksCollection
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const totalBooks = await booksCollection.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        books,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBooks / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch books" });
  }
}
