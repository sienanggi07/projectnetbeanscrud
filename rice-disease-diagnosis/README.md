# 🌾 Rice Disease Diagnosis System - Web Application

Sistem Pendukung Keputusan berbasis web untuk mendiagnosa penyakit tanaman padi menggunakan metode **Certainty Factor (CF)** dan **K-Nearest Neighbor (KNN)**.

## 🚀 Features

- ✅ **Hybrid AI Method**: Kombinasi Certainty Factor dan K-Nearest Neighbor
- ✅ **Interactive UI**: Symptom selection dengan confidence level sliders
- ✅ **Real-time Diagnosis**: Instant analysis dengan visualisasi hasil
- ✅ **Responsive Design**: Optimized untuk desktop dan mobile
- ✅ **6 Disease Detection**: Blas, Kresek, Tungro, Hawar Daun, Busuk Batang, Busuk Pelepah
- ✅ **15 Symptoms Analysis**: Comprehensive symptom checklist
- ✅ **Visual Charts**: Comparison charts menggunakan Recharts

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library

### Backend
- **FastAPI** - Modern Python web framework
- **scikit-learn** - Machine learning library
- **pandas & numpy** - Data processing
- **uvicorn** - ASGI server

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip

### 1. Clone Repository
```bash
cd rice-disease-diagnosis
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Setup Frontend

```bash
# From project root
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
python main.py
```

Backend will run on `http://localhost:8000`

API Documentation available at: `http://localhost:8000/docs`

### Start Frontend Development Server

```bash
# From project root
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
rice-disease-diagnosis/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── diagnosis/
│   │   └── page.tsx            # Diagnosis page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── SymptomSelector.tsx     # Symptom selection component
│   └── DiagnosisResult.tsx     # Result visualization component
├── lib/
│   ├── types.ts                # TypeScript types
│   └── api.ts                  # API client functions
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── diagnosis_system.py     # ML system implementation
│   ├── models.py               # Pydantic models
│   ├── requirements.txt        # Python dependencies
│   ├── certainty_factor_rules.json
│   └── dataset_penyakit_padi.csv
└── README.md
```

## 🔌 API Endpoints

### `POST /api/diagnose`
Diagnose disease based on symptoms

**Request Body:**
```json
{
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
}
```

**Response:**
```json
{
  "penyakit_final": "Blas",
  "hybrid_score": 0.8542,
  "cf_result": {
    "penyakit": "Blas",
    "score": 0.9872,
    "all_scores": [["Blas", 0.9872], ["Hawar_Daun", 0.4500]]
  },
  "knn_result": {
    "penyakit": "Blas",
    "probability": 0.7212
  }
}
```

### `GET /api/symptoms`
Get list of all symptoms

### `GET /api/diseases`
Get information about all diseases

### `GET /health`
Health check endpoint

## 🧪 Testing the Backend

### Using curl

```bash
# Test health endpoint
curl http://localhost:8000/health

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

# Get symptoms list
curl http://localhost:8000/api/symptoms

# Get diseases info
curl http://localhost:8000/api/diseases
```

### Using Python

```python
import requests

# Diagnose
response = requests.post('http://localhost:8000/api/diagnose', json={
    "symptoms": {
        "daun_menguning": True,
        "bercak_coklat": True,
        "pertumbuhan_terhambat": True,
        "bercak_oval": True
    },
    "confidence": {
        "daun_menguning": 0.8,
        "bercak_coklat": 1.0,
        "pertumbuhan_terhambat": 0.8,
        "bercak_oval": 0.9
    }
})

print(response.json())
```

## 🎯 Usage Guide

1. **Open Application**: Navigate to `http://localhost:3000`
2. **Click "Mulai Diagnosa"**: Go to diagnosis page
3. **Select Symptoms**: Check symptoms observed on rice plants
4. **Adjust Confidence**: Use sliders to set confidence level (0.2 - 1.0)
5. **Diagnose**: Click "Mulai Diagnosa" button
6. **View Results**: See diagnosis with CF and KNN comparison
7. **New Diagnosis**: Click "Diagnosa Baru" to start over

## 🌾 Supported Diseases

1. **Blas** - Pyricularia oryzae (fungal)
2. **Kresek** - Xanthomonas oryzae (bacterial)
3. **Tungro** - Tungro virus
4. **Hawar Daun** - Rhizoctonia solani (fungal)
5. **Busuk Batang** - Stem rot
6. **Busuk Pelepah** - Sarocladium oryzae (fungal)

## 📊 Symptoms List

1. Daun Menguning (Yellowing leaves)
2. Bercak Coklat (Brown spots)
3. Daun Menggulung (Curling leaves)
4. Pertumbuhan Terhambat (Stunted growth)
5. Batang Busuk (Rotten stem)
6. Bulir Hampa (Empty grains)
7. Bercak Putih (White spots)
8. Daun Kering (Dry leaves)
9. Akar Busuk (Rotten roots)
10. Anakan Berkurang (Reduced tillers)
11. Malai Tidak Keluar (Panicle not emerging)
12. Bercak Oval (Oval spots)
13. Lendir Bakteri (Bacterial ooze)
14. Hawar Daun (Leaf blight)
15. Bau Busuk (Rotten smell)

## 🔧 Configuration

### Backend Configuration

Edit `backend/certainty_factor_rules.json` to adjust:
- CF expert values
- Disease thresholds
- Symptom weights

### Frontend Configuration

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update to your backend URL.

## 📝 Development

### Build for Production

```bash
# Frontend
npm run build
npm start

# Backend
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

### Linting

```bash
npm run lint
```

## 🐛 Troubleshooting

### Backend not connecting
- Ensure Python backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify `.env.local` has correct API URL

### Module not found errors
- Run `pip install -r requirements.txt` in backend
- Run `npm install` in project root

### Chart not displaying
- Ensure recharts is installed: `npm install recharts`
- Check browser console for errors

## 📄 License

This project is created for educational and research purposes.

## 👨‍💻 Credits

- **Dataset**: Synthetic data based on common rice diseases
- **Methods**: Certainty Factor (Shortliffe & Buchanan, 1975) and K-Nearest Neighbor (Cover & Hart, 1967)
- **Reference**: Balai Besar Penelitian Tanaman Padi - Kementerian Pertanian RI

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Note**: This is a demonstration system using synthetic data. For production use, validate with real field data and agricultural experts.
