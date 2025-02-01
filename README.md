# TaskPro Backend 🛠️

TaskPro Backend is a **Node.js & Express.js**-based API that provides user authentication, task management, and board organization functionalities. It enables users to create, update, and manage their projects efficiently, featuring secure authentication, role-based access, and real-time updates.

## 🚀 Features

- 🔑 **User Authentication** – Secure login, registration, and session management with JWT & cookies.
- 🏗️ **Board & Task Management** – Full CRUD operations for **boards, columns, and tasks**.
- 📂 **File Uploads** – User avatars are uploaded and stored via **Cloudinary**.
- 📧 **Email Notifications** – Send emails for user verification and notifications using **Nodemailer**.
- 🛠️ **Input Validation** – Ensures data integrity using **Joi schemas**.
- 🌍 **Security & CORS Protection** – API protected with **CORS, Helmet, and rate limiting**.
- 🚀 **Optimized Performance** – Uses indexing and pagination for handling large datasets.

---

## 📦 Tech Stack

- **Node.js & Express.js** – Backend framework for handling API requests.
- **MongoDB & Mongoose** – NoSQL database for storing and managing data.
- **JWT & Cookies** – Token-based authentication and session management.
- **Multer & Cloudinary** – File uploads and cloud storage for images.
- **Nodemailer** – Email service for sending notifications.
- **Helmet & CORS** – Middleware for API security.
- **Joi** – Schema-based validation for request data.

---

## 🛠️ Setup Instructions

To run the project locally, follow the steps below:

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/kolyakr/TaskPro-backend
```

### 2. Install dependencies

Navigate into the project directory and install the required dependencies:

```bash
cd taskpro-backend
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory and add the following environment variables:

```bash
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://your-db-uri
MONGO_NAME=your-mongodb-username
MONGO_PASSWORD=your-mongodb-password
MONGO_DB=dbname
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
MAIL_HOST=smtp.your-email-provider.com
MAIL_PORT=587
MAIL_USER=your-email@example.com
MAIL_PASS=your-email-password
MAIL_FROM=your-email@example.com
FRONTEND_URL_DEV=""
FRONTEND_URL_PROD=""


```

### 4. Run the development server

Start the backend server with the following command:

```bash
npm start
```

or using nodemon (for automatic restarts on changes):

```bash
npm run dev
```

The API server will be running at:
🔗 http://localhost:3000 (or the port specified in .env)

### 5. Run in production mode

To build and start the app in production mode, use:

```bash
npm run build
npm run start
```

---

## 🔥 API Endpoints

### **🔑 Authentication**

| Method | Endpoint           | Description              | Auth Required |
| ------ | ------------------ | ------------------------ | ------------- |
| POST   | \`/auth/register\` | Register a new user      | ❌ No         |
| POST   | \`/auth/login\`    | Login and get JWT token  | ❌ No         |
| POST   | \`/auth/logout\`   | Logout user              | ✅ Yes        |
| GET    | \`/users/me\`      | Get current user profile | ✅ Yes        |

### **📌 Boards**

| Method | Endpoint        | Description          | Auth Required |
| ------ | --------------- | -------------------- | ------------- |
| GET    | \`/boards\`     | Get all user boards  | ✅ Yes        |
| POST   | \`/boards\`     | Create a new board   | ✅ Yes        |
| PATCH  | \`/boards/:id\` | Update board details | ✅ Yes        |
| DELETE | \`/boards/:id\` | Delete a board       | ✅ Yes        |

### **📌 Columns & Cards**

| Method | Endpoint         | Description              | Auth Required |
| ------ | ---------------- | ------------------------ | ------------- |
| POST   | \`/columns\`     | Create a new column      | ✅ Yes        |
| PATCH  | \`/columns/:id\` | Update column details    | ✅ Yes        |
| DELETE | \`/columns/:id\` | Delete a column          | ✅ Yes        |
| POST   | \`/cards\`       | Create a new task card   | ✅ Yes        |
| PATCH  | \`/cards/:id\`   | Update task card details | ✅ Yes        |
| DELETE | \`/cards/:id\`   | Delete a task card       | ✅ Yes        |

---

## 📂 Folder Structure

```bash
TaskPro-backend/
├── .gitignore               # Files ignored by Git
├── eslint.config.mjs        # ESLint configuration
├── package-lock.json        # Lock file for npm dependencies
├── package.json             # Project metadata & dependencies
├── README.md                # Project documentation
├── src/                     # Source code
│   ├── constants.js         # Global constants
│   ├── index.js             # Main entry point
│   ├── server.js            # Express server configuration
│   │
│   ├── controllers/         # Route controllers
│   │   ├── auth.js
│   │   ├── boards.js
│   │   ├── cards.js
│   │   ├── columns.js
│   │   ├── mail.js
│   │   ├── users.js
│   │
│   ├── db/                  # Database setup
│   │   ├── initMongoConnection.js
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── Board.js
│   │   │   ├── Card.js
│   │   │   ├── Column.js
│   │   │   ├── Session.js
│   │   │   ├── User.js
│   │
│   ├── middlewares/         # Express middlewares
│   │   ├── authorization.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── upload.js
│   │   ├── validateBody.js
│   │   ├── validateMongoId.js
│   │
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── boards.js
│   │   ├── cards.js
│   │   ├── columns.js
│   │   ├── index.js
│   │   ├── users.js
│   │
│   ├── services/            # Business logic
│   │   ├── auth.js
│   │   ├── boards.js
│   │   ├── cards.js
│   │   ├── columns.js
│   │   ├── mail.js
│   │   ├── users.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── createTemp.js
│   │   ├── ctrlWrapper.js
│   │   ├── env.js
│   │   ├── parseColumnFilterParams.js
│   │   ├── saveToCloudinary.js
│   │   ├── sendMail.js
│   │
│   ├── validations/         # Joi validation schemas
│   │   ├── createBoardSchema.js
│   │   ├── createCardSchema.js
│   │   ├── createColumnSchema.js
│   │   ├── loginUserSchema.js
│   │   ├── registerUserSchema.js
│   │   ├── sendNeedHelpEmailSchema.js
│   │   ├── updateBoardSchema.js
│   │   ├── updateCardSchema.js
│   │   ├── updateColumnSchema.js
│   │   ├── updateUserProfileSchema.js
│
└── node_modules/            # Dependencies
```
---

🎉 **TaskPro Backend – Manage your tasks with ease!** 🚀
