require("dotenv").config();
require("./../config/dbConnection");

const PatientModel = require("./../models/Patient");

const patients = [
  {
    firstName: "Nadine",
    lastName: "Gilson",
    birthDate: 19 - 12 - 1933,
    gender: "Female",
    socialSecurityNumber: 1234567890,
  },
  {
    firstName: "Thibault",
    lastName: "Baudet",
    birthDate: 05 - 09 - 1948,
    gender: "Male",
    socialSecurityNumber: 09876543210,
  },
  {
    firstName: "Pierre",
    lastName: "Manasse",
    birthDate: 06 - 02 - 1954,
    gender: "Male",
    socialSecurityNumber: 5678901234,
  },
  {
    firstName: "Chloe",
    lastName: "Gras",
    birthDate: 25 - 11 - 1971,
    gender: "Female",
    socialSecurityNumber: 8901234567,
  },
  {
    firstName: "Corinne",
    lastName: "Lacabanne",
    birthDate: 30 - 01 - 1986,
    gender: "Female",
    socialSecurityNumber: 3456789012,
  },
];

PatientModel.deleteMany()
  .then(async () => {
    await PatientModel.insertMany(patients);
  })
  .catch((err) => {
    console.error(err);
  });
