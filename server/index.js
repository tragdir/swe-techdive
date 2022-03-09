// /* eslint-disable no-console */
import express from "express";
import mongoose from 'mongoose'
import dotenv from "dotenv";
import path from 'path';
import { router } from './routes/router.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8000;
//adding examRouter: commented out for impoting issue
//app.use('/api', examRouter);
// console.log(path.join(__dirname, '../client/'))
app.use('/api', router);

//   If production, serve client build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname + '../client/build/index.html'));
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

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

//adding examRouter: commented out for impoting issue
//app.use('/api', examRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
