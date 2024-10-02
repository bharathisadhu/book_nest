import mongoose, {Schema} from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  longDescription: { type: String, required: true },
});


const WishlistSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.books || mongoose.model("books", BookSchema);
const Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
const WishList = mongoose.models.wishList || mongoose.model("wishList", WishlistSchema);

// Export both models
export { Book, Blog, WishList };