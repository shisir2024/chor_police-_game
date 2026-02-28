@echo off
echo Starting Chor Police Game...
echo.
echo Server will run on: http://localhost:5000
echo Client will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Chor Police Server" cmd /k "cd server && npm start"
timeout /t 3 /nobreak > nul
start "Chor Police Client" cmd /k "cd client && npm start"

echo.
echo Both servers are starting in separate windows...
echo.
pause
