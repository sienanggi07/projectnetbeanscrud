# Backend Testing Instructions

## Prerequisites

The backend requires Python 3.8+ with the following packages:
- fastapi
- uvicorn
- pandas
- numpy
- scikit-learn
- pydantic

## Installation

```bash
cd backend

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Backend

```bash
# From backend directory
python main.py
```

The server will start on `http://localhost:8000`

## Testing Endpoints

### 1. Health Check
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

### 2. Get Symptoms List
```bash
curl http://localhost:8000/api/symptoms
```

### 3. Get Diseases Info
```bash
curl http://localhost:8000/api/diseases
```

### 4. Test Diagnosis - Case 1: Blas
```bash
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

Expected: Disease should be diagnosed as "Blas"

### 5. Test Diagnosis - Case 2: Tungro
```bash
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": {
      "daun_menguning": true,
      "daun_menggulung": true,
      "pertumbuhan_terhambat": true,
      "anakan_berkurang": true
    },
    "confidence": {
      "daun_menguning": 1.0,
      "daun_menggulung": 0.8,
      "pertumbuhan_terhambat": 0.9,
      "anakan_berkurang": 0.8
    }
  }'
```

Expected: Disease should be diagnosed as "Tungro"

### 6. Test Diagnosis - Case 3: Kresek
```bash
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": {
      "daun_menggulung": true,
      "daun_kering": true,
      "pertumbuhan_terhambat": true,
      "lendir_bakteri": true
    },
    "confidence": {
      "daun_menggulung": 0.9,
      "daun_kering": 0.8,
      "pertumbuhan_terhambat": 0.7,
      "lendir_bakteri": 1.0
    }
  }'
```

Expected: Disease should be diagnosed as "Kresek"

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Troubleshooting

### Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Module not found
```bash
pip install -r requirements.txt
```

### CORS errors
The backend is configured to allow all origins for development. In production, update the `allow_origins` in `main.py`.
