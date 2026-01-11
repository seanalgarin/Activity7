# 📋 Task Management System

A professional full-stack task management application built with **NestJS**, **ReactJS**, **SQLite**, and **Swagger** for API documentation.

## 🚀 Features

### Backend (NestJS + SQLite)
- ✅ RESTful API with full CRUD operations
- ✅ Three main entities: Users, Projects, and Tasks
- ✅ SQLite database with TypeORM
- ✅ Swagger API documentation
- ✅ Data validation with class-validator
- ✅ Relationship management (Users → Projects → Tasks)
- ✅ CORS enabled for frontend communication
- ✅ Environment-based configuration

### Frontend (ReactJS)
- ✅ Modern, responsive dashboard
- ✅ Real-time statistics display
- ✅ Project management interface
- ✅ Task management with status tracking
- ✅ User management system
- ✅ Deadline tracking with overdue warnings
- ✅ Color-coded task statuses
- ✅ Intuitive forms for creating/editing
- ✅ Professional error handling

## 📁 Project Structure

```
ACTIVITY7/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── users/          # User module
│   │   ├── projects/       # Project module
│   │   ├── tasks/          # Task module
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Application entry point
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React Frontend
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Application entry point
│   ├── .env.example       # Environment variables template
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run start:dev
```

The backend server will start on the configured port (default: 3000)

5. Access API Documentation:
Navigate to the `/api` endpoint in your browser

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend application will start on port 3000 (or 3001 if 3000 is in use)

## ⚙️ Environment Configuration

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
APP_NAME=Task Management System API
APP_VERSION=1.0.0
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_NAME=Task Management System
REACT_APP_VERSION=1.0.0
```

## 📚 API Documentation

Once the backend is running, access the interactive Swagger API documentation at the `/api` endpoint.

### API Endpoints

#### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /projects/:id/tasks` - Get all tasks for a project
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks?userId=:id` - Get tasks by user
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 💾 Database

The application uses **SQLite** as the database, which is automatically created when you start the backend server. The database file will be created in the backend directory.

### Database Schema

**Users Table:**
- id (Primary Key)
- name
- email (Unique)
- createdAt

**Projects Table:**
- id (Primary Key)
- name
- description
- userId (Foreign Key → Users)
- createdAt

**Tasks Table:**
- id (Primary Key)
- title
- description
- status (pending | in_progress | completed)
- deadline
- projectId (Foreign Key → Projects)
- assignedUserId (Foreign Key → Users)
- createdAt

## 🎨 Frontend Features

### Dashboard
- Overview statistics (Total Projects, Total Tasks, Pending Tasks, Completed Tasks)
- Project list with task counts
- Task list with status and deadline tracking
- Quick navigation between views

### Project Management
- Create new projects
- Edit existing projects
- Delete projects
- Assign projects to users
- View project details and associated tasks

### Task Management
- Create new tasks with all 3 status options:
  - ⏳ **Pending** - Task is created but not started
  - 🔄 **In Progress** - Task is being worked on
  - ✅ **Completed** - Task is finished
- Edit existing tasks
- Delete tasks
- Set deadlines with date/time picker
- Assign tasks to users
- Associate tasks with projects
- Visual indicators for overdue tasks

### User Management
- Add new users
- Edit user information
- Delete users
- View user statistics (projects and tasks count)

## 🎯 Usage Guide

### Getting Started

1. **Start both servers** (backend and frontend as described above)
2. **Access the application** in your web browser
3. **Create users first** - Navigate to the "Users" tab and add users
4. **Create projects** - Click "+ New Project" and assign to a user
5. **Create tasks** - Click "+ New Task", select a project, set deadline, and optionally assign to a user
6. **Manage everything** from the dashboard

### Task Status Flow
```
Pending → In Progress → Completed
   ⏳         🔄            ✅
```

### Tips
- Tasks with past deadlines will be highlighted in red
- The dashboard shows real-time statistics
- All forms include validation to ensure data integrity
- Use Swagger documentation to test API endpoints directly
- All dropdown options are fully functional

## 🔧 Development

### Backend Development
```bash
cd backend
npm run start:dev  # Start with hot-reload
npm run build      # Build for production
npm run start:prod # Run production build
```

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🐛 Troubleshooting

### Backend Issues
- Ensure the configured port is not in use
- Check if all dependencies are installed: `npm install`
- Verify environment variables are properly configured
- Delete `node_modules` and reinstall if needed

### Frontend Issues
- Verify the API URL in `.env` matches the backend port
- Check if all dependencies are installed: `npm install`
- Ensure the backend is running and accessible
- Clear browser cache if experiencing issues

### Database Issues
- Delete the database file and restart the backend
- The database will be recreated automatically with proper schema

### CORS Errors
- Verify CORS configuration in backend `.env`
- Ensure both servers are running
- Check that frontend API URL matches backend configuration

## 📝 Notes

- Environment variables provide flexible configuration
- SQLite database is created automatically on first run
- TypeORM synchronize is enabled for development (auto-creates tables)
- All API endpoints are documented in Swagger
- Frontend uses Axios with interceptors for better error handling
- Form validation is implemented on both frontend and backend
- Professional logging system in backend

## 🎓 Activity 7 Requirements

This project fulfills all Activity 7 requirements:

✅ **Backend**: CRUD operations for projects, users, and tasks  
✅ **Frontend**: Dashboard for projects and tasks with deadlines  
✅ **Database**: SQLite with proper relationships  
✅ **API Documentation**: Swagger UI at /api endpoint  
✅ **Task Management**: Complete status tracking (all 3 statuses functional)  
✅ **User Management**: Full user CRUD operations  
✅ **Project Management**: Projects linked to users and tasks  
✅ **Professional Configuration**: Environment-based setup  
✅ **Error Handling**: Comprehensive error handling and validation  

## 📄 License

This project is created for educational purposes (Activity 7).

## 👨‍💻 Author

Created as part of Activity 7: Task Management System

---

**Built with ❤️ using NestJS and React**
