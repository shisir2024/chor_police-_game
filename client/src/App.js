import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");

function App() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [totalRounds, setTotalRounds] = useState(10);
  const [players, setPlayers] = useState([]);
  const [role, setRole] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [inRoom, setInRoom] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [isOperator, setIsOperator] = useState(false);
  const [operatorId, setOperatorId] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [maxRounds, setMaxRounds] = useState(10);
  const [myReady, setMyReady] = useState(false);
  const [emojiReactions, setEmojiReactions] = useState([]);

  useEffect(() => {
    socket.on("roomUpdate", (room) => {
      setPlayers(room.players);
      setInRoom(true);
      setOperatorId(room.operatorId);
      if (room.operatorId === socket.id) {
        setIsOperator(true);
      }
      if (room.totalRounds) {
        setMaxRounds(room.totalRounds);
      }
      const me = room.players.find(p => p.id === socket.id);
      if (me) setMyReady(me.ready);
    });

    socket.on("roundStarted", (room) => {
      const me = room.players.find(p => p.id === socket.id);
      setRole(me.role);
      setGameStarted(true);
      setPlayers(room.players);
      setCurrentRound(room.currentRound);
      setMaxRounds(room.totalRounds);
      setMyReady(false);
      setRoundResult(null);
    });

    socket.on("roundResult", (data) => {
      setPlayers(data.players);
      setRoundResult(data);
      setCurrentRound(data.currentRound);
    });

    socket.on("error", (msg) => {
      alert(msg);
    });

    socket.on("emojiReceived", (data) => {
      setEmojiReactions(prev => [...prev, data]);
      playEmojiSound(data.emoji);
      setTimeout(() => {
        setEmojiReactions(prev => prev.filter(e => e.timestamp !== data.timestamp));
      }, 3000);
    });

    return () => {
      socket.off("roomUpdate");
      socket.off("roundStarted");
      socket.off("roundResult");
      socket.off("error");
      socket.off("emojiReceived");
    };
  }, []);

  const createRoom = () => {
    if (!username || !roomId) {
      alert("Please enter name and room ID");
      return;
    }
    socket.emit("createRoom", { roomId, username, totalRounds });
    setIsOperator(true);
  };

  const joinRoom = () => {
    if (!username || !roomId) {
      alert("Please enter name and room ID");
      return;
    }
    socket.emit("joinRoom", { roomId, username });
  };

  const startRound = () => {
    socket.emit("startRound", roomId);
  };

  const markReady = () => {
    socket.emit("playerReady", { roomId });
    setMyReady(true);
  };

  const guessPlayer = (id) => {
    socket.emit("policeGuess", { roomId, guessedId: id });
  };

  const sendEmoji = (emoji) => {
    const player = players.find(p => p.id === socket.id);
    socket.emit("sendEmoji", { roomId, emoji, username: player?.username || username });
    playEmojiSound(emoji);
  };

  const playEmojiSound = (emoji) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different emojis
    const soundMap = {
      '😊': { freq: 523.25, duration: 0.2 }, // Happy - C5
      '😢': { freq: 293.66, duration: 0.4 }, // Sad - D4
      '😠': { freq: 220.00, duration: 0.3 }, // Angry - A3
      '😭': { freq: 261.63, duration: 0.5 }, // Cry - C4
      '😰': { freq: 349.23, duration: 0.25 }, // Nervous - F4
      '🤩': { freq: 659.25, duration: 0.2 }, // Excited - E5
      '🙏': { freq: 440.00, duration: 0.3 }  // Namaste - A4
    };

    const sound = soundMap[emoji] || { freq: 440, duration: 0.2 };
    
    oscillator.frequency.setValueAtTime(sound.freq, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  };

  const resetRound = () => {
    setRoundResult(null);
    setGameStarted(false);
  };

  const roleEmojis = {
    King: "👑",
    Queen: "👸",
    Police: "👮",
    Minister: "🧑‍💼",
    Chor: "🕵️"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-bold mb-8 text-amber-900" style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}>
        🎮 Chor Police Game
      </h1>

      {!inRoom ? (
        <div className="paper-card w-full max-w-md">
          <h2 className="text-2xl mb-4 font-bold text-center">Join Game</h2>
          
          <input 
            className="input-field"
            placeholder="Your Name" 
            value={username}
            onChange={e => setUsername(e.target.value)} 
          />
          
          <input 
            className="input-field"
            placeholder="Room ID (e.g., ROOM123)" 
            value={roomId}
            onChange={e => setRoomId(e.target.value.toUpperCase())} 
          />
          
          <div className="mb-4">
            <label className="block font-bold mb-2">Number of Rounds:</label>
            <select 
              className="input-field"
              value={totalRounds}
              onChange={e => setTotalRounds(Number(e.target.value))}
            >
              <option value={10}>10 Rounds</option>
              <option value={20}>20 Rounds</option>
              <option value={30}>30 Rounds</option>
              <option value={40}>40 Rounds</option>
            </select>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button className="btn flex-1" onClick={createRoom}>Create Room</button>
            <button className="btn flex-1" onClick={joinRoom}>Join Room</button>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded">
            <h3 className="font-bold mb-2">📜 Game Rules:</h3>
            <ul className="text-sm space-y-1">
              <li>👑 King: 5000 points</li>
              <li>👸 Queen: 4000 points</li>
              <li>🧑‍💼 Minister: 2000 points</li>
              <li>👮 Police: 1000 points</li>
              <li>🕵️ Chor: 0 points</li>
              <li className="mt-2 font-bold">Police must guess the Chor!</li>
              <li>❌ Wrong guess: Police loses 1000, Chor gains 1000</li>
            </ul>
          </div>
        </div>
      ) : !gameStarted ? (
        <div className="paper-card w-full max-w-md">
          {/* Emoji Reactions Display */}
          <div className="fixed top-20 right-4 z-50">
            {emojiReactions.map((reaction) => (
              <div key={reaction.timestamp} className="mb-2 animate-bounce">
                <div className="bg-white border-2 border-amber-300 rounded-lg p-2 shadow-lg">
                  <span className="text-3xl">{reaction.emoji}</span>
                  <span className="text-xs ml-2">{reaction.username}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl mb-4 font-bold text-center">Room: {roomId}</h2>
          {isOperator && <p className="text-center text-green-600 font-bold mb-2">👑 You are the Operator</p>}
          <p className="text-center mb-4">Total Rounds: {maxRounds}</p>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Players ({players.length}/5):</h3>
            {players.map((p, idx) => (
              <div key={p.id} className="bg-white p-2 mb-2 border-2 border-amber-200 rounded flex justify-between">
                <span>{idx + 1}. {p.username} {p.id === operatorId && '(Operator)'}</span>
                {p.ready && p.id !== operatorId && <span className="text-green-600 font-bold">✓ Ready</span>}
              </div>
            ))}
          </div>

          {players.length === 5 ? (
            <>
              {/* Emoji Reaction Bar in Waiting Room */}
              <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-200 rounded">
                <p className="text-sm font-bold mb-2 text-center">React:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <button onClick={() => sendEmoji("😊")} className="text-2xl hover:scale-125 transition cursor-pointer">😊</button>
                  <button onClick={() => sendEmoji("😢")} className="text-2xl hover:scale-125 transition cursor-pointer">😢</button>
                  <button onClick={() => sendEmoji("😠")} className="text-2xl hover:scale-125 transition cursor-pointer">😠</button>
                  <button onClick={() => sendEmoji("😭")} className="text-2xl hover:scale-125 transition cursor-pointer">😭</button>
                  <button onClick={() => sendEmoji("😰")} className="text-2xl hover:scale-125 transition cursor-pointer">😰</button>
                  <button onClick={() => sendEmoji("🤩")} className="text-2xl hover:scale-125 transition cursor-pointer">🤩</button>
                  <button onClick={() => sendEmoji("🙏")} className="text-2xl hover:scale-125 transition cursor-pointer">🙏</button>
                </div>
              </div>

              {!isOperator && !myReady && (
                <button className="btn w-full text-lg mb-2" onClick={markReady}>
                  ✓ I'm Ready
                </button>
              )}
              {isOperator && (
                <>
                  <button 
                    className="btn w-full text-lg" 
                    onClick={startRound}
                    disabled={currentRound > 0 && !players.filter(p => p.id !== operatorId).every(p => p.ready)}
                  >
                    🎮 Start Round {currentRound + 1}
                  </button>
                  {currentRound > 0 && !players.filter(p => p.id !== operatorId).every(p => p.ready) && (
                    <p className="text-center text-orange-600 mt-2">Waiting for other players to be ready...</p>
                  )}
                </>
              )}
            </>
          ) : (
            <p className="text-center text-gray-600">
              Waiting for {5 - players.length} more player(s)...
            </p>
          )}
        </div>
      ) : (
        <div className="paper-card w-full max-w-2xl">
          {/* Emoji Reactions Display */}
          <div className="fixed top-20 right-4 z-50">
            {emojiReactions.map((reaction, idx) => (
              <div key={reaction.timestamp} className="mb-2 animate-bounce">
                <div className="bg-white border-2 border-amber-300 rounded-lg p-2 shadow-lg">
                  <span className="text-3xl">{reaction.emoji}</span>
                  <span className="text-xs ml-2">{reaction.username}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Emoji Reaction Bar */}
          <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-200 rounded">
            <p className="text-sm font-bold mb-2 text-center">React:</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <button onClick={() => sendEmoji("😊")} className="text-2xl hover:scale-125 transition cursor-pointer">😊</button>
              <button onClick={() => sendEmoji("😢")} className="text-2xl hover:scale-125 transition cursor-pointer">😢</button>
              <button onClick={() => sendEmoji("😠")} className="text-2xl hover:scale-125 transition cursor-pointer">😠</button>
              <button onClick={() => sendEmoji("😭")} className="text-2xl hover:scale-125 transition cursor-pointer">😭</button>
              <button onClick={() => sendEmoji("😰")} className="text-2xl hover:scale-125 transition cursor-pointer">😰</button>
              <button onClick={() => sendEmoji("🤩")} className="text-2xl hover:scale-125 transition cursor-pointer">🤩</button>
              <button onClick={() => sendEmoji("🙏")} className="text-2xl hover:scale-125 transition cursor-pointer">🙏</button>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-lg mb-2">Round {currentRound} of {maxRounds}</p>
            <h2 className="text-3xl font-bold mb-2">
              Your Role: <span className={`role-badge role-${role}`}>
                {roleEmojis[role]} {role}
              </span>
            </h2>
          </div>

          {roundResult ? (
            <div className="mb-6 p-6 bg-amber-50 border-2 border-amber-300 rounded text-center">
              <h3 className="text-2xl font-bold mb-4">
                {roundResult.correctGuess ? "✅ Correct Guess!" : "❌ Wrong Guess!"}
              </h3>
              <p className="mb-4">
                The Chor was: <strong>{players.find(p => p.id === roundResult.chorId)?.username}</strong>
              </p>
              {roundResult.gameEnded ? (
                <div>
                  <h2 className="text-3xl font-bold mb-4">🏆 Game Over!</h2>
                  <button className="btn" onClick={() => window.location.reload()}>New Game</button>
                </div>
              ) : (
                <>
                  {!isOperator && !myReady && (
                    <button className="btn" onClick={markReady}>✓ Ready for Next Round</button>
                  )}
                  {isOperator && (
                    <button 
                      className="btn" 
                      onClick={resetRound}
                      disabled={!players.filter(p => p.id !== operatorId).every(p => p.ready)}
                    >
                      {players.filter(p => p.id !== operatorId).every(p => p.ready) ? 'Continue to Next Round' : 'Waiting for other players...'}
                    </button>
                  )}
                </>
              )}
            </div>
          ) : role === "Police" ? (
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded">
              <h3 className="text-xl font-bold mb-3 text-center">👮 Select who is the Chor:</h3>
              <div className="grid grid-cols-2 gap-2">
                {players.filter(p => p.role !== "Police").map(p => (
                  <button 
                    key={p.id} 
                    className="btn"
                    onClick={() => guessPlayer(p.id)}
                  >
                    {p.username}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-300 rounded text-center">
              <p className="text-lg">⏳ Waiting for Police to make a guess...</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold mb-3">🏆 Scoreboard:</h3>
            <div className="space-y-2">
              {players.sort((a, b) => b.score - a.score).map(p => (
                <div 
                  key={p.id} 
                  className={`p-3 border-2 rounded flex justify-between items-center ${
                    p.id === socket.id ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-amber-200'
                  }`}
                >
                  <span className="font-bold">{p.username}</span>
                  <span className="text-lg">
                    {p.roundScore !== undefined && (
                      <span className={p.roundScore > 0 ? 'text-green-600' : 'text-red-600'}>
                        {p.roundScore > 0 ? '+' : ''}{p.roundScore}
                      </span>
                    )}
                    {' '}
                    <span className="font-bold">({p.score})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
