import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  postalCode: { type: String },
  books: [
    {
      bookId: { type: String },
      bookName: { type: String },
      price: { type: Number },
      cardCount: { type: Number },
      // quantity: { type: Number }
    },
  ],
  totalAmount: { type: Number },
  transactionId: { type: String },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export { Payment };
