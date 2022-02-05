import { Exam } from "../models/exam-model.js";
//import {Patient} from "../models/patient-model.js"


//README!!!!!!!!!!!!!!!!!!!!! README!!!!!!!!!!!!!!!!!!!!!!!!!
//**I am having issues by importing this module (ERR_MODULE: Cannot be found) */


//**--------------------------------------EXAM TABLE------------------------------------ */
//Function for getting exam table: if the data exists, edit; if it doesn't, create exam
export const createExam = (req, res) => {
    const body = req.body;
    //const id = "61f7c2452bbe5349500db6d0";
    //check hot to make a request with params id
    const id = req.params.id;
    //console.log(id);


    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an item.',
      });
    }


    const item = new Exam({
      image: body.image,
      score: body.score,
      examInfo: body.examInfo,
      date: body.date,
      keyFindings: body.keyFindings,
      patient: id
    }); //create new record for exam

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

