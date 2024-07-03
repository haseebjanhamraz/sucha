const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AiSemenSchema = new Schema(
  {
    name: { type: String, required: true },
    expirydate: { type: Date, required: true },
    barcode: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
); // Enable timestamps

module.exports = mongoose.model("AiSemen", AiSemenSchema);
