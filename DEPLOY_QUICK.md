# ⚡ Quick Deployment Checklist

## ✅ Step-by-Step (5 Minutes)

### 1️⃣ Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chor-police-game.git
git push -u origin main
```

### 2️⃣ Deploy Backend (Render)
- Go to render.com → New Web Service
- Connect GitHub repo
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- Deploy → Copy URL

### 3️⃣ Update Frontend
Edit `client/src/App.js` line 4:
```js
const socket = io("https://YOUR-BACKEND-URL.onrender.com");
```

Push changes:
```bash
git add .
git commit -m "Update socket URL"
git push
```

### 4️⃣ Deploy Frontend (Render)
- Render → New Web Service
- Same repo
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s build -l $PORT`
- Add env var: `NODE_VERSION` = `18`
- Deploy!

### 5️⃣ Done! 🎉
Your game is live at: `https://YOUR-FRONTEND-URL.onrender.com`

---

## 📝 Backend Settings Summary
```
Name: chor-police-backend
Root Directory: server
Build Command: npm install
Start Command: npm start
Runtime: Node
```

## 📝 Frontend Settings Summary
```
Name: chor-police-frontend
Root Directory: client
Build Command: npm install && npm run build
Start Command: npx serve -s build -l $PORT
Runtime: Node
Environment: NODE_VERSION = 18
```

---

## 🔗 Important URLs

**After Backend Deploy:**
- Copy: `https://chor-police-backend.onrender.com`
- Update in: `client/src/App.js`

**After Frontend Deploy:**
- Share: `https://chor-police-frontend.onrender.com`

---

## ⚠️ Common Issues

**Backend not responding?**
- Wait 30-60 seconds (free tier wakes up slowly)

**Socket connection failed?**
- Check socket URL in App.js matches backend URL
- Verify backend is live (visit backend URL)

**Build failed?**
- Check Render logs
- Verify Root Directory is correct
- Ensure package.json exists in that directory

---

## 💡 Pro Tips

1. **Test locally first** - Make sure game works before deploying
2. **Use same region** - Deploy both services in same region
3. **Check logs** - Render logs show all errors
4. **Free tier sleeps** - First request takes time to wake up
5. **Auto-deploy** - Push to GitHub = auto-deploy on Render

---

**See RENDER_DEPLOYMENT.md for detailed instructions!**
