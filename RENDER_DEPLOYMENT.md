# 🚀 Deploy to Render - Step by Step Guide

## 📋 Prerequisites
- GitHub account
- Render account (free at render.com)
- Your game working locally

---

## PART 1: Push Code to GitHub

### Step 1: Initialize Git (if not done)
```bash
cd c:\users\user\Documents\police_game
git init
git add .
git commit -m "Initial commit - Chor Police Game"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `chor-police-game`
3. Make it **Public**
4. Click **"Create repository"**

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/chor-police-game.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## PART 2: Deploy Backend to Render

### Step 1: Go to Render
1. Visit https://render.com
2. Sign up or log in (use GitHub to sign in)

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### Step 3: Connect GitHub Repository
1. Click **"Connect account"** if needed
2. Find and select your `chor-police-game` repository
3. Click **"Connect"**

### Step 4: Configure Backend Service
Fill in these settings:

**Basic Settings:**
- **Name**: `chor-police-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (for testing)

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll see build logs
4. When done, you'll see: ✅ **"Live"**

### Step 6: Copy Your Backend URL
- Look for the URL at the top: `https://chor-police-backend.onrender.com`
- **COPY THIS URL** - you'll need it next!

---

## PART 3: Update Frontend for Production

### Step 1: Update Socket URL in App.js

Open `client/src/App.js` and change line 4:

**BEFORE:**
```js
const socket = io("http://localhost:5000");
```

**AFTER:**
```js
const socket = io("https://chor-police-backend.onrender.com");
```

Replace with YOUR actual Render backend URL!

### Step 2: Commit and Push Changes
```bash
git add client/src/App.js
git commit -m "Update socket URL for production"
git push
```

---

## PART 4: Deploy Frontend to Render

### Step 1: Create Another Web Service
1. Go back to Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Select same repository: `chor-police-game`

### Step 2: Configure Frontend Service
Fill in these settings:

**Basic Settings:**
- **Name**: `chor-police-frontend`
- **Region**: Same as backend
- **Branch**: `main`
- **Root Directory**: `client`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s build -l $PORT`

**Instance Type:**
- Select **"Free"**

### Step 3: Add Environment Variable (Important!)
1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `NODE_VERSION`
   - **Value**: `18`

### Step 4: Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes
3. When done: ✅ **"Live"**

### Step 5: Get Your Game URL
- Your game is now live at: `https://chor-police-frontend.onrender.com`
- **SHARE THIS URL** with friends to play!

---

## ✅ DEPLOYMENT COMPLETE!

### Your Live URLs:
- **Backend**: `https://chor-police-backend.onrender.com`
- **Frontend**: `https://chor-police-frontend.onrender.com`

### Test Your Deployed Game:
1. Open the frontend URL
2. Create a room
3. Open 4 more tabs/devices
4. Join the same room
5. Play!

---

## 🔧 Troubleshooting

### Issue: "Application failed to respond"
**Solution**: 
- Check Render logs (click on service → Logs tab)
- Verify backend is running
- Wait 30 seconds (free tier takes time to wake up)

### Issue: "Socket connection failed"
**Solution**:
- Verify socket URL in App.js matches your backend URL
- Check backend is deployed and live
- Open browser console (F12) to see errors

### Issue: Frontend shows blank page
**Solution**:
- Check Render logs for build errors
- Verify build command is correct
- Try redeploying

### Issue: "Service Unavailable"
**Solution**:
- Free tier sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up
- Just wait and refresh

---

## 💡 Important Notes

### Free Tier Limitations:
- ⚠️ Backend sleeps after 15 minutes of inactivity
- ⚠️ First request takes 30-60 seconds to wake up
- ⚠️ 750 hours/month free (enough for testing)

### To Keep Backend Always Active:
- Upgrade to paid plan ($7/month)
- Or use a service like UptimeRobot to ping every 10 minutes

### Custom Domain (Optional):
1. Go to service settings
2. Click "Custom Domain"
3. Add your domain
4. Follow DNS instructions

---

## 🎉 You're Live!

Share your game with friends:
```
🎮 Play Chor Police Game Online!
https://chor-police-frontend.onrender.com

📋 How to Play:
1. Enter your name
2. Create or join a room (use same Room ID)
3. Wait for 5 players
4. Operator starts the game
5. Have fun!
```

---

## 🔄 Future Updates

To update your deployed game:
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push

# Render auto-deploys on push!
```

---

## 📞 Need Help?

If deployment fails:
1. Check Render logs (very helpful!)
2. Verify all commands are correct
3. Check GitHub repository is public
4. Ensure all files are pushed to GitHub

---

**Congratulations! Your game is now live! 🚀🎮**
