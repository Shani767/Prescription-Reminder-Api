import express from "express";  
import mongoose from "mongoose"; 
import bodyParser from "body-parser";  
import dotenv from "dotenv"; 
import route from "./routes/prescriptionRoute.js";  

const app = express();  
app.use(bodyParser.json());  

dotenv.config();

const PORT = process.env.PORT || 5000;  
const MONGOURL = process.env.MONGO_URL;  

mongoose.connect(MONGOURL).then(() => {  
    console.log("Database connected successfully.");  
    app.listen(PORT, () => {  
        console.log(`Server is running on port: ${PORT}`); 
    });
}).catch((error) => console.log(error));  

app.get("/", (req, res) => {
    res.send("<h1>Database connected successfully.</h1><p>The Digital Prescription Reminder API is running.</p>");
});

app.use("/api/prescription", route);  