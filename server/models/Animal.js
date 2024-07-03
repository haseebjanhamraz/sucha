const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  tag: { type: String, required: true },
  breed: { type: String, required: true },
  dob: { type: Date, required: true },
  dam: { type: String, required: true },
  sire: { type: String, required: true },
  sex: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Animal", AnimalSchema);
