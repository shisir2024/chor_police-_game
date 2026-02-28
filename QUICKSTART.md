# 🚀 QUICK START GUIDE

## First Time Setup (Run Once)

### Option 1: Automatic Installation
Double-click: `install.bat`

### Option 2: Manual Installation
```bash
# Terminal 1
cd server
npm install

# Terminal 2
cd client
npm install
```

## Running the Game

### Option 1: Automatic Start
Double-click: `start.bat`

### Option 2: Manual Start
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

## Access the Game
Open browser: http://localhost:3000

## Testing with Multiple Players
1. Open 5 different browser tabs/windows
2. Each player enters their name
3. All use the same Room ID (e.g., "ROOM123")
4. First player clicks "Create Room"
5. Others click "Join Room"
6. When 5 players joined, click "Start Game"

## Troubleshooting

**Port already in use?**
- Kill process on port 5000: `npx kill-port 5000`
- Kill process on port 3000: `npx kill-port 3000`

**Socket connection failed?**
- Make sure backend is running first
- Check if http://localhost:5000 is accessible

**Dependencies error?**
- Delete `node_modules` folders
- Run `npm install` again

## Game Flow
1. Create/Join Room → Wait for 5 players
2. Start Game → Roles assigned randomly
3. Police selects suspect → Results shown
4. Scores updated → Continue playing

## Tips
- Use simple Room IDs like: ROOM1, TEST, GAME123
- Police has 4 choices (everyone except themselves)
- Keep track of scores across rounds
- Wrong guess = Police -1000, Chor +1000

---
Need help? Check README.md for full documentation!
