"""
FastAPI Backend for Rice Disease Diagnosis System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import SymptomInput, DiagnosisResponse, DiseaseInfo
from diagnosis_system import HybridDiagnosisSystem
import os

# Initialize FastAPI app
app = FastAPI(
    title="Rice Disease Diagnosis API",
    description="API for diagnosing rice plant diseases using Certainty Factor and KNN",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize diagnosis system
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
diagnosis_system = HybridDiagnosisSystem(
    dataset_file=os.path.join(BASE_DIR, 'dataset_penyakit_padi.csv'),
    rules_file=os.path.join(BASE_DIR, 'certainty_factor_rules.json'),
    k=5
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Rice Disease Diagnosis API",
        "version": "1.0.0",
        "endpoints": {
            "diagnose": "/api/diagnose",
            "diseases": "/api/diseases",
            "symptoms": "/api/symptoms"
        }
    }

@app.post("/api/diagnose", response_model=DiagnosisResponse)
async def diagnose(input_data: SymptomInput):
    """
    Diagnose rice disease based on symptoms and confidence levels
    
    Args:
        input_data: SymptomInput containing symptoms and confidence levels
    
    Returns:
        DiagnosisResponse with diagnosis results
    """
    try:
        # Validate confidence levels
        for symptom, confidence in input_data.confidence.items():
            if not 0.0 <= confidence <= 1.0:
                raise HTTPException(
                    status_code=400,
                    detail=f"Confidence level for {symptom} must be between 0.0 and 1.0"
                )
        
        # Perform diagnosis
        result = diagnosis_system.diagnosa_hybrid(
            input_data.symptoms,
            input_data.confidence
        )
        
        return DiagnosisResponse(**result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/diseases")
async def get_diseases():
    """
    Get information about all rice diseases
    
    Returns:
        List of disease information
    """
    try:
        diseases = diagnosis_system.get_all_diseases()
        return {"diseases": diseases}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/symptoms")
async def get_symptoms():
    """
    Get list of all symptoms
    
    Returns:
        List of symptoms with IDs and labels
    """
    try:
        symptoms = diagnosis_system.get_symptom_list()
        return {"symptoms": symptoms}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
