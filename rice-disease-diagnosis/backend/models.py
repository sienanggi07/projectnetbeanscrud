from pydantic import BaseModel, Field
from typing import Dict, List, Optional

class SymptomInput(BaseModel):
    """Input model for symptoms"""
    symptoms: Dict[str, bool] = Field(..., description="Dictionary of symptom names and their presence (True/False)")
    confidence: Dict[str, float] = Field(..., description="Dictionary of symptom names and confidence levels (0.2-1.0)")
    
    class Config:
        json_schema_extra = {
            "example": {
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
            }
        }

class CFResult(BaseModel):
    """Certainty Factor result"""
    penyakit: Optional[str]
    score: float
    all_scores: List[tuple]

class KNNResult(BaseModel):
    """KNN result"""
    penyakit: str
    probability: float

class DiagnosisResponse(BaseModel):
    """Response model for diagnosis"""
    penyakit_final: str = Field(..., description="Final diagnosed disease")
    hybrid_score: float = Field(..., description="Combined hybrid score")
    cf_result: Dict = Field(..., description="Certainty Factor results")
    knn_result: Dict = Field(..., description="KNN results")
    
    class Config:
        json_schema_extra = {
            "example": {
                "penyakit_final": "Blas",
                "hybrid_score": 0.8542,
                "cf_result": {
                    "penyakit": "Blas",
                    "score": 0.9872,
                    "all_scores": [
                        ["Blas", 0.9872],
                        ["Hawar_Daun", 0.4500],
                        ["Tungro", 0.3200]
                    ]
                },
                "knn_result": {
                    "penyakit": "Blas",
                    "probability": 0.7212
                }
            }
        }

class DiseaseInfo(BaseModel):
    """Disease information model"""
    nama: str
    kode: str
    deskripsi: str
    gejala_utama: List[str]
