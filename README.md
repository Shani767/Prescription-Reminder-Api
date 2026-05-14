# 💊 Digital Prescription Reminder System

A secure RESTful API for managing medication schedules and dosage reminders, built with Node.js, Express, and MongoDB.

---

## 🏗️ Architecture (MVC Pattern)

This project follows the **Model-View-Controller** design pattern for clean separation of concerns:

* **Models:** Define the Prescription schema and MongoDB interaction using Mongoose.
* **Controllers:** Handle the business logic, such as validating data and performing database operations.
* **Routes:** Map the RESTful API endpoints to the specific controller functions.

---

## 📂 Project Structure

```text
Prescription-Reminder-Api
 ├── controllers/
 │    └── prescriptionController.js
 ├── models/
 │    └── prescriptionModel.js
 ├── routes/
 │    └── prescriptionRoute.js
 ├── .env
 ├── .gitignore
 ├── package.json
 ├── README.md
 └── index.js