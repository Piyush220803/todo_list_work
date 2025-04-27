import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Todo", todoSchema);
