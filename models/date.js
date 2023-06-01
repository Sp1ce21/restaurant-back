import mongoose from "mongoose";

const daySchema = mongoose.Schema({
  day: String,
  hours: [{ time: String, tablesOrdered: [String] }],
});

const dateSchema = mongoose.Schema({
  days: [daySchema],
});

export const dayModel = mongoose.model("Day", daySchema);
export default mongoose.model("Date", dateSchema);
