# 💊 Digital Prescription Reminder System (MedManager)

A secure RESTful API and beautiful, dynamic Frontend Dashboard for managing medication schedules and dosage reminders. Built with a full-stack architecture utilizing Node.js, Express, MongoDB, and Vanilla JavaScript & CSS.

---

## 🌟 Features

- **Intuitive UI:** A dark-mode inspired dashboard with interactive cards and dynamic statistics.
- **Full CRUD Operations:** Easily Create, Read, Update, and Delete digital prescriptions.
- **RESTful API:** Clean, structured backend API routing following MVC principles.
- **Time Formatting:** Intelligent client-side time normalization and 12-hour AM/PM formatting.

---

## 🏗️ Architecture (MVC Pattern)

This project follows the **Model-View-Controller** design pattern for clean separation of concerns:

* **Models:** Define the Prescription schema and MongoDB interaction using Mongoose.
* **Views (Public):** A fully decoupled static frontend (`index.html`, `style.css`, `app.js`) to interact with the backend API. 
* **Controllers:** Handle the business logic, such as validating data and performing database operations.
* **Routes:** Map the RESTful API endpoints to the specific controller functions.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox, CSS Grid), Vanilla JavaScript

---

## 📂 Project Structure

```text
Prescription-Reminder-Api
 ├── controllers/
 │    └── prescriptionController.js
 ├── models/
 │    └── prescriptionModel.js
 ├── public/
 │    ├── app.js         # Frontend logic and API integration
 │    ├── index.html     # Dashboard layout
 │    └── style.css      # Vibrant dark-mode UI styling
 ├── routes/
 │    └── prescriptionRoute.js
 ├── .env                # Environment variables (PORT, MONGO_URL)
 ├── index.js            # Express server entry point
 └── package.json
```

---

## 🔌 API Endpoints

The API is served under the `/api/prescription` base path.

| Method | Endpoint      | Description |
|--------|--------------|-------------|
| GET    | `/getall`    | Retrieve all prescription reminders |
| POST   | `/add`       | Add a new prescription reminder |
| PUT    | `/update/:id`| Update an existing prescription by ID |
| DELETE | `/delete/:id`| Remove a prescription by ID |

---

## ⚙️ Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shani767/Prescription-Reminder-Api.git
   cd Prescription-Reminder-Api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your MongoDB connection string and port:
   ```env
   PORT=8000
   MONGO_URL="mongodb://localhost:27017/prescriptionDB"
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:8000` (or whatever `PORT` you configured in your `.env` file) to view the MedManager Dashboard!