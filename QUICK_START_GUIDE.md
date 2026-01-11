# 🚀 Quick Start Guide - Activity7

## Prerequisites Check
- ✅ Node.js installed (v14+)
- ✅ npm installed (v6+)

## 🏃 Fast Setup (5 minutes)

### Step 1: Install Dependencies

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for the message:
```
═══════════════════════════════════════════════════════════
Task Management System API v1.0.0
═══════════════════════════════════════════════════════════
Environment: DEVELOPMENT
Server: Running on port 3000
API Documentation: Available at /api endpoint
CORS: Enabled for 2 origin(s)
═══════════════════════════════════════════════════════════
Server is ready to accept connections
═══════════════════════════════════════════════════════════
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The browser will automatically open to `http://localhost:3000` (or 3001)

### Step 3: Start Using the App

1. **Create Users** - Click "Users" tab → "+ New User"
2. **Create Projects** - Click "Projects" tab → "+ New Project"
3. **Create Tasks** - Click "Tasks" tab → "+ New Task"
4. **View Dashboard** - See all your data in one place

## 🎯 Quick Test

### Test the API (Optional)
Open your browser to: `http://localhost:3000/api`

This opens Swagger documentation where you can test all endpoints.

### Test the Frontend
1. Navigate to Users tab
2. Click "+ New User"
3. Fill in:
   - Name: "John Doe"
   - Email: "john@example.com"
4. Click "Create User"
5. ✅ User should appear in the list!

## 📋 Task Status Options

When creating tasks, you have 3 status options:
- ⏳ **Pending** - Task not started
- 🔄 **In Progress** - Task being worked on
- ✅ **Completed** - Task finished

## 🔧 Configuration (Optional)

### Backend Configuration
Edit `backend/.env`:
```env
PORT=3000
NODE_ENV=development
APP_NAME=Task Management System API
APP_VERSION=1.0.0
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Frontend Configuration
Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_NAME=Task Management System
REACT_APP_VERSION=1.0.0
```

## ❓ Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
# Windows:
netstat -ano | findstr :3000

# Mac/Linux:
lsof -ti:3000
```

### Frontend won't start
- Make sure backend is running first
- Frontend will use port 3001 if 3000 is taken (this is normal!)

### "Cannot connect to server" error
1. Verify backend is running (check Terminal 1)
2. Check backend shows "Server is ready to accept connections"
3. Refresh the browser

## 🎉 You're Ready!

Your Activity7 Task Management System is now running!

**Access Points:**
- 🖥️ Frontend: http://localhost:3000 (or 3001)
- 🔌 Backend API: http://localhost:3000
- 📚 API Docs: http://localhost:3000/api

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details
- Review [TODO.md](TODO.md) for completed features

---

**Need help?** Check the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) file!
