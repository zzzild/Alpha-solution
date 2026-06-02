import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: () => nanoid(10),
    unique: true,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: 50,
  },
  gender: {
    type: String,
    maxlength: 10,
  },
  phone: { type: String, default: "000000000000", maxlength: 13 },
  role: { type: String, required: true, maxlength: 20, default: "user" },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
