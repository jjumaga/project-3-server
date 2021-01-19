const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  gender: String,
  socialSecurityNumber: Number,
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
