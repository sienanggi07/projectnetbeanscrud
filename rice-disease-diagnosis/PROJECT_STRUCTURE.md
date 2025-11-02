# 📁 Project Structure

Complete overview of the Rice Disease Diagnosis System file structure.

## 🌳 Directory Tree

```
rice-disease-diagnosis/
│
├── 📱 Frontend (Next.js + React + TypeScript)
│   │
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # 🏠 Landing page
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── globals.css               # Global styles
│   │   │
│   │   └── diagnosis/                # Diagnosis feature
│   │       └── page.tsx              # 🔬 Diagnosis interface
│   │
│   ├── components/                   # React components
│   │   ├── SymptomSelector.tsx       # ✅ Symptom selection UI
│   │   └── DiagnosisResult.tsx       # 📊 Results visualization
│   │
│   ├── lib/                          # Utilities & helpers
│   │   ├── types.ts                  # TypeScript type definitions
│   │   └── api.ts                    # API client functions
│   │
│   ├── public/                       # Static assets
│   │   └── (images, icons, etc.)
│   │
│   ├── node_modules/                 # Dependencies (auto-generated)
│   │
│   ├── .next/                        # Build output (auto-generated)
│   │
│   ├── package.json                  # Node dependencies & scripts
│   ├── package-lock.json             # Dependency lock file
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.ts            # Tailwind CSS config
│   ├── next.config.ts                # Next.js configuration
│   ├── postcss.config.mjs            # PostCSS config
│   ├── eslint.config.mjs             # ESLint configuration
│   └── .env.local                    # Environment variables
│
├── 🔧 Backend (FastAPI + Python)
│   │
│   ├── main.py                       # 🚀 FastAPI application
│   ├── diagnosis_system.py           # 🧠 ML system implementation
│   ├── models.py                     # 📋 Pydantic data models
│   │
│   ├── certainty_factor_rules.json   # 📚 Expert system rules
│   ├── dataset_penyakit_padi.csv     # 📊 Training dataset (60 samples)
│   │
│   ├── requirements.txt              # Python dependencies
│   └── test_backend.md               # Testing instructions
│
├── 📚 Documentation
│   ├── README.md                     # 📖 Main documentation
│   ├── QUICK_START.md                # ⚡ Quick start guide
│   ├── SETUP_GUIDE.md                # 🔧 Detailed setup
│   ├── FEATURES.md                   # ✨ Feature overview
│   └── PROJECT_STRUCTURE.md          # 📁 This file
│
└── 🔒 Configuration
    ├── .gitignore                    # Git ignore rules
    └── .env.local                    # Environment variables
```

## 📄 Key Files Explained

### Frontend Files

#### `app/page.tsx` (Landing Page)
- Hero section with system overview
- Feature cards
- Disease information
- Call-to-action buttons
- Responsive layout

#### `app/diagnosis/page.tsx` (Diagnosis Page)
- Main diagnosis interface
- State management for symptoms
- API integration
- Loading and error states
- Results display logic

#### `components/SymptomSelector.tsx`
- 15 symptom checkboxes
- Confidence level sliders
- Real-time visual feedback
- Color-coded confidence levels
- Smooth animations

#### `components/DiagnosisResult.tsx`
- Disease information card
- CF vs KNN comparison
- Bar charts (Recharts)
- Score visualization
- Action buttons

#### `lib/types.ts`
```typescript
- Symptom interface
- DiagnosisResult interface
- DiseaseInfo interface
```

#### `lib/api.ts`
```typescript
- diagnoseDisease() - POST diagnosis
- getSymptoms() - GET symptoms
- getDiseases() - GET diseases
```

### Backend Files

#### `backend/main.py` (FastAPI Server)
```python
Endpoints:
- POST /api/diagnose      # Perform diagnosis
- GET  /api/symptoms      # Get symptom list
- GET  /api/diseases      # Get disease info
- GET  /health            # Health check
- GET  /                  # API info
```

#### `backend/diagnosis_system.py` (ML System)
```python
Classes:
- CertaintyFactorEngine   # CF calculations
- KNNClassifier           # KNN predictions
- HybridDiagnosisSystem   # Combined system
```

#### `backend/models.py` (Data Models)
```python
Models:
- SymptomInput           # Request model
- DiagnosisResponse      # Response model
- DiseaseInfo            # Disease data
- CFResult               # CF results
- KNNResult              # KNN results
```

#### `backend/certainty_factor_rules.json`
```json
{
  "penyakit": [
    {
      "nama": "Blas",
      "gejala": [
        {"nama": "daun_menguning", "cf_pakar": 0.8},
        ...
      ]
    },
    ...
  ]
}
```

#### `backend/dataset_penyakit_padi.csv`
```csv
id,daun_menguning,bercak_coklat,...,penyakit
1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,Blas
...
```

### Configuration Files

#### `package.json`
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.0.1",
    "react": "^19.0.0",
    "recharts": "^2.15.0"
  }
}
```

#### `requirements.txt`
```
fastapi==0.115.0
uvicorn[standard]==0.32.0
pandas==2.2.3
numpy==2.1.3
scikit-learn==1.5.2
pydantic==2.9.2
```

#### `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🔄 Data Flow

```
User Browser
    ↓
[Landing Page] → Click "Mulai Diagnosa"
    ↓
[Diagnosis Page]
    ↓
[SymptomSelector Component]
    ↓ (User selects symptoms + confidence)
    ↓
[API Client (lib/api.ts)]
    ↓ HTTP POST
    ↓
[FastAPI Backend (main.py)]
    ↓
[HybridDiagnosisSystem]
    ├─→ [CertaintyFactorEngine] → CF Score
    └─→ [KNNClassifier] → KNN Probability
    ↓
[Combine Results] → Hybrid Score
    ↓ HTTP Response
    ↓
[DiagnosisResult Component]
    ↓
[Display Charts & Results]
```

## 📦 Dependencies

### Frontend Dependencies
```
Production:
- next (16.0.1)           # React framework
- react (19.0.0)          # UI library
- react-dom (19.0.0)      # React DOM
- recharts (2.15.0)       # Charts

Development:
- typescript (5.x)        # Type safety
- tailwindcss (4.0.0)     # Styling
- eslint (9.x)            # Linting
- @types/* (various)      # Type definitions
```

### Backend Dependencies
```
- fastapi (0.115.0)       # Web framework
- uvicorn (0.32.0)        # ASGI server
- pandas (2.2.3)          # Data processing
- numpy (2.1.3)           # Numerical computing
- scikit-learn (1.5.2)    # Machine learning
- pydantic (2.9.2)        # Data validation
```

## 🎯 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   └── Footer
│
├── Home Page (/)
│   ├── Hero Section
│   ├── Features Grid
│   ├── Diseases List
│   └── How It Works
│
└── Diagnosis Page (/diagnosis)
    ├── Header
    ├── Main Content
    │   ├── Symptom Panel
    │   │   └── SymptomSelector
    │   │       ├── Symptom Checkbox
    │   │       └── Confidence Slider
    │   │
    │   └── Sidebar
    │       ├── Summary Card
    │       ├── Diagnose Button
    │       └── Info Card
    │
    └── Results (conditional)
        └── DiagnosisResult
            ├── Main Result Card
            ├── Method Comparison
            ├── Bar Chart
            ├── Score Details
            └── Action Buttons
```

## 🗄️ Data Models

### Frontend Types
```typescript
interface Symptom {
  id: string;
  label: string;
  selected: boolean;
  confidence: number;
}

interface DiagnosisResult {
  penyakit_final: string;
  hybrid_score: number;
  cf_result: {...};
  knn_result: {...};
}
```

### Backend Models
```python
class SymptomInput(BaseModel):
    symptoms: Dict[str, bool]
    confidence: Dict[str, float]

class DiagnosisResponse(BaseModel):
    penyakit_final: str
    hybrid_score: float
    cf_result: Dict
    knn_result: Dict
```

## 📊 File Sizes (Approximate)

```
Frontend:
- app/page.tsx              ~4 KB
- app/diagnosis/page.tsx    ~8 KB
- components/*.tsx          ~12 KB
- lib/*.ts                  ~2 KB
- Total TypeScript:         ~26 KB

Backend:
- main.py                   ~3 KB
- diagnosis_system.py       ~8 KB
- models.py                 ~2 KB
- Total Python:             ~13 KB

Data:
- certainty_factor_rules.json  ~4 KB
- dataset_penyakit_padi.csv    ~3 KB

Documentation:
- *.md files                ~50 KB

Total Project Size:         ~100 KB (excluding node_modules)
```

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (optional .env)
```env
# Can add if needed:
# DATABASE_URL=...
# SECRET_KEY=...
# CORS_ORIGINS=...
```

## 🚀 Build Outputs

### Frontend Build
```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── types/              # Generated types
```

### Backend (No build needed)
Python runs directly from source files.

## 📝 Notes

- **node_modules/** is auto-generated (don't commit)
- **.next/** is auto-generated (don't commit)
- **__pycache__/** is auto-generated (don't commit)
- **.env.local** contains local config (don't commit)
- All source files use UTF-8 encoding
- Line endings: LF (Unix-style)

---

**Last Updated:** 2024
**Version:** 1.0.0
