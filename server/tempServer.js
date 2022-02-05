import express from "express";
import dotenv from "dotenv";
dotenv.config();


import patientInfo from "./tempSeeds/patientFormatedInfo.js";
import { patientImgStudies } from "./tempSeeds/patientFormatedInfo.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.get("/patients", (req, res) => {
  res.status(200).json(patientInfo);
});

app.get("/patient/:patient_id", (req, res) => {
  const patientId = req.params.patient_id;
  const patientDetails = patientImgStudies
    .map((item) => item)
    .find((patient) => patient.patient_id === patientId);

  res.status(200).json(patientDetails);
});

app.listen(PORT, () => {
  console.log("App listenig on port: " + PORT);
});
