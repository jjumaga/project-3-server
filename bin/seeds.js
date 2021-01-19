require("dotenv").config();
require("./../config/dbConnection");

const PatientModel = require("./../models/Patient");

const patients = [
  {
    firstName: "Marilyn",
    lastName: "Monroe",
    birthDate: 01 / 06 / 1926,
    gender: "Female",
    socialSecurityNumber: 1234567890,
  },
  {
    firstName: "Freddie",
    lastName: "Mercurie",
    birthDate: 05 / 09 / 1946,
    gender: "Male",
    socialSecurityNumber: 09876543210,
  },
  {
    firstName: "Bob",
    lastName: "Marley",
    birthDate: 06 / 02 / 1945,
    gender: "Male",
    socialSecurityNumber: 5678901234,
  },
];

PatientModel.deleteMany()
  .then(async () => {
    await PatientModel.insertMany(patients);
  })
  .catch((err) => {
    console.error(err);
  });
