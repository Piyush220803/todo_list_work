import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
  role: { type: Number, enum: [0, 1] }, // 0 = admin, 1 = client
});

export default mongoose.model("User", userSchema);
