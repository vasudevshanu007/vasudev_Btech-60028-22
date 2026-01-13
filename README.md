# 🗂️ Task Management System (Kanban Board)

## 📌 Project Overview
This project is a **full-stack Task Management System** based on the **Kanban methodology**.  
It allows users to manage their daily tasks efficiently by organizing them into different stages:
**Pending**, **In-Progress**, and **Completed**.

The system supports **secure authentication**, **profile management**, and **task CRUD operations**.
Each user can manage only their own tasks, and all data is stored persistently in the database.

---

## 🚀 Features

### 🔐 Authentication & User Management
- User Registration (Sign Up)
- User Login & Logout
- JWT-based authentication
- Protected routes
- Update user profile
- Delete user account

### 📝 Task Management
- Create, Read, Update, Delete (CRUD) tasks
- Task attributes:
  - Title
  - Description
  - Status (pending / in-progress / completed)
  - Due date
  - Created date
- Tasks are user-specific
- Filter tasks by status using API
- Kanban board with drag-and-drop support
- Task status updates are saved to the backend

### 🎨 User Interface
- Kanban board layout
- Clean and minimal UI
- Responsive design
- Profile management page

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router v6
- Axios
- @hello-pangea/dnd (Drag and Drop)
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js

---

## 📁 Project Structure

task_management_system/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md


## ⚙️ Backend Setup
 1. cd backend
 2. npm install
 3. node server.js

 Backend will run on: "http://localhost:5000"

 ## ⚙️ Frontend Setup
  1. cd frontend
  2. npm install
  3. npm start
Frontend will run on: "http://localhost:3000"

## ⚙️ .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management_db
JWT_SECRET=db0b9e70b7acaa171dad89fd2d12f8cfd01c3800b22d3b64f546bf3b1fed2bd2c48c350e4c650552f8e0aed0db45cc78fcd56cd1c4edcc06b774a7a52a083cb2

## ⚙️ security

1. JWT-based authentication
2. Authorization header sent via Axios interceptor
3. Backend middleware protects routes
4. Frontend redirects unauthenticated users to login


## ⚙️ error handling
1. Backend input validation
2. Proper HTTP status codes
3. Graceful error handling on frontend
4. Protected routes on both frontend and backend

