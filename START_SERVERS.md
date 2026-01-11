# 🚀 How to Start the Servers

## ⚠️ IMPORTANT: Correct Commands

### Backend Server
```bash
cd backend
npm run dev
```

### Frontend Server
```bash
cd frontend
npm start
```

## 📝 Step-by-Step Instructions

### 1. Install Dependencies (One-time setup)

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

### 2. Start Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

Wait for this message:
```
🚀 Application is running on: http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

### 3. Start Frontend Server

Open a **NEW** terminal (keep backend running) and run:
```bash
cd frontend
npm start
```

The frontend will automatically open in your browser. If port 3000 is already in use by the backend, it will use port 3001.

### 4. Access the Application

- **Frontend:** http://localhost:3000 (or http://localhost:3001 if backend is on 3000)
- **Swagger API:** http://localhost:3000/api

## 📋 Quick Reference

| Action | Command |
|--------|---------|
| Install backend deps | `cd backend && npm install` |
| Install frontend deps | `cd frontend && npm install` |
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm start` |
| View API docs | Open http://localhost:3000/api |
| View app | Open http://localhost:3000 or http://localhost:3001 |

## 💡 Tips

1. Always start the backend FIRST, then the frontend
2. Keep both terminals open while using the app
3. Press `Ctrl+C` to stop a server
4. If you get "port already in use" error, the frontend will automatically use the next available port
5. The frontend uses Create React App (not Vite)

## 🔧 Technology Stack

- **Backend:** NestJS + Node.js (Port 3000)
- **Frontend:** React + Create React App (Port 3000 or 3001)
- **Database:** SQLite (auto-created)
- **API Docs:** Swagger UI

---

**Need help?** Check QUICKSTART.md or README.md for more details!
