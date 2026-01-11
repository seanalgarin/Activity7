# 🔧 Troubleshooting Guide - Task Management System

## Common Issues and Solutions

### ❌ Error: "Failed to load dashboard data. Make sure the backend is running."

This error means the frontend cannot connect to the backend API.

#### Solution Steps:

**Step 1: Verify Backend is Running**
```bash
# Check if backend is running
curl http://localhost:3000/users
```
- ✅ If you get `[]` or data: Backend is running
- ❌ If you get connection error: Backend is NOT running

**Step 2: Start Backend (if not running)**
```bash
cd backend
npm run dev
```
Wait for: `🚀 Application is running on: http://localhost:3000`

**Step 3: Verify Frontend is Running**
- Check if browser is open at `http://localhost:3001` or `http://localhost:3000`
- If not, start frontend:
```bash
cd frontend
npm start
```

**Step 4: Check CORS Configuration**
- The backend CORS is now configured for ports 3000 and 3001
- If you changed ports, update `backend/src/main.ts`

**Step 5: Refresh Browser**
- After both servers are running, refresh the browser
- Clear cache if needed (Ctrl+Shift+R or Cmd+Shift+R)

---

### ❌ Error: "Port 3000 is already in use"

#### For Backend:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

#### For Frontend:
- Frontend will automatically use port 3001 if 3000 is taken
- This is normal and expected!

---

### ❌ Backend won't start / Module not found errors

**Solution:**
```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

---

### ❌ Frontend won't start / Module not found errors

**Solution:**
```bash
cd frontend
rm -rf node_modules
npm install
npm start
```

---

### ❌ Database errors

**Solution:**
```bash
# Delete the database file and let it recreate
cd backend
rm task-management.db
npm run dev
```

---

### ❌ CORS errors in browser console

**Check:**
1. Backend `main.ts` has correct CORS origins
2. Frontend is accessing the correct API URL
3. Both servers are running

**Current Configuration:**
- Backend CORS: `['http://localhost:3000', 'http://localhost:3001']`
- Frontend API: `http://localhost:3000`

---

### ❌ "Cannot GET /" error

This means you're accessing the backend URL directly in the browser.

**Solution:**
- Frontend: `http://localhost:3001` (or 3000)
- Backend API: `http://localhost:3000` (for API calls only)
- Swagger Docs: `http://localhost:3000/api`

---

### ❌ Changes not reflecting in browser

**Solution:**
1. Save all files
2. Wait for compilation (check terminal)
3. Hard refresh browser (Ctrl+Shift+R)
4. Clear browser cache
5. Restart development server if needed

---

### ❌ Swagger UI not loading

**Check:**
1. Backend is running
2. Access: `http://localhost:3000/api`
3. Not: `http://localhost:3001/api`

---

## Verification Checklist

Before reporting issues, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] npm is installed (`npm --version`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Backend is running (`cd backend && npm run dev`)
- [ ] Frontend is running (`cd frontend && npm start`)
- [ ] Backend shows: "Application is running on: http://localhost:3000"
- [ ] Frontend shows: "webpack compiled successfully"
- [ ] Browser is open at `http://localhost:3001` (or 3000)
- [ ] No CORS errors in browser console (F12)

---

## Quick Test Commands

### Test Backend API:
```bash
# Test users endpoint
curl http://localhost:3000/users

# Test projects endpoint
curl http://localhost:3000/projects

# Test tasks endpoint
curl http://localhost:3000/tasks
```

All should return `[]` (empty array) if working correctly.

### Test Frontend:
1. Open browser to `http://localhost:3001`
2. Open DevTools (F12)
3. Check Console tab for errors
4. Check Network tab for failed requests

---

## Port Configuration

| Service | Default Port | Alternative |
|---------|-------------|-------------|
| Backend | 3000 | - |
| Frontend | 3000 | 3001 (if 3000 taken) |
| Swagger | 3000/api | - |

---

## Still Having Issues?

1. **Check both terminal windows** - Look for error messages
2. **Check browser console** (F12) - Look for network errors
3. **Verify file paths** - Make sure you're in the correct directory
4. **Restart everything**:
   ```bash
   # Stop all servers (Ctrl+C in both terminals)
   # Then restart:
   
   # Terminal 1:
   cd backend && npm run dev
   
   # Terminal 2:
   cd frontend && npm start
   ```

---

## Success Indicators

### Backend Terminal Should Show:
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [RoutesResolver] UsersController {/users}
[Nest] LOG [RoutesResolver] ProjectsController {/projects}
[Nest] LOG [RoutesResolver] TasksController {/tasks}
🚀 Application is running on: http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

### Frontend Terminal Should Show:
```
Compiled successfully!

You can now view task-management-frontend in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.x.x:3001

webpack compiled successfully
```

### Browser Should Show:
- Task Management System header
- Navigation: Dashboard, Projects, Tasks, Users
- Statistics cards with numbers
- No error messages
- Modern blue and white design

---

## Need More Help?

- Check `HOW_TO_START.md` for detailed startup instructions
- Check `README.md` for project documentation
- Check `QUICKSTART.md` for quick reference

---

**Remember: Both backend AND frontend must be running simultaneously!**
