const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MilkRecordSchema = new Schema({
  animalId: { type: Schema.Types.ObjectId, ref: "Animal", required: true },
  date: { type: Date, required: true },
  time: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
  quantity: { type: Number, required: true }, // quantity in liters
});

module.exports = mongoose.model("MilkRecord", MilkRecordSchema);
