import express from "express"; 
import { create, fetch, update, deletePrescription } from "../controller/prescriptionController.js";  
const route = express.Router(); 

route.post("/add", create);  
route.get("/getall", fetch);  
route.put("/update/:id", update);  
route.delete("/delete/:id", deletePrescription);  

export default route;  