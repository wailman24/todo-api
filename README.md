# To-Do API

## 📌 Project Description
This is a simple **To-Do API** built with **Node.js, Express, and MongoDB**. Users can **register, log in, and manage their tasks**. Each user can **create, read, update, and delete** only their own tasks.

## 🚀 Features
- **User Authentication**: Register and login using JWT.
- **Task Management**: CRUD operations for tasks.
- **Middleware Protection**: Users can only modify their own tasks.
- **Secure Password Handling**: Using bcryptjs for hashing.

## 🛠️ Technologies Used
- **Node.js** (Express.js)
- **MongoDB** (Mongoose ORM)
- **JWT Authentication**
- **bcryptjs** (Password Hashing)

## 🔑 API Endpoints

### **User Routes**
| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/users/register` | Register a new user   |
| POST   | `/api/users/login`    | Login and get a token |

### **Task Routes** *(Protected by JWT Middleware)*
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/api/tasks`       | Create a new task        |
| GET    | `/api/tasks`       | Get all user's tasks     |
| PUT    | `/api/tasks/:id`   | Update user's task       |
| DELETE | `/api/tasks/:id`   | Delete user's task       |

## 🔒 Middleware
- **Auth Middleware** ensures users can only modify their own tasks.


