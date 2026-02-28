# 🎮 Chor Police Game - Online Multiplayer

A real-time multiplayer game built with MERN Stack + Socket.io featuring a beautiful paper-style UI.

## 🎯 Game Rules

**5 Players, 5 Roles:**
- 👑 **King**: 5000 points
- 👸 **Queen**: 4000 points
- 🧑💼 **Minister**: 2000 points
- 👮 **Police**: 1000 points
- 🕵️ **Chor**: 0 points

**Gameplay:**
1. Roles are randomly assigned
2. Police must guess who the Chor is
3. If Police guesses correctly: Everyone gets their role points
4. If Police guesses wrong: Police loses 1000, Chor gains +1000

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

**1. Install Server Dependencies:**
```bash
cd server
npm install
```

**2. Install Client Dependencies:**
```bash
cd client
npm install
```

### Running Locally

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
Client runs on: http://localhost:3000

## 🎮 How to Play

1. Open http://localhost:3000
2. Enter your name and a room ID
3. Click "Create Room" or "Join Room"
4. Wait for 5 players to join
5. Click "Start Game"
6. If you're Police, select who you think is the Chor
7. See results and scores!

## 📁 Project Structure

```
chor-police-game/
├── server/
│   ├── server.js          # Socket.io backend
│   └── package.json
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main game component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Paper-style UI
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🌍 Deployment

### Backend (Render/Railway)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repo
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Deploy!

### Frontend (Vercel/Netlify)

1. Update socket URL in `client/src/App.js`:
   ```js
   const socket = io("https://your-backend-url.com");
   ```
2. Push to GitHub
3. Import project to Vercel
4. Set root directory: `client`
5. Deploy!

## 🎨 Features

✅ Real-time multiplayer with Socket.io
✅ Beautiful paper-style UI
✅ Role-based gameplay
✅ Score tracking
✅ Room system
✅ Responsive design
✅ Emoji indicators

## 🔧 Tech Stack

**Frontend:**
- React
- Socket.io-client
- Tailwind CSS

**Backend:**
- Node.js
- Express
- Socket.io

## 🚀 Future Improvements

- [ ] Add timer for Police decision
- [ ] Multi-round gameplay
- [ ] Sound effects
- [ ] Animations (card flip)
- [ ] Chat system
- [ ] User authentication
- [ ] Leaderboard
- [ ] Mobile app version

## 📝 License

MIT License - Feel free to use for learning!

---

Made with ❤️ using MERN Stack
