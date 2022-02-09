import mongoose from "mongoose"
//import {Patient} from "../models/patient-model.js"
const Schema = mongoose.Schema;

const ExamSchema = new Schema(
    {
        patient:
            {type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
            }
        ,
        image: String,
        score: {
            type: [Number],
            require: true
        },
        keyFindings: String
    },

    { timestamps: true },
);

export const Exam = mongoose.model('Exam', ExamSchema);