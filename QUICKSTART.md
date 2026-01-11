# 🚀 Quick Start Guide

## Prerequisites
- Node.js v18+ installed
- npm or yarn package manager

## Installation (Choose One Method)

### Method 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Method 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## Running the Application

### Step 1: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm run start:dev
```

Wait for the message:
```
🚀 Application is running on: http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

### Step 2: Start Frontend Server

Open a **NEW** terminal and run:
```bash
cd frontend
npm run dev
```

Wait for the message showing the local server URL (usually http://localhost:5173)

### Step 3: Access the Application

Open your browser and navigate to:
- **Frontend Application:** http://localhost:5173
- **Swagger API Docs:** http://localhost:3000/api

## First Time Usage

1. **Create Users First**
   - Click on "Users" tab
   - Click "+ Add New User"
   - Fill in name and email
   - Click "Add User"

2. **Create a Project**
   - Click "+ New Project"
   - Enter project name and description
   - Select a user as project owner
   - Click "Create Project"

3. **Create Tasks**
   - Click "+ New Task"
   - Enter task title and description
   - Select status (Pending, In Progress, Completed)
   - Set a deadline
   - Select the project
   - Optionally assign to a user
   - Click "Create Task"

4. **View Dashboard**
   - Click "Dashboard" to see overview
   - View statistics, projects, and tasks
   - Edit or delete items using the ✏️ and 🗑️ buttons

## API Testing with Swagger

1. Navigate to http://localhost:3000/api
2. Explore all available endpoints
3. Click "Try it out" on any endpoint
4. Fill in the required parameters
5. Click "Execute" to test the API

## Common Issues

### Port Already in Use

**Backend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

Delete the database file and restart:
```bash
cd backend
rm task-management.db
npm run start:dev
```

## Features Overview

### ✅ Completed Features
- Full CRUD operations for Users, Projects, and Tasks
- Real-time dashboard with statistics
- Task status tracking (Pending, In Progress, Completed)
- Deadline management with overdue warnings
- User assignment to projects and tasks
- Swagger API documentation
- Responsive design
- Form validation
- SQLite database with relationships

### 📊 Dashboard Statistics
- Total Projects count
- Total Tasks count
- Pending Tasks count
- Completed Tasks count

### 🎨 Visual Indicators
- **Green border**: Regular tasks
- **Red border**: Overdue tasks
- **Yellow badge**: Pending status
- **Blue badge**: In Progress status
- **Green badge**: Completed status

## Development Commands

### Backend
```bash
npm run start:dev   # Development with hot-reload
npm run build       # Build for production
npm run start:prod  # Run production build
```

### Frontend
```bash
npm run dev         # Development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## Project Structure

```
ACTIVITY7/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── users/    # User management
│   │   ├── projects/ # Project management
│   │   └── tasks/    # Task management
│   └── task-management.db  # SQLite database (auto-created)
│
├── frontend/         # React UI
│   └── src/
│       ├── components/  # React components
│       └── services/    # API services
│
├── README.md         # Full documentation
├── QUICKSTART.md     # This file
├── TODO.md          # Implementation checklist
├── setup.bat        # Windows setup script
└── setup.sh         # Linux/Mac setup script
```

## Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Visit Swagger UI at http://localhost:3000/api for API reference
- Review [TODO.md](TODO.md) for implementation details

---

**Happy Task Managing! 🎉**
