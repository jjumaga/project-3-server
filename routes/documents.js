const express = require("express");
//const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const router = express.Router();
const Document = require("../models/Document");
const requireAuth = require("../middlewares/requireAuth");
const uploader = require("../config/cloudinary");

//Checked in Postman
// http://localhost:4000/api/documents
router.get("/", (req, res, next) => {
  // Get all the documents
  Document.find()
    .populate("author")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((error) => {
      next(error);
    });
});

//Checked in Postman
// http://localhost:4000/api/documents/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific document
  Document.findById(req.params.id)
    .then((document) => {
      res.status(200).json(document);
    })
    .catch((error) => {
      next(error);
    });
});

//Checked in Postman
// http://localhost:4000/api/documents/{some-id}
router.patch("/:id", uploader.single("document"), (req, res, next) => {
  // Update a specific document
  if (req.file) {
    req.body.document = req.file.path;
  }
  console.log(req.body);
  Document.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((document) => {
      res.status(200).json(document);
    })
    .catch((error) => {
      next(error);
    });
});

//CREATE A DOCUMENT
//Checked in Postmanx
// http://localhost:4000/api/documents
router.post("/", requireAuth, uploader.single("document"), (req, res, next) => {
  const updateValues = { ...req.body };
  if (req.file) {
    updateValues.document = req.file.path;
  }

  updateValues.author = req.session.currentUser;
  //console.log(updateValues);
  // updateValues.patient = updateValues.id; // Retrieve the authors id from the session.

  Document.create(updateValues)
    .then((document) => {
      document
        .populate("author")
        .execPopulate() // Populate on .create() does not work, but we can use populate() on the document once its created !
        .then((item) => {
          res.status(201).json(item); // send the populated document.
        })
        .catch(next);
    })
    .catch(next);
});

//Checked in Postman
// http://localhost:4000/api/documents/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes a document
  Document.findByIdAndRemove(req.params.id)
    .then((itemDocument) => {
      // res.sendStatus(204)
      console.log(itemDocument);
      res.status(204).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
