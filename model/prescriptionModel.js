import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    medicationName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },  
    reminderTime: { type: String, required: true }  
});

export default mongoose.model("medications", prescriptionSchema); 