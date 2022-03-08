// /* eslint-disable no-console */
import express from "express";
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
import {router} from './routes/router.js';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Databse config ************************************
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/patientdb";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log("DB connection error");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
//   **********************
import { Patient } from './models/patient-model.js';

const data = [
  {
      "patient_id": "COVID-19-AR-16434409",
      "age": 51,
      "sex": "M",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 722,
      "latest_bmi": 37.7,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16434381",
      "age": 44,
      "sex": "F",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 721,
      "latest_bmi": 64.6,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406513",
      "age": 44,
      "sex": "M",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 722,
      "latest_bmi": 33.3,
      "icu_admit": "Y",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16439216",
      "age": 61,
      "sex": "F",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 722,
      "latest_bmi": 36,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406491",
      "age": 49,
      "sex": "F",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 721,
      "latest_bmi": 43.85,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406496",
      "age": 75,
      "sex": "F",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 721,
      "latest_bmi": 23.57,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16424082",
      "age": 48,
      "sex": "M",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 721,
      "latest_bmi": 29.8,
      "icu_admit": "Y",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406504",
      "age": 39,
      "sex": "M",
      "race": "WHITE",
      "zip": 722,
      "latest_bmi": 33.5,
      "icu_admit": "Y",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16434350",
      "age": 55,
      "sex": "F",
      "race": "BLACK OR AFRICAN AMERICAN",
      "zip": 720,
      "latest_bmi": 27.46,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406502",
      "age": 88,
      "sex": "F",
      "race": "WHITE",
      "zip": 721,
      "latest_bmi": 34.9,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16406494",
      "age": 67,
      "sex": "F",
      "race": "OTHER",
      "zip": 722,
      "latest_bmi": 28.3,
      "icu_admit": "N",
      "mortality": "N"
  },
  {
      "patient_id": "COVID-19-AR-16424105",
      "age": 70,
      "sex": "F",
      "race": "WHITE",
      "zip": 722,
      "latest_bmi": 18.7,
      "icu_admit": "N",
      "mortality": "N"
  },
]
app.get('/', (req, res) => {
  Patient.insertMany(data)
    res.send('Hello World!');
});

app.use('/api', router);
//adding examRouter: commented out for impoting issue
//app.use('/api', examRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
