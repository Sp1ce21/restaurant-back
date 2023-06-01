import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  label: String,
  isDone: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  todos: [todoSchema],
});

export const TodoModel = mongoose.model("Todo", todoSchema);
export default mongoose.model("User", userSchema);
