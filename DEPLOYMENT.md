# 🌍 DEPLOYMENT GUIDE

## Step-by-Step Deployment Instructions

---

## 🔧 PART 1: Deploy Backend (Render)

### Step 1: Prepare GitHub Repository
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - Chor Police Game"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/chor-police-game.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `chor-police-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Click **"Create Web Service"**
6. Wait for deployment (2-3 minutes)
7. **Copy your backend URL**: `https://chor-police-backend.onrender.com`

### Alternative: Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Configure:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
5. Deploy and copy the URL

---

## 💻 PART 2: Update Frontend for Production

### Step 1: Update Socket URL

Open `client/src/App.js` and change line 4:

```js
// BEFORE (Local):
const socket = io("http://localhost:5000");

// AFTER (Production):
const socket = io("https://chor-police-backend.onrender.com");
```

Replace with YOUR actual backend URL!

### Step 2: Commit Changes
```bash
git add client/src/App.js
git commit -m "Update socket URL for production"
git push
```

---

## 🚀 PART 3: Deploy Frontend (Vercel)

### Step 1: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. Get your live URL: `https://chor-police-game.vercel.app`

### Alternative: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub and select repo
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`
5. Deploy!

---

## ✅ PART 4: Test Your Live Game

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Open 5 different browser tabs/devices
3. Create a room with Room ID: `TEST123`
4. Join with 5 players
5. Start game and test!

---

## 🔥 Quick Deploy Commands

### For Backend (Render)
```
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### For Frontend (Vercel)
```
Root Directory: client
Build Command: npm run build
Output Directory: build
```

---

## 🐛 Troubleshooting

### Issue: "Socket connection failed"
**Solution**: 
- Check if backend is running (visit backend URL)
- Verify socket URL in App.js is correct
- Check CORS settings (already configured)

### Issue: "Application error" on Render
**Solution**:
- Check Render logs
- Verify package.json has correct start script
- Ensure Node version compatibility

### Issue: "Build failed" on Vercel
**Solution**:
- Check if root directory is set to `client`
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Issue: "Room not found"
**Solution**:
- Backend might be sleeping (free tier)
- Wait 30 seconds and try again
- Check backend logs on Render

---

## 💡 Pro Tips

1. **Free Tier Limitations**:
   - Render free tier sleeps after 15 min inactivity
   - First request takes 30-60 seconds to wake up
   - Consider upgrading for production use

2. **Custom Domain**:
   - Vercel: Settings → Domains → Add custom domain
   - Render: Settings → Custom Domain

3. **Environment Variables**:
   - Add `PORT` variable on Render (auto-set)
   - Add backend URL as env var on Vercel (optional)

4. **Monitoring**:
   - Check Render logs for backend issues
   - Check Vercel logs for frontend issues
   - Use browser console for debugging

---

## 📊 Deployment Checklist

- [ ] Backend deployed on Render/Railway
- [ ] Backend URL copied
- [ ] Socket URL updated in App.js
- [ ] Changes committed and pushed
- [ ] Frontend deployed on Vercel/Netlify
- [ ] Live URL obtained
- [ ] Tested with 5 players
- [ ] Game works end-to-end

---

## 🎉 You're Live!

Share your game URL with friends:
```
🎮 Play Chor Police Game:
https://your-app.vercel.app

📋 Instructions:
1. Enter your name
2. Use Room ID: GAME123
3. Wait for 5 players
4. Start and enjoy!
```

---

## 🔄 Future Updates

To update your deployed app:
```bash
# Make changes to code
git add .
git commit -m "Your update message"
git push

# Vercel and Render auto-deploy on push!
```

---

**Need help?** Check VERIFICATION.md for detailed testing steps!

🚀 Happy Gaming! 🎮
