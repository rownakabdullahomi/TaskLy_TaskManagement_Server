# TaskLy - Server Side 🚀

---

### 🔗 Deployment Links:
🎨 - **Frontend**: [TaskLy Frontend](https://task-management-ae3a9.web.app) 

⚙️ - **Backend**: [TaskLy Backend](https://task-management-server-plum-phi.vercel.app) 

---

## ✨ Short Description
Welcome to the backend server of **TaskLy**, a feature-rich task management system built using the **MERN stack**. This server handles core functionalities like user authentication, task management, and drag-and-drop task reordering.

---

## 🌟 Features

- 🔐 **User Authentication**: Manage users securely.
- ✅ **Task Management**: Create, update, delete, and reorder tasks.
- 🔄 **Drag-and-Drop Support**: Reorder tasks dynamically.
- 📊 **Task Categorization**: Organize tasks into "To-Do," "In Progress," and "Done."
- 📁 **MongoDB Database**: Store and manage task data efficiently.
- 🛡️ **Secure API**: Well-structured RESTful endpoints.
- 🚀 **Deployed on Vercel**: Reliable and fast hosting.
- 🛠️ **Middleware**: Efficient request validation and error handling.

---

## 🛠️ Technologies Used

- **Backend Framework**: Node.js with Express.js 🟩
- **Database**: MongoDB 🍃
- **Authentication**: Firebase 🔐
- **Deployment**: Vercel 🌍
- **Language**: JavaScript (ES6+) 🟨

---

## 🚏 API Endpoints

### 🏷️ Users

- **Register a User**
  - `POST /users`
  - **Request Body:** `{ email, name }`
  - **Response:** `{ message: string, insertedId: string | null }`

### 📌 Tasks

- **Create a Task**
  - `POST /tasks`
  - **Request Body:** `{ name, description, status, createdBy }`
  - **Response:** `{ insertedId: string }`

- **Get All Tasks by User**
  - `GET /tasks/:email`
  - **Response:** `[ { ...taskDetails } ]`

- **Get Tasks by Status**
  - `GET /todo-tasks/:email`
  - `GET /in-progress-tasks/:email`
  - `GET /done-tasks/:email`
  - **Response:** `[ { ...taskDetails } ]`

- **Update a Task**
  - `PUT /tasks/:id`
  - **Request Body:** `{ name, description }`
  - **Response:** `{ matchedCount, modifiedCount }`

- **Update Task Status and Order**
  - `PUT /drag-update/tasks/:id`
  - **Request Body:** `{ status, order }`
  - **Response:** `{ matchedCount, modifiedCount }`

- **Reorder Multiple Tasks**
  - `PUT /reorder-tasks`
  - **Request Body:** `{ tasks: [{ id, order }] }`
  - **Response:** `{ matchedCount, modifiedCount }`

- **Delete a Task**
  - `DELETE /tasks/:id`
  - **Response:** `{ deletedCount }`

---

## 🌀 NPM Packages Used

- [express](https://www.npmjs.com/package/express): Web framework for building the server.
- [mongodb](https://www.npmjs.com/package/mongodb): MongoDB driver for database integration.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.
- [cors](https://www.npmjs.com/package/cors): Enables secure cross-origin requests.
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware.

---

## 🙌 Acknowledgments

Special thanks to all open-source libraries and tools used in this project! 💜

---

## 📧 Contact Me for More

Feel free to explore and contribute to this repository. Happy coding! 😊

## 🤝 Thank You

