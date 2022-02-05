/* eslint-disable no-undef, arrow-body-style */

import { Exam } from "../models/exam-model.js";
import {Patient} from "../models/patient-model.js"

export const getItems = async (req, res) => {
  await Patient.find({}, (err, items) => {
    if (err) {
      console.error(`Error getting patients data': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`Items not found`);
      return res.status(200).json({
        success: true,
        items: [],
      });
    }
    console.log(`Fetching successful!`);
    return res.status(200).json(items);
  }).catch(err => {
    console.error(`Error fetching the data': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

export const getItemById = async (req, res) => {
  await Patient.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getItemById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getItemById': Item not found`);
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getItemById': Item fetched!`);
    return res.status(200).json(items[0]);
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getItemById': ${err}`);
    console.error(err);
    return err;
  });
};

export const createItem = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createItem: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createItem: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item.',
    });
  }

  const item = new Patient(body); //create new record


  if (!item) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'item' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'item' is malformed",
    });
  }

  // console.log('----------------------- createItem: item -----------------------')
  // console.log(item);

  return item
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createItem': Item created!`);
      return res.status(201).json({
        success: true,
        id: item._id,
        message: 'Item created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createItem'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

export const updateItem = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`[Hack.Diversity React Template] - 400 in 'updateItem': You must provide an item to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an item to update.',
    });
  }

  const itemForUpdate = {
    age: body.age,
    sex: body.sex,
    race: body.race,
    zip: body.zip,
    latest_bmi: body.latest_bmi,
    latest_weight: body.latest_weight,
    latest_height: body.latest_height,
    test_name: body.test_name,
    icu_admit: body.icu_admit,
    mortality: body.mortality
  };

  // console.log('----------------------- updateItem: res -----------------------');
  // console.log(res);

  try {
    await Patient.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updateItem': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updateItem': Item updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Item updated!',
  });
};

export const deleteItem = async (req, res) => {
  await Patient.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!item) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': Item not found!`);
      return res.status(400).json({
        success: false,
        error: 'Item not found!',
      });
    }

    return res.status(200).json({
      success: true,
      item: item,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'deleteItem': ${err}`);
    console.error(err);
    return err;
  });
};

//**--------------------------------------EXAM TABLE------------------------------------ */
//Function for getting exam table: if the data exists, edit; if it doesn't, create exam
export const createExam = (req, res) => {
  const body = req.body;
  //const id = "61f7c2452bbe5349500db6d0";
  //check hot to make a request with params id
  const id = req.params.id;
  console.log(id);
  // console.log('----------------------- createItem: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createItem: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an item.',
    });
  }

  //check this
  // const patient = await getItemById(req.body._id);
  // console.log(patient);
  const item = new Exam({
    image: body.image,
    score: body.score,
    examInfo: body.examInfo,
    date: body.date,
    keyFindings: body.keyFindings,
    patient: id
  }); //create new record

  if (!item) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'item' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'item' is malformed",
    });
  }

  // console.log('----------------------- createItem: item -----------------------')
   console.log(item);

  return item
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createExam': Exam item created!`);
      return res.status(201).json({
        success: true,
        id: item._id,
        message: 'Item created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createExam'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

export const getExams = async (req, res) => {
  await Exam.find({}, (err, items) => {
    if (err) {
      console.error(`Error getting exams data': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`Items not found`);
      return res.status(200).json({
        success: true,
        items: [],
      });
    }
    console.log(`Fetching successful!`);
    return res.status(200).json(items);
  }).catch(err => {
    console.error(`Error fetching the data': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

export const getExamById = async (req, res) => {
  await Exam.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getExamById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getExamById': Item not found`);
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getExamById': Item fetched!`);
    return res.status(200).json(items[0]);
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getExamById': ${err}`);
    console.error(err);
    return err;
  });
};

export const updateExam = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`[Hack.Diversity React Template] - 400 in 'updateExam': You must provide an item to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an item to update.',
    });
  }

  const itemForUpdate = {
        image: body.image,
        score: body.score,
        examInfo: body.examInfo,
        keyFindings: body.keyFindings
  };

  // console.log('----------------------- updateItem: res -----------------------');
  // console.log(res);

  try {
    await Exam.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updateExam': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updateExam': Item updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Item updated!',
  });
};

export const deleteExam = async (req, res) => {
  await Exam.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteExam': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!item) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteExam': Item not found!`);
      return res.status(400).json({
        success: false,
        error: 'Item not found!',
      });
    }

    return res.status(200).json({
      success: true,
      item: item,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'deleteExam': ${err}`);
    console.error(err);
    return err;
  });
};


