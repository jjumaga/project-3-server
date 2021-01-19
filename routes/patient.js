const express = require("express");
//const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const router = express.Router();
const Patient = require("../models/Patient");
//const requireAuth = require("../middlewares/requireAuth");

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

//checked in postman
// http://localhost:4000/api/patient/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific patient
  Patient.findById(req.params.id)
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

module.exports = router;
