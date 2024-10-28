import mongoose, { Schema } from "mongoose";

// const usersSchema = new Schema(
//   {
//     name: String,
//     email: String,
//     password: String,
//     image: String,
//     photo: String,
//     plan: String,
//     role: String,
//     occupation: String,
//     location: String,
//     bio: String,
//   },
//   {
//     timestamps: true,
//   }
// );

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  photo: String,
  plan: String,
  role: String,
  occupation: String,
  location: String, // Ensure "location" is present
  bio: String,       // Ensure "bio" is present
}, { timestamps: true });


const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;
