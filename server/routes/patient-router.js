import express from 'express'

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam} from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/items',  getItems);
router.get('/item/:id',  getItemById);
router.post('/item',  createItem);
router.put('/item/:id',  updateItem);
router.delete('/item/:id',  deleteItem);

router.get('/exams',  getExams);
router.get('/exam/:id',  getExamById);
//router.post('/exam',  createExam); //working but need id
router.post('/exam/:id',  createExam); //create exam table with an existing id on item table
router.put('/exam/:id',  updateExam);
router.delete('/exam/:id',  deleteExam);


// module.exports = router;
