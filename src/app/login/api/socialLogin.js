import connectDB from "@/lib/connectDB";
import User from "@/models/User"; // Assuming you have a User model set up

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, photo } = req.body;

    try {
      const db = await connectDB();
      const user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ message: "User already exists" });
      }

      const newUser = new User({
        name,
        email,
        photo,
        password: null, // No password for social login
      });

      await newUser.save();

      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
