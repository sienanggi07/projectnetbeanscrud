# ⚡ Quick Start Guide

Get the Rice Disease Diagnosis System running in 5 minutes!

## 📋 Prerequisites

- Node.js 18+ installed
- Python 3.8+ installed
- Terminal/Command Prompt

## 🚀 Installation (2 minutes)

### Step 1: Install Frontend Dependencies
```bash
cd rice-disease-diagnosis
npm install
```

### Step 2: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
# or: pip3 install -r requirements.txt
# or: python3 -m pip install -r requirements.txt
```

## ▶️ Running (1 minute)

### Terminal 1: Start Backend
```bash
cd backend
python main.py
```
✅ Backend running at: http://localhost:8000

### Terminal 2: Start Frontend
```bash
# From project root
npm run dev
```
✅ Frontend running at: http://localhost:3000

## 🎯 Using the App (2 minutes)

1. **Open Browser:** http://localhost:3000
2. **Click:** "Mulai Diagnosa" button
3. **Select Symptoms:** Check boxes for observed symptoms
4. **Adjust Confidence:** Use sliders (0.2 - 1.0)
5. **Diagnose:** Click "Mulai Diagnosa" button
6. **View Results:** See disease diagnosis with charts

## 🧪 Quick Test

Try this example:

**Symptoms:**
- ✅ Daun Menguning (0.8)
- ✅ Bercak Coklat (1.0)
- ✅ Pertumbuhan Terhambat (0.8)
- ✅ Bercak Oval (0.9)

**Expected Result:** Blas disease

## 🔍 Verify Installation

### Check Backend
```bash
curl http://localhost:8000/health
```
Should return: `{"status":"healthy"}`

### Check Frontend
Open: http://localhost:3000
Should see: Landing page with "Mulai Diagnosa" button

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start?
```bash
# Check Node version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Can't connect to backend?
1. Ensure backend is running on port 8000
2. Check `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Restart both servers

## 📚 More Information

- **Full Setup Guide:** See `SETUP_GUIDE.md`
- **Features:** See `FEATURES.md`
- **API Docs:** http://localhost:8000/docs (when backend running)
- **Main README:** See `README.md`

## ✅ Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can access landing page
- [ ] Can select symptoms
- [ ] Can get diagnosis results
- [ ] Charts display correctly

## 🎉 You're Ready!

Start diagnosing rice diseases with AI-powered analysis!

---

**Need Help?** Check the full documentation or create an issue.
