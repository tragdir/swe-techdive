import express from 'express'

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam} from '../controllers/exam-controller.js';


export const examRouter = express.Router();

//**--------- exam table----------*/
router.get('/exams',  getExams);
router.get('/exam/:id',  getExamById);
//router.post('/exam',  createExam); //working but need id
router.post('/exam/:id',  createExam); //create exam table with an existing id on item table
router.put('/exam/:id',  updateExam);
router.delete('/exam/:id',  deleteExam);

// module.exports = router;