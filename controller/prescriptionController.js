import Prescription from "../model/prescriptionModel.js";  

export const create = async (req, res) => {
    try {
        const prescriptionData = new Prescription(req.body);  
        const savedData = await prescriptionData.save();  
        res.status(200).json(savedData);  
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." }); 
    }
};

export const fetch = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();  
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions found." }); 
        }
        res.status(200).json(prescriptions);  
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });  
    }
};
 
export const update = async (req, res) => {
    try {
        const id = req.params.id; 
        const updatedData = await Prescription.findByIdAndUpdate(id, req.body, { new: true }); 
        res.status(201).json(updatedData); 
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." }); 
    }
};
 
export const deletePrescription = async (req, res) => {
    try {
        const id = req.params.id;  
        await Prescription.findByIdAndDelete(id); 
        res.status(201).json({ message: "Prescription deleted successfully." });  
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });  
    }
};