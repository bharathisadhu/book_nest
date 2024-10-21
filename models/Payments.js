import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  postalCode: { type: String },
  books: { type: Array }, // or a more specific schema for books
  totalAmount: { type: Number },
  transactionId: { type: String },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

const Payments =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payments;
