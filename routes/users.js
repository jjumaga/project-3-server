const express = require("express");
const router = express.Router();
const UserPro = require("../models/UserPro");
const Document = require("../models/Document");
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

//patch userPro, add new patient
router.patch(
  "/me/patient",
  requireAuth,
  upload.single("document"),
  (req, res, next) => {
    UserPro.findByIdAndUpdate(
      req.session.currentUser,
      { $addToSet: { patients: req.body.id } },
      { new: true }
    )
      .populate("Patient")
      .then((userPatient) => {
        res.status(200).json(userPatient);
      })
      .catch(next);
  }
);

router.get("/me/patient", requireAuth, (req, res, next) => {
  UserPro.findById(req.session.currentUser)
    .populate("patients")
    .then((patients) => {
      res.status(200).json(patients);
    })
    .catch((err) => {
      next(err);
    });
});

//update userPro
router.patch(
  "/me",
  requireAuth,
  upload.single("profileImg"),
  (req, res, next) => {
    const userId = req.session.currentUser;

    // If no file is sent, req.file is undefined, leading to an error when trying to
    // acces req.file.path (undefined.path) => Cannot read property path of undefined.
    if (req.file) {
      req.body.profileImg = req.file.path; // Add profileImage key to req.body
    }

    UserPro.findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password") // Remove the password field from the found document.
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
);

//get current userPro
router.get("/me", requireAuth, (req, res, next) => {
  UserPro.findById(req.session.currentUser)
    .select("-password") // Remove the password field from the found document.
    .then((userDocument) => {
      return res.status(200).json(userDocument);
    })
    .catch(next);
});

//get all documents of logged in user
router.get("/me/documents", requireAuth, (req, res, next) => {
  const currentUserId = req.session.currentUser; // We retrieve the users id from the session.

  // And then get all the documents matching the id_user field that matches the logged in users id.
  Document.find({ author: currentUserId })
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch(next);
});

module.exports = router;
