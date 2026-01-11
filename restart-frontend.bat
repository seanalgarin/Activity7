@echo off
echo ========================================
echo Restarting Frontend Server
echo ========================================
echo.

cd frontend

echo Stopping any running frontend processes...
echo Please press Ctrl+C if prompted, then type Y and press Enter
echo.

echo Starting frontend server...
npm start

pause
