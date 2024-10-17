import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return Response.json({ message: "user Exists" }, { status: 500 });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const res = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
      role: "user"
    });
    return Response.json(
      { message: "new User created", data: res },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
};
