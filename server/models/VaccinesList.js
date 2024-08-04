const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VaccinesListSchema = new Schema(
  {
    name: { type: String, required: true },
    expirydate: { type: Date, required: true },
    barcode: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VaccinesList", VaccinesListSchema);
