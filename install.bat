@echo off
echo ========================================
echo Installing Chor Police Game Dependencies
echo ========================================
echo.

echo [1/2] Installing Server Dependencies...
cd server
call npm install
cd ..

echo.
echo [2/2] Installing Client Dependencies...
cd client
call npm install
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the game:
echo 1. Open Terminal 1: cd server ^&^& npm start
echo 2. Open Terminal 2: cd client ^&^& npm start
echo.
pause
