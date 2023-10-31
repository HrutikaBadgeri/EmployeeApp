# Employee Management App
This is a full-stack web application for managing employee information. It provides two types of user profiles: Admin and Employee. The app allows CRUD operations on employee data and utilizes Node.js, Express.js, and MongoDB for the backend, and React.js for the frontend.

##Table of Contents
  -Features
  -Requirements
  -Folder Structure
  -Dependencies

## Features
### Admin Profile
  - Dashboard
  - View a summary of employee statistics.
  - Employee Management
  - Create, Read, Update, and Delete employee records.
  - Upload and manage employee documents (file handling using Multer).
  - Search and Filter
  - Search and filter employees based on various criteria.
### Employee Profile
  - Personal Information
  - View and update personal information.
  - Upload and manage personal documents.

## Requirements
  -Node.js
  -npm (Node Package Manager)
  -MongoDB

##Folder Structure
```
employee-management-app/
├── client/                  # Frontend (React.js)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                  # Backend (Node.js, Express.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/              # Uploaded files (handled by Multer)
│   ├── app.js
│   └── ...
├── .gitignore
├── package.json
└── ...

```  
## Dependencies
Backend:
  -Express.js
  -Mongoose (for MongoDB interactions)
  -Multer (for file handling)
Frontend:
  -React.js
  -Axios (for API calls)
  -React Router (for routing)
