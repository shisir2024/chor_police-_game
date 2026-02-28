# ⚡ Quick Deploy: Render + Vercel

## 🎯 Deployment Strategy

```
┌─────────────────────────────────────────────┐
│  BACKEND (Node.js + Socket.io)              │
│  Deploy to: RENDER                          │
│  Why: Free tier, WebSocket support          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  FRONTEND (React App)                       │
│  Deploy to: VERCEL                          │
│  Why: Fast CDN, Always active, Auto-deploy  │
└─────────────────────────────────────────────┘
```

---

## 📋 3-Step Deployment

### STEP 1: Deploy Backend to Render (3 min)
```
1. Go to render.com
2. New Web Service
3. Connect: chor_police-_game
4. Settings:
   - Root: server
   - Build: npm install
   - Start: npm start
5. Deploy
6. Copy URL: https://xxx.onrender.com
```

### STEP 2: Update Frontend (1 min)
```
1. Edit client/src/App.js line 4:
   const socket = io("https://xxx.onrender.com");
2. git add .
3. git commit -m "Update socket URL"
4. git push
```

### STEP 3: Deploy Frontend to Vercel (2 min)
```
1. Go to vercel.com
2. Import Project
3. Select: chor_police-_game
4. Root Directory: client
5. Deploy
6. Get URL: https://yyy.vercel.app
```

---

## ✅ Settings Summary

### Render (Backend)
```yaml
Name: chor-police-backend
Root Directory: server
Build Command: npm install
Start Command: npm start
Runtime: Node
Instance: Free
```

### Vercel (Frontend)
```yaml
Name: chor-police-game
Root Directory: client
Framework: Create React App
Build Command: npm run build
Output Directory: build
```

---

## 🔗 Your URLs

```
Backend:  https://chor-police-backend.onrender.com
Frontend: https://chor-police-game.vercel.app
          ↑
          Share this with players!
```

---

## ⚠️ Important

### After Backend Deploy:
✅ Copy the Render URL
✅ Update it in `client/src/App.js`
✅ Push to GitHub before deploying frontend

### First Load:
⏳ Backend may take 30-60 seconds to wake up (free tier)
✅ After that, works normally

---

## 🎮 Test Your Game

```
1. Open: https://chor-police-game.vercel.app
2. Create room: TEST123
3. Open 4 more tabs
4. Join same room
5. Play!
```

---

## 🔄 Future Updates

```bash
# Make changes
git add .
git commit -m "Update"
git push

# Auto-deploys:
# ✅ Render (backend) - 2-3 min
# ✅ Vercel (frontend) - 1-2 min
```

---

## 💡 Why This Combo?

| Feature | Render | Vercel |
|---------|--------|--------|
| WebSocket | ✅ Yes | ❌ No |
| Always On | ❌ Sleeps | ✅ Yes |
| Speed | 🟡 Good | 🟢 Fast |
| Free Tier | 750h/mo | Unlimited |
| Best For | Backend | Frontend |

**Perfect combination!** 🎯

---

## 📞 Quick Help

**Backend not responding?**
→ Wait 60 seconds (waking up)

**Socket error?**
→ Check URL in App.js

**Build failed?**
→ Check logs on platform

---

**Full Guide**: See `DEPLOY_RENDER_VERCEL.md`

**Total Time**: ~6 minutes ⚡
