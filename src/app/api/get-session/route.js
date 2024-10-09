// pages/api/get-session.js
import Stripe from "stripe";
import connectDB from "@/lib/mongodb"; // Adjust the path based on your project structure

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { session_id } = req.query;

    try {
      // Connect to the database if needed
      await connectDB();

      // Retrieve the session
      const session = await stripe.checkout.sessions.retrieve(session_id);

      return res.status(200).json(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      return res.status(500).json({ error: "Failed to retrieve session." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
