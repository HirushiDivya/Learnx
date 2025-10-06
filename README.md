# LearnX - Online Learning Platform

LearnX is a modern web-based online learning platform developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It enables instructors to manage courses and content, and students to enroll in courses and access learning materials.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screnshots)

---

## Features
- Role Based Acess
- Admin can accept or deny students enrolement requests. After admin approval student can enroll for the course.
- Admin can:
  - Add, update, and delete courses.
  - Upload and manage course content (PDFs, videos, text, images).
  - View and manage student enrollment requests.
- Students can:
  - Browse available courses.
  - Request enrollment in courses.
  - Access approved course content.
- User-friendly interface with React components for dashboards and content views.

---

## Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Storage:** Local uploads 
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Custom validation in backend

---

## Project Structure
LearnX/
│
├─ BACKEND/
│ ├─ models/
│ │ ├─ Content.js
│ │ ├─ Course.js
│ │ └─ EnrollmentRequest.js
│ ├─ routes/
│ │ ├─ admin.js
│ │ ├─ contents.js
│ │ └─ courses.js
│ ├─ uploads/ # Uploaded course files
│ ├─ validations/
│ │ └─ courseValidation.js
│ ├─ server.js # Entry point
│ └─ package.json
|
├─frontend/
├── components/
│   ├── Adminn/
│   │   ├── ADashbord.js
│   │   ├── AddContent.css
│   │   ├── AddContent.js
│   │   ├── Admin.js
│   │   ├── Adminallcourse.js
│   │   ├── AdminEnrollments.js
│   │   ├── AdminViewOne.js
│   │   ├── DeleteCourse.js
│   │   ├── UpdateContent.js
│   │   ├── UpdateCourse.js
│   │   ├── UpdateCourse.css
│   │   └── ViewCourse.css
│   ├── UI/
│   │   ├── AnimatedDiv.js
│   │   ├── Button.js
│   │   └── Card.js
│   └── user/
│       ├── AllCourses.css
│       ├── AllCourses.js
│       ├── Coursecontent.js
│       ├── Coursenrollment.js
│       ├── MyEnrollments.js
│       ├── Userdashboard.js
│       ├── ViewCourse.css
│       └── ViewCourse.js
├── App.css
├── App.js
├── Admin.js
├── Coursedashboard.js
├── Header.js
├── Home.js
├── Login.js
├── Logout.js
├── MyEnrollments.js
├── Switch.js
├── index.js
├── Style.css
├── Adminn.css
├── login.css
├── .gitignore
├── .gitattributes
├── package-lock.json
├── package.json
└── README.md

## Installation

### Backend
```bash
cd LearnX/BACKEND
npm install

```
### frontend
```
cd LearnX/frontend
npm install

```

## Running The Project
### Backend
cd LearnX/BACKEND
npm start

### frontend
cd LearnX/frontend
npm start

Open browser at http://localhost:3000 (React) and backend API runs at http://localhost:5000 (default).


##API Endpoints
### Admin Routes
POST    /admin/enroll - Route to save a new enrollment request
PUT     /enroll/:id   -  Route to update an enrollment request
GET     /admin//enrolls  - Route to get all enrollment requests
DELETE  /denroll/:id   -  Route to delete an enrollment request
GET     /enroll-status/:studentId/:courseId   - Route to get enrollment status by student ID and course ID

### Courses Routes 
GET     /course/    - Route to get all exist courses
GET     /course/get/:id   - Route to get a course
DELETE  /course/delete/:id  - Route to delete a Course 
POST    /course/add  - Route to add new course
PUT     /updata/:id  -  Route to update a Course 


### Content Routes
POST   /uploads/add  - Add content (with file upload)
GET    / uploads/get  - View all content (retrieve files from MongoDB)
GET    /uploads/get/:id  -  View one content (retrieve specific file)
PUT    /uploads/update/:id  - Update content (with optional file upload)
DELETE  /uploads/delete/:id  - Delete content


## Screenshots
<img width="1889" height="1026" alt="Screenshot 2025-09-22 184037" src="https://github.com/user-attachments/assets/0440bbc4-d2c1-4622-b000-18764fc38d78" />
<img width="1857" height="989" alt="Screenshot 2025-09-24 144029" src="https://github.com/user-attachments/assets/5241978a-2e81-4ed2-8f0f-5a97ba1b4be3" />
<img width="1867" height="980" alt="Screenshot 2025-09-24 144122" src="https://github.com/user-attachments/assets/8bbe40a0-3ac7-4ca1-99a4-b233a125c521" />
<img width="1861" height="978" alt="Screenshot 2025-09-24 144137" src="https://github.com/user-attachments/assets/fb9bb664-3f75-40fa-a44e-cb1eb2e8e004" />
<img width="1861" height="983" alt="Screenshot 2025-09-24 144006" src="https://github.com/user-attachments/assets/c242a519-5452-4ee9-8a6b-553872698231" />
<img width="1884" height="979" alt="Screenshot 2025-09-24 143947" src="https://github.com/user-attachments/assets/d8ec922e-033c-4643-8e9f-a7f53e2e7189" />
<img width="1891" height="996" alt="Screenshot 2025-09-24 144053" src="https://github.com/user-attachments/assets/479c1169-a1d0-4698-8790-305a06f95da2" />
