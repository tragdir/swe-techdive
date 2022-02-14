import express from 'express'
import { Patient } from '../models/patient-model.js';
import { Exam } from '../models/exam-model.js';

import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getFromTwoSchema,
} from '../controllers/item-controller.js';

export const router = express.Router();

//**PATIENT SCHEMA */
router.get('/patients',  getItems(Patient, "patients"));
router.get('/patient/:id',  getItemById(Patient, 'patient'));
router.post('/patient',  createItem(Patient, "patient"));
router.put('/patient/:id',  updateItem(Patient, "patient"));
router.delete('/patient/:id',  deleteItem(Patient, Exam, "patient"));


//**EXAM SCHEMA */
router.get('/exams',  getItems(Exam, "exams"));
router.get('/exam/:id',  getItemById(Exam, 'exam'));
router.post('/exam/:id',  createItem(Exam, "exam"));
router.put('/exam/:id',  updateItem(Exam, "exam"));
router.delete('/exam/:id',  deleteItem(Patient, Exam,"exam"));

//**GET BOTH DATAS */
router.get('/data',  getFromTwoSchema(Patient, Exam));
//router.post('/examData',  insertManyData(Exam));


// module.exports = router;
