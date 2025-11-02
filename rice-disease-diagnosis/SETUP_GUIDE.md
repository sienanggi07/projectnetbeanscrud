# 🚀 Setup Guide - Rice Disease Diagnosis System

Complete guide to set up and run the web application.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** and npm installed
- **Python 3.8+** installed
- **pip** (Python package manager)
- Terminal/Command Prompt access

## 🔧 Step-by-Step Setup

### Step 1: Navigate to Project Directory

```bash
cd rice-disease-diagnosis
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install:
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)

### Step 3: Setup Python Backend

#### 3.1 Navigate to Backend Directory

```bash
cd backend
```

#### 3.2 Create Virtual Environment (Recommended)

**On Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### 3.3 Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- pandas (data processing)
- numpy (numerical computing)
- scikit-learn (machine learning)
- pydantic (data validation)

### Step 4: Verify Installation

#### Check Backend Files

Ensure these files exist in `backend/` directory:
- ✅ `main.py`
- ✅ `diagnosis_system.py`
- ✅ `models.py`
- ✅ `certainty_factor_rules.json`
- ✅ `dataset_penyakit_padi.csv`

#### Check Frontend Files

Ensure these files exist:
- ✅ `app/page.tsx`
- ✅ `app/diagnosis/page.tsx`
- ✅ `components/SymptomSelector.tsx`
- ✅ `components/DiagnosisResult.tsx`
- ✅ `.env.local`

## 🚀 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Backend is now running on:** `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

### Terminal 2: Start Frontend Server

Open a new terminal window:

```bash
# From project root
npm run dev
```

You should see:
```
▲ Next.js 16.0.1
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 2.3s
```

**Frontend is now running on:** `http://localhost:3000`

## 🧪 Testing the Application

### 1. Test Backend API

Open a new terminal and test the endpoints:

```bash
# Health check
curl http://localhost:8000/health

# Get symptoms
curl http://localhost:8000/api/symptoms

# Test diagnosis
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": {
      "daun_menguning": true,
      "bercak_coklat": true,
      "pertumbuhan_terhambat": true,
      "bercak_oval": true
    },
    "confidence": {
      "daun_menguning": 0.8,
      "bercak_coklat": 1.0,
      "pertumbuhan_terhambat": 0.8,
      "bercak_oval": 0.9
    }
  }'
```

### 2. Test Frontend

1. Open browser: `http://localhost:3000`
2. Click **"Mulai Diagnosa"**
3. Select symptoms (e.g., Daun Menguning, Bercak Coklat)
4. Adjust confidence sliders
5. Click **"Mulai Diagnosa"** button
6. View results with charts and scores

## 📊 Example Test Cases

### Test Case 1: Blas Disease

**Symptoms:**
- ✅ Daun Menguning (0.8)
- ✅ Bercak Coklat (1.0)
- ✅ Pertumbuhan Terhambat (0.8)
- ✅ Bercak Oval (0.9)

**Expected Result:** Blas

### Test Case 2: Tungro Disease

**Symptoms:**
- ✅ Daun Menguning (1.0)
- ✅ Daun Menggulung (0.8)
- ✅ Pertumbuhan Terhambat (0.9)
- ✅ Anakan Berkurang (0.8)

**Expected Result:** Tungro

### Test Case 3: Kresek Disease

**Symptoms:**
- ✅ Daun Menggulung (0.9)
- ✅ Daun Kering (0.8)
- ✅ Pertumbuhan Terhambat (0.7)
- ✅ Lendir Bakteri (1.0)

**Expected Result:** Kresek

## 🐛 Troubleshooting

### Problem: Backend won't start

**Solution:**
```bash
# Check if port 8000 is already in use
lsof -ti:8000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :8000   # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Problem: Frontend shows "Failed to diagnose"

**Solution:**
1. Ensure backend is running on port 8000
2. Check `.env.local` has correct API URL
3. Check browser console for CORS errors
4. Verify backend logs for errors

### Problem: Module not found errors

**Solution:**
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### Problem: TypeScript errors

**Solution:**
```bash
npm run build
```

If build succeeds, errors are just IDE warnings.

### Problem: Charts not displaying

**Solution:**
```bash
npm install recharts
```

## 🌐 Accessing the Application

### Local Development

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Network Access

To access from other devices on your network:

**Backend:**
```bash
# In main.py, change:
uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Frontend:**
```bash
npm run dev -- -H 0.0.0.0
```

Then access via your IP address:
- Frontend: `http://YOUR_IP:3000`
- Backend: `http://YOUR_IP:8000`

## 📦 Production Build

### Build Frontend

```bash
npm run build
npm start
```

### Run Backend in Production

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🔒 Security Notes

For production deployment:

1. **Update CORS settings** in `backend/main.py`:
   ```python
   allow_origins=["https://yourdomain.com"]
   ```

2. **Use environment variables** for sensitive data

3. **Enable HTTPS** for both frontend and backend

4. **Add authentication** if needed

## 📚 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **FastAPI Documentation:** https://fastapi.tiangolo.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Recharts:** https://recharts.org

## ✅ Verification Checklist

Before using the application, verify:

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8000/docs
- [ ] Health check returns `{"status": "healthy"}`
- [ ] Can select symptoms and get diagnosis
- [ ] Charts display correctly
- [ ] No console errors in browser

## 🎉 Success!

If all steps completed successfully, you should now have:

✅ Backend API running with ML models
✅ Frontend web application with interactive UI
✅ Ability to diagnose rice diseases
✅ Visual charts and detailed results

**Next Steps:**
1. Try different symptom combinations
2. Explore the API documentation
3. Customize the UI or add new features
4. Deploy to production (Vercel, Heroku, etc.)

---

**Need Help?** Check the main README.md or create an issue on GitHub.
