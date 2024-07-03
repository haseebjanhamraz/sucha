const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VaccineRecordSchema = new Schema({
  animalId: { type: Schema.Types.ObjectId, ref: "Animal", required: true },
  date: { type: Date, required: true },
  vaccine: { type: String, required: true },
});

module.exports = mongoose.model("VaccineRecord", VaccineRecordSchema);
