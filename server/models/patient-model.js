import mongoose from "mongoose"
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
    {
        age: Number,
        sex: {
            type: String,
            max: 1,
        },
        race: String,
        zip: Number,
        latest_bmi: Number,
        icu_admit: String,
        mortality: String,

    },

    { timestamps: true },
    { versionKey: false },

);

export const Patient = mongoose.model('Patient', PatientSchema);