const express = require("express");
//const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const router = express.Router();
const Patient = require("../models/Patient");
//const requireAuth = require("../middlewares/requireAuth");
const Document = require("../models/Document");
//checked in postman
// http://localhost:4000/api/patient
router.get("/", (req, res, next) => {
  // Get all patients
  Patient.find()
    .populate("author")
    .then((patientDocuments) => {
      res.status(200).json(patientDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

//get all documents of one specific patient
router.get("/:id/documents", (req, res, next) => {
  Document.find({ patient: req.params.id })
    .populate("author")
    .then((patientDocuments) => {
      res.status(200).json(patientDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

//checked in postman
// http://localhost:4000/api/patient/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific patient
  Patient.findById(req.params.id)
    .populate("documents")
    .then((patientDocument) => {
      res.status(200).json(patientDocument);
    })
    .catch((error) => {
      next(error);
    });
});

//checked in postman
// http://localhost:4000/api/patient
router.post("/", (req, res, next) => {
  // Create a patient
  Patient.create(req.body)
    .then((patientDocument) => {
      res.status(201).json(patientDocument);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/me", (req, res, next) => {
  const userId = req.session.currentUser;

  // If no file is sent, req.file is undefined, leading to an error when trying to
  // acces req.file.path (undefined.path) => Cannot read property path of undefined.
  if (req.file) {
    req.body.profileImg = req.file.path; // Add profileImage key to req.body
  }

  Patient.findByIdAndUpdate(userId, req.body, { new: true })
    .then((patient) => {
      res.status(200).json(patient);
    })
    .catch(next);
});

module.exports = router;
