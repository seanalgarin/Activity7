# 🚀 How to Start Your Task Management System

## ⚠️ IMPORTANT: You Must Start BOTH Servers!

The application has **TWO parts** that must run simultaneously:
1. **Backend Server** (NestJS API on port 3000)
2. **Frontend Server** (React UI on port 3000 or 3001)

If you only start the frontend, you'll see an error: **"Failed to load dashboard data. Make sure the backend is running."**

---

## 📋 Step-by-Step Startup Guide

### Step 1: Open TWO Terminal Windows

You need **two separate terminal windows** or tabs:
- Terminal 1: For the backend
- Terminal 2: For the frontend

### Step 2: Start the Backend Server (Terminal 1)

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm run dev
```

**Wait for this message:**
```
🚀 Application is running on: http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

✅ **Backend is now running!** Keep this terminal open.

### Step 3: Start the Frontend Server (Terminal 2)

**Open a NEW terminal** (don't close the backend terminal!)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Start the frontend server
npm start
```

The browser will automatically open to:
- http://localhost:3000 (if available)
- http://localhost:3001 (if port 3000 is used by backend)

✅ **Frontend is now running!** Keep this terminal open too.

---

## 🎯 Quick Commands

### Windows (PowerShell/CMD)

**Terminal 1 - Backend:**
```cmd
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm start
```

### Mac/Linux (Bash/Zsh)

**Terminal 1 - Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm start
```

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] Terminal 1 shows: "Application is running on: http://localhost:3000"
- [ ] Terminal 2 shows: React app compiled successfully
- [ ] Browser opens automatically to the application
- [ ] Dashboard loads without errors
- [ ] You can see "Task Management System" header

---

## 🐛 Troubleshooting

### Error: "Failed to load dashboard data"

**Cause:** Backend server is not running

**Solution:**
1. Check Terminal 1 - is the backend running?
2. If not, run `cd backend && npm run dev`
3. Wait for "Application is running" message
4. Refresh the browser

### Error: "Port 3000 is already in use"

**For Backend:**
```bash
# Stop any process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**For Frontend:**
- The frontend will automatically use port 3001 if 3000 is taken
- This is normal and expected!

### Error: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Backend won't start

**Check:**
1. Are you in the `backend` folder?
2. Did you run `npm install`?
3. Is Node.js installed? Check with `node --version`

### Frontend won't start

**Check:**
1. Are you in the `frontend` folder?
2. Did you run `npm install`?
3. Is the backend running first?

---

## 📊 What You Should See

### Terminal 1 (Backend):
```
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [RoutesResolver] UsersController {/users}
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [RoutesResolver] ProjectsController {/projects}
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [RoutesResolver] TasksController {/tasks}
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [NestApplication] Nest application successfully started
🚀 Application is running on: http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

### Terminal 2 (Frontend):
```
Compiled successfully!

You can now view task-management-frontend in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.1.x:3001

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

---

## 🎓 Understanding the Architecture

```
┌─────────────────────────────────────────┐
│         Your Browser                     │
│    http://localhost:3001                 │
│    (React Frontend - User Interface)     │
└──────────────┬──────────────────────────┘
               │
               │ API Calls (Axios)
               │
               ▼
┌─────────────────────────────────────────┐
│    Backend Server (NestJS)               │
│    http://localhost:3000                 │
│    - REST API Endpoints                  │
│    - Business Logic                      │
│    - Database Operations                 │
└──────────────┬──────────────────────────┘
               │
               │ TypeORM
               │
               ▼
┌─────────────────────────────────────────┐
│    SQLite Database                       │
│    task-management.db                    │
│    - Users, Projects, Tasks              │
└─────────────────────────────────────────┘
```

---

## 🔗 Important URLs

Once both servers are running:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3001 | Main application UI |
| Backend API | http://localhost:3000 | REST API endpoints |
| Swagger Docs | http://localhost:3000/api | Interactive API documentation |

---

## 💡 Pro Tips

1. **Keep both terminals visible** - Use split screen or tabs
2. **Check backend first** - Always verify backend is running before troubleshooting frontend
3. **Use Swagger** - Test API endpoints at http://localhost:3000/api
4. **Watch for errors** - Both terminals will show errors if something goes wrong
5. **Restart if needed** - Press `Ctrl+C` to stop, then restart with the commands above

---

## 🎉 Success!

If you see the Task Management System dashboard with:
- Navigation bar (Dashboard, Projects, Tasks, Users)
- Statistics cards (Total Projects, Total Tasks, etc.)
- No error messages

**Congratulations! Your application is running correctly!** 🎊

---

## 📞 Need More Help?

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for quick reference
- Check `MIGRATION_TO_CRA.md` for technical details about the frontend setup

---

**Remember: BOTH servers must be running for the application to work!**
