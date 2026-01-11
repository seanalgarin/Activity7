#!/bin/bash

echo "========================================"
echo "Task Management System - Setup Script"
echo "========================================"
echo ""

echo "[1/4] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi
echo "Backend dependencies installed successfully!"
echo ""

echo "[2/4] Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi
echo "Frontend dependencies installed successfully!"
echo ""

cd ..

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Start Backend (in one terminal):"
echo "   cd backend"
echo "   npm run start:dev"
echo ""
echo "2. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Swagger API: http://localhost:3000/api"
echo ""
echo "========================================"
