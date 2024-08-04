const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pregnancyRecordSchema = new Schema(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    semen: {
      type: Schema.Types.ObjectId,
      ref: "AiSemen",
      required: true,
    },
    pregnancyStartDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PregnancyRecord", pregnancyRecordSchema);
