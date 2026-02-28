# 🚀 Deploy to Render + Vercel - Complete Guide

## 📋 What We'll Deploy:
- **Backend** → Render (Node.js server with Socket.io)
- **Frontend** → Vercel (React app)

---

## ✅ Prerequisites
- [x] GitHub account
- [x] Render account (render.com)
- [x] Vercel account (vercel.com)
- [x] Code already pushed to: https://github.com/shisir2024/chor_police-_game.git

---

# PART 1: Deploy Backend to Render

## Step 1: Go to Render
1. Visit **https://render.com**
2. Sign in with GitHub

## Step 2: Create New Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**

## Step 3: Connect Repository
1. Find repository: `chor_police-_game`
2. Click **"Connect"**

## Step 4: Configure Backend
Fill in these exact settings:

```
Name: chor-police-backend
Region: Singapore (or closest to you)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

## Step 5: Deploy Backend
1. Click **"Create Web Service"**
2. Wait 2-3 minutes
3. Watch the logs
4. When you see: ✅ **"Live"**

## Step 6: Copy Backend URL
- You'll see URL like: `https://chor-police-backend.onrender.com`
- **COPY THIS URL** - you need it for next step!

---

# PART 2: Update Frontend Code

## Step 1: Update Socket URL

You need to update `client/src/App.js` line 4:

**BEFORE:**
```js
const socket = io("http://localhost:5000");
```

**AFTER:**
```js
const socket = io("https://chor-police-backend.onrender.com");
```

Replace with YOUR actual backend URL from Render!

## Step 2: Push Changes to GitHub

```bash
cd c:\users\user\Documents\police_game
git add client/src/App.js
git commit -m "Update socket URL for production"
git push
```

---

# PART 3: Deploy Frontend to Vercel

## Step 1: Go to Vercel
1. Visit **https://vercel.com**
2. Sign up/Sign in with GitHub

## Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find: `chor_police-_game`
4. Click **"Import"**

## Step 3: Configure Project

**Framework Preset:** Create React App (auto-detected)

**Root Directory:** Click **"Edit"** → Select `client`

**Build Settings:**
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

**Environment Variables:** (None needed)

## Step 4: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Watch the build process
4. When done: 🎉 **"Congratulations!"**

## Step 5: Get Your Live URL
- Vercel gives you: `https://chor-police-game.vercel.app`
- **THIS IS YOUR GAME URL** - Share with friends!

---

# ✅ DEPLOYMENT COMPLETE!

## Your Live URLs:

```
Backend (Render):  https://chor-police-backend.onrender.com
Frontend (Vercel): https://chor-police-game.vercel.app
```

---

# 🎮 Test Your Game

1. Open: `https://chor-police-game.vercel.app`
2. Enter your name
3. Create room: "TEST123"
4. Open 4 more tabs/devices
5. Join same room
6. Play!

---

# 🔧 Troubleshooting

## Backend Issues (Render)

### "Application failed to respond"
- Wait 60 seconds (free tier wakes up slowly)
- Check Render logs: Dashboard → Service → Logs
- Verify build succeeded

### "Build failed"
- Check `server/package.json` exists
- Verify Root Directory is `server`
- Check Render logs for errors

## Frontend Issues (Vercel)

### "Socket connection failed"
- Verify socket URL in `App.js` matches Render backend URL
- Check backend is live (visit backend URL)
- Open browser console (F12) for errors

### "Blank page"
- Check Vercel deployment logs
- Verify Root Directory is `client`
- Ensure build command is correct

### "Build failed"
- Check `client/package.json` exists
- Verify all dependencies are listed
- Check Vercel logs for specific error

## General Issues

### "CORS error"
- Backend already has CORS enabled
- If issue persists, check backend logs

### "Room not found"
- Backend might be sleeping (free tier)
- Wait 30 seconds and try again
- Refresh the page

---

# 💡 Important Notes

## Free Tier Limitations

### Render (Backend):
- ⚠️ Sleeps after 15 minutes of inactivity
- ⚠️ First request takes 30-60 seconds to wake up
- ⚠️ 750 hours/month free

### Vercel (Frontend):
- ✅ Always active (no sleep)
- ✅ Fast global CDN
- ✅ Unlimited bandwidth for personal projects

## Performance Tips

1. **First Load**: May take 30-60 seconds (backend waking up)
2. **After Wake**: Game works normally
3. **Keep Alive**: Use UptimeRobot to ping backend every 10 min
4. **Upgrade**: Render paid plan ($7/month) for always-on backend

---

# 🔄 Update Your Deployed Game

## Make Changes Locally
```bash
# Edit your code
cd c:\users\user\Documents\police_game

# Test locally
cd server && npm start
cd client && npm start
```

## Push to GitHub
```bash
git add .
git commit -m "Your update description"
git push
```

## Auto-Deploy
- ✅ Render auto-deploys backend (2-3 min)
- ✅ Vercel auto-deploys frontend (1-2 min)

---

# 🌐 Custom Domain (Optional)

## For Vercel (Frontend):
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Domains
4. Add your domain
5. Follow DNS instructions

## For Render (Backend):
1. Go to Render Dashboard
2. Select your service
3. Settings → Custom Domain
4. Add your domain
5. Update DNS records

---

# 📊 Monitoring Your Game

## Check Backend Status (Render):
- Dashboard → Service → Logs
- See real-time server logs
- Monitor player connections

## Check Frontend Status (Vercel):
- Dashboard → Project → Deployments
- See build logs
- Monitor traffic

---

# 🎉 Share Your Game!

```
🎮 Chor Police - Online Multiplayer Game

Play Now: https://chor-police-game.vercel.app

📋 How to Play:
1. Enter your name
2. Create or join a room (use same Room ID)
3. Wait for 5 players (1 operator + 4 players)
4. Players click "Ready"
5. Operator starts the round
6. Police guesses the Chor
7. See scores and play multiple rounds!

Game Rules:
👑 King: 5000 points
👸 Queen: 4000 points
🧑💼 Minister: 2000 points
👮 Police: 1000 points
🕵️ Chor: 0 points

❌ Wrong guess: Police -1000, Chor +1000
✅ Correct guess: Everyone gets their role points

Rounds: 10, 20, 30, or 40 (operator chooses)
```

---

# 📞 Need Help?

## Render Support:
- Docs: https://render.com/docs
- Support: https://render.com/support

## Vercel Support:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

## Check Logs:
- **Render**: Dashboard → Service → Logs
- **Vercel**: Dashboard → Project → Deployments → View Logs

---

# ✅ Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Socket URL updated in App.js
- [ ] Changes pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL obtained
- [ ] Game tested with 5 players
- [ ] Both services showing "Live"
- [ ] Shared with friends!

---

**Congratulations! Your game is now live on Render + Vercel! 🚀🎮**

**Backend**: Render (Node.js + Socket.io)
**Frontend**: Vercel (React + Fast CDN)
**Best of both worlds!** ✨
