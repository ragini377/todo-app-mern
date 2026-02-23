#   Todo App - Frontend MERN

This is the **frontend** part of the Todo App built with
 **React** and 
 **Tailwind CSS**, 
 connected to a 
 **Node.js + Express backend**.



##  Features

- Add, update, and delete tasks  
- Real-time status messages  
- Search tasks dynamically  
- Smooth UI using Tailwind CSS  
- Works with MongoDB Atlas backend

------------------------------------------

## Tech Stack

- React (Functional Components + Hooks)  
- Tailwind CSS  
- Axios for API requests  

-------------------------------------------

## Folder Structure
todo-frontend/
src/
─ components/
 Loader.jsx
TodoItem.jsx   
TodoApp.jsx
TodoList.jsx

services/
 api.js

App.jsx
index.js
public/
package.json

------------------------------------------------------

---

##  Installation & Run

```bash
cd frontend
npm i
npm nodemondev
npm run dev

Runs at: http://localhost:5173


------------------------------------------------------
Connecting to Backend   
Make sure your backend server is running at http://localhost:5000
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTodos = () => API.get("/todos");
export const createTodo = (newTodo) => API.post("/todos", newTodo);
export const updateTodo = (id) => API.put(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

-----------------------------------------------------------






