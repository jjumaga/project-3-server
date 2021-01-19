const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProSchema = new Schema({
  fristName: String,
  lastName: String,
  jobTitle: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

const UserPro = mongoose.model("UserPro", userProSchema, "users");

module.exports = UserPro;

// push _ids into the field you will need populated later???
