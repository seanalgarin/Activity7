@echo off
echo ========================================
echo   Task Management System Startup
echo ========================================
echo.

REM Kill any processes on ports 3000 and 3001
echo Cleaning up ports...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 >nul

echo.
echo Starting Backend Server (Port 3000)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting for backend to initialize...
timeout /t 5 >nul

echo.
echo Starting Frontend Server (Port 3001)...
set PORT=3001
start "Frontend Server" cmd /k "cd frontend && set PORT=3001 && npm start"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:3001
echo API Docs: http://localhost:3000/api
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:3001

echo.
echo Application is running!
echo Close this window or press Ctrl+C to stop all servers.
echo.
pause
