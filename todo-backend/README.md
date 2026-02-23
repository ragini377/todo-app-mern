
#  MERN Todo App - Backend

This is the **backend** of the Todo App built with **Node.js + Express** and connected to **MongoDB Atlas**.

---

##  Features

- REST API for Todos (CRUD operations)  
- MongoDB Atlas integration  
- CORS enabled for frontend  
- Handles add, update, delete, search and fetch requests  

---

## Tech Stack

- Node.js + Express  
- MongoDB Atlas  
- Mongoose ORM  

---

## Folder Structure
backend/
|-config/
| └─ db.js // MongoDB connection setup
├─ models/  
│ └─ Todo.js // Mongoose schema for Todo
├─ routes/
│ └─ todoRoutes.js // Express routes for Todo API
controllers/
└─ todoController.js // Logic for handling API requests
middleware/
└─ errorHandler.js // Custom error handling middleware

├─ server.js // Main server file

└─ package.json // Project dependencies and scripts

|-.env // Environment variables (e.g. MongoDB URI)

------------------------------------------------------------------------------------------



##  API Endpoints


 GET    | /todos         | Fetch all todos                   
 POST   | /todos         | Create a new todo                
 PUT    | /todos/:id     | Update a todo (toggle completed) 
 DELETE | /todos/:id     | Delete a todo                     

------------------------------------------------------------------------------------------


##  MongoDB Atlas Setup

1. Create a cluster in **MongoDB Atlas**  
2. Create a **Database User**  
3. Whitelist your **IP address**  
4. Connect in `server.js`:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

Database and collections are auto-created when the first task is added
--------------------------------------------------------------------------
##  Running the Backend
1. Install dependencies: `npm install`
2. Create a `.env` file with your MongoDB URI:  
   `MONGO_URI=your_mongodb_atlas_uri`
3. Start the server: npm run dev
The backend will run on `http://localhost:5000` and will be ready to handle API requests from the frontend. 





