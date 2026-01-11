@echo off
echo Testing API endpoints...
echo.

echo 1. Testing GET /users (should return empty array)
curl -X GET http://localhost:3000/users
echo.
echo.

echo 2. Creating a test user
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"
echo.
echo.

echo 3. Getting all users again
curl -X GET http://localhost:3000/users
echo.
echo.

echo API tests complete!
pause
