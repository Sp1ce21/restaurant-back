import mongoose from "mongoose";

const daySchema = mongoose.Schema({
  day: String,
  hours: [
    {
      isOrdered: { type: Boolean, default: false },
      hour: String,
    },
  ],
});

const dateSchema = mongoose.Schema({
  days: [daySchema],
});

export const dayModel = mongoose.model("Day", daySchema);
export default mongoose.model("Date", dateSchema);
