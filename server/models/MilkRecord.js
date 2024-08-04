const mongoose = require("mongoose");

const milkRecordSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening"],
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MilkRecord = mongoose.model("MilkRecord", milkRecordSchema);
module.exports = MilkRecord;
