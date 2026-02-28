const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://chor-police-game.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    message: "Chor Police Game Backend",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  },
});

let rooms = {};

const rolePoints = {
  King: 5000,
  Queen: 4000,
  Police: 1000,
  Minister: 2000,
  Chor: 0,
};

const roles = ["King", "Queen", "Police", "Minister", "Chor"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createRoom", ({ roomId, username, totalRounds }) => {
    rooms[roomId] = {
      players: [],
      operatorId: socket.id,
      totalRounds: totalRounds || 10,
      currentRound: 0,
      gameStarted: false,
    };

    rooms[roomId].players.push({
      id: socket.id,
      username,
      role: null,
      score: 0,
      ready: false,
    });

    socket.join(roomId);
    io.to(roomId).emit("roomUpdate", rooms[roomId]);
    console.log(`Room ${roomId} created by ${username}`);
  });

  socket.on("joinRoom", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      socket.emit("error", "Room not found");
      return;
    }

    if (rooms[roomId].players.length >= 5) {
      socket.emit("error", "Room is full");
      return;
    }

    rooms[roomId].players.push({
      id: socket.id,
      username,
      role: null,
      score: 0,
      ready: false,
    });

    socket.join(roomId);
    io.to(roomId).emit("roomUpdate", rooms[roomId]);
    console.log(`${username} joined room ${roomId}`);
  });

  socket.on("playerReady", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (player) {
      player.ready = true;
      io.to(roomId).emit("roomUpdate", room);
    }
  });

  socket.on("startRound", (roomId) => {
    const room = rooms[roomId];
    if (!room || room.players.length !== 5) return;
    if (socket.id !== room.operatorId) return;

    // Check if all non-operator players are ready
    const allOthersReady = room.players
      .filter(p => p.id !== room.operatorId)
      .every(p => p.ready);
    
    if (!allOthersReady && room.currentRound > 0) return;

    room.currentRound++;
    room.gameStarted = true;

    const shuffledRoles = shuffle([...roles]);
    room.players.forEach((player, index) => {
      player.role = shuffledRoles[index];
      player.ready = false;
    });

    io.to(roomId).emit("roundStarted", room);
    console.log(`Round ${room.currentRound} started in room ${roomId}`);
  });

  socket.on("policeGuess", ({ roomId, guessedId }) => {
    const room = rooms[roomId];
    if (!room) return;

    const police = room.players.find(p => p.role === "Police");
    const chor = room.players.find(p => p.role === "Chor");

    room.players.forEach(p => {
      p.roundScore = rolePoints[p.role];
      p.score += rolePoints[p.role];
    });

    if (guessedId !== chor.id) {
      police.roundScore = 0;
      police.score -= 1000;
      chor.roundScore += 1000;
      chor.score += 1000;
    }

    const gameEnded = room.currentRound >= room.totalRounds;

    io.to(roomId).emit("roundResult", {
      players: room.players,
      correctGuess: guessedId === chor.id,
      chorId: chor.id,
      currentRound: room.currentRound,
      totalRounds: room.totalRounds,
      gameEnded
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    
    for (let roomId in rooms) {
      const room = rooms[roomId];
      room.players = room.players.filter(p => p.id !== socket.id);
      
      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        io.to(roomId).emit("roomUpdate", room);
      }
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`🚀 Server running on port ${process.env.PORT || 5000}`));
