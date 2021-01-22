const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  docType: String,
  date: Date,
  uploadedBy: String,
  document: String,
  notes: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPro",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

const Document = mongoose.model("Document", documentSchema, "documents");

module.exports = Document;
