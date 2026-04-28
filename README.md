==================================================
COMPANY MODULE - 
==================================================

📌 PROJECT TITLE:
Company Registration Module

📘 DESCRIPTION:
This project implements a full-stack Company Registration System using Node.js, Express.js, PostgreSQL, and Cloudinary.

The system allows:
- User authentication using JWT
- Uploading company logos to Cloudinary
- Registering and storing company details in PostgreSQL
- A frontend interface to submit company data via form

--------------------------------------------------
🧩 TECH STACK:
--------------------------------------------------
Frontend: HTML, CSS, JavaScript
Backend: Node.js + Express.js
Database: PostgreSQL
File Uploads: Cloudinary + Multer
Authentication: JWT (JSON Web Token)
Language: JavaScript (ES6)

--------------------------------------------------
📁 PROJECT STRUCTURE:
--------------------------------------------------
intern_assign/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── viewCompanies.js
│   ├── package.json
│   └── .env (optional / with DB credentials)
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
├── company_db.sql
├── Company_Module_API_Documentation_Styled.pdf
└── README.txt (this file)

--------------------------------------------------
⚙️ HOW TO RUN THE PROJECT:
--------------------------------------------------

1️⃣ REQUIREMENTS:
   - Node.js (v18 or higher)
   - PostgreSQL (running locally on port 5432)
   - Internet connection (for Cloudinary upload)

2️⃣ DATABASE SETUP:
   - Open PostgreSQL (psql or pgAdmin)
   - Run the following commands:
     > CREATE DATABASE company_db;
     > \c company_db;
     > \i 'path_to/company_db.sql';
   - Confirm tables using:
     > \dt;

3️⃣ BACKEND SETUP:
   - Open a terminal and navigate to:
     > cd backend
   - Install all dependencies:
     > npm install
   - Start the backend server:
     > node server.js
   - Server will start at:
     > http://localhost:5000

4️⃣ FRONTEND SETUP:
   - Open the "frontend/index.html" file in any browser
     OR
   - Use VS Code Live Server extension
   - Frontend runs at:
     > http://127.0.0.1:5500/frontend/index.html

--------------------------------------------------
✅ TESTING FLOW:
--------------------------------------------------
1. Register a user (via /api/auth/register or your Postman)
2. Login and copy the JWT token
3. Open the frontend form and:
   - Upload a company logo
   - Fill in company details
   - Click “Register Company”
4. Success Message:
   "Company registered successfully"
5. Verify in DB:
   > SELECT * FROM company_profile;

--------------------------------------------------
📸 SUGGESTED SCREENSHOTS (Attach in PDF or Folder):
--------------------------------------------------
1. Frontend registration form
2. Postman test of upload and register endpoints
3. Database proof (company_profile entries)
4. Browser console showing success message

--------------------------------------------------
🚫 NOTES:
--------------------------------------------------
- Do NOT include node_modules folder in submission.
- Evaluators can run `npm install` to restore dependencies.
- Ensure your Cloudinary and JWT credentials are valid.

--------------------------------------------------
🎯 PROJECT STATUS:
--------------------------------------------------
✅ Database Setup Completed
✅ Backend + API Routes Working
✅ JWT Authentication Added
✅ Cloudinary File Upload Working
✅ Frontend Form Integrated
✅ Documentation Prepared
✅ Tested via Postman + Browser

--------------------------------------------------
