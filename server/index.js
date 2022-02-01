// /* eslint-disable no-console */
import express from "express";
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
import {router} from './routes/patient-router.js';
/*importing router for exam: theimport issue starts here when it goes to exam,
it cannot find module exam-controllers.js*/
//import {examRouter} from './routes/exam-router.js';

import { Patient } from "./models/patient-model.js";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Databse config ************************************
// we use .env when we use online database url
// const dbUrl = process.env.DB_URL;
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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', router);
//adding examRouter: commented out for impoting issue
//app.use('/api', examRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
