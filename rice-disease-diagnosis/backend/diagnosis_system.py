"""
Refactored Diagnosis System for Web API
"""

import pandas as pd
import numpy as np
import json
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from typing import Dict, Tuple, List, Optional

class CertaintyFactorEngine:
    """Engine untuk perhitungan Certainty Factor"""
    
    def __init__(self, rules_file='certainty_factor_rules.json'):
        with open(rules_file, 'r') as f:
            self.rules = json.load(f)
        self.threshold = self.rules['threshold_diagnosa']
    
    def calculate_cf(self, gejala_input: Dict[str, bool], tingkat_keyakinan: Dict[str, float]) -> Dict[str, float]:
        """
        Menghitung CF untuk setiap penyakit berdasarkan gejala input
        
        Args:
            gejala_input: dict {nama_gejala: True/False}
            tingkat_keyakinan: dict {nama_gejala: nilai_keyakinan}
        
        Returns:
            dict: {nama_penyakit: cf_score}
        """
        hasil_cf = {}
        
        for penyakit in self.rules['penyakit']:
            cf_kombinasi = 0
            
            for gejala in penyakit['gejala']:
                nama_gejala = gejala['nama']
                
                # Jika gejala ada dalam input
                if gejala_input.get(nama_gejala, False):
                    cf_pakar = gejala['cf_pakar']
                    cf_user = tingkat_keyakinan.get(nama_gejala, 0.8)
                    
                    # CF(H,E) = CF(E) × CF(H,E)
                    cf_gejala = cf_user * cf_pakar
                    
                    # Kombinasi CF
                    if cf_kombinasi == 0:
                        cf_kombinasi = cf_gejala
                    else:
                        # CF_combine = CF1 + CF2 × (1 - CF1)
                        cf_kombinasi = cf_kombinasi + cf_gejala * (1 - cf_kombinasi)
            
            hasil_cf[penyakit['nama']] = round(cf_kombinasi, 4)
        
        return hasil_cf
    
    def diagnosa(self, gejala_input: Dict[str, bool], tingkat_keyakinan: Dict[str, float]) -> Tuple[Optional[str], float, List[Tuple[str, float]]]:
        """
        Melakukan diagnosa berdasarkan CF
        
        Returns:
            tuple: (penyakit_terdiagnosa, cf_score, semua_hasil)
        """
        hasil_cf = self.calculate_cf(gejala_input, tingkat_keyakinan)
        
        # Urutkan berdasarkan CF tertinggi
        sorted_hasil = sorted(hasil_cf.items(), key=lambda x: x[1], reverse=True)
        
        # Ambil penyakit dengan CF tertinggi
        penyakit_top = sorted_hasil[0]
        
        if penyakit_top[1] >= self.threshold:
            return penyakit_top[0], penyakit_top[1], sorted_hasil
        else:
            return None, penyakit_top[1], sorted_hasil
    
    def get_disease_info(self) -> List[Dict]:
        """Get all disease information"""
        return self.rules['penyakit']


class KNNClassifier:
    """Classifier menggunakan K-Nearest Neighbor"""
    
    def __init__(self, dataset_file='dataset_penyakit_padi.csv', k=5):
        self.df = pd.read_csv(dataset_file)
        self.k = k
        self.model = None
        self.scaler = StandardScaler()
        self.feature_columns = [
            'daun_menguning', 'bercak_coklat', 'daun_menggulung', 
            'pertumbuhan_terhambat', 'batang_busuk', 'bulir_hampa',
            'bercak_putih', 'daun_kering', 'akar_busuk', 
            'anakan_berkurang', 'malai_tidak_keluar', 'bercak_oval',
            'lendir_bakteri', 'hawar_daun', 'bau_busuk'
        ]
        self._train_model()
    
    def _train_model(self):
        """Melatih model KNN saat inisialisasi"""
        X = self.df[self.feature_columns]
        y = self.df['penyakit']
        
        # Scaling
        X_scaled = self.scaler.fit_transform(X)
        
        # Training
        self.model = KNeighborsClassifier(n_neighbors=self.k, weights='distance')
        self.model.fit(X_scaled, y)
    
    def predict(self, gejala_input: Dict[str, bool]) -> Tuple[str, float]:
        """
        Prediksi penyakit berdasarkan gejala
        
        Args:
            gejala_input: dict {nama_gejala: True/False}
        
        Returns:
            tuple: (penyakit, probabilitas)
        """
        if self.model is None:
            raise Exception("Model belum dilatih.")
        
        # Konversi input ke format array
        input_array = []
        for col in self.feature_columns:
            input_array.append(1 if gejala_input.get(col, False) else 0)
        
        input_array = np.array(input_array).reshape(1, -1)
        input_scaled = self.scaler.transform(input_array)
        
        # Prediksi
        penyakit = self.model.predict(input_scaled)[0]
        probabilitas = self.model.predict_proba(input_scaled)[0]
        
        # Ambil probabilitas untuk kelas yang diprediksi
        class_idx = list(self.model.classes_).index(penyakit)
        prob_penyakit = probabilitas[class_idx]
        
        return penyakit, prob_penyakit


class HybridDiagnosisSystem:
    """Sistem Hybrid menggunakan CF dan KNN"""
    
    def __init__(self, dataset_file='dataset_penyakit_padi.csv', 
                 rules_file='certainty_factor_rules.json', k=5):
        self.cf_engine = CertaintyFactorEngine(rules_file)
        self.knn_classifier = KNNClassifier(dataset_file, k)
        self.weight_knn = 0.5
        self.weight_cf = 0.5
    
    def diagnosa_hybrid(self, gejala_input: Dict[str, bool], tingkat_keyakinan: Dict[str, float]) -> Dict:
        """
        Diagnosa menggunakan kombinasi CF dan KNN
        
        Args:
            gejala_input: dict {nama_gejala: True/False}
            tingkat_keyakinan: dict {nama_gejala: nilai_keyakinan}
        
        Returns:
            dict: hasil diagnosa lengkap
        """
        # Diagnosa dengan CF
        penyakit_cf, cf_score, all_cf = self.cf_engine.diagnosa(
            gejala_input, tingkat_keyakinan
        )
        
        # Prediksi dengan KNN
        penyakit_knn, prob_knn = self.knn_classifier.predict(gejala_input)
        
        # Hitung score hybrid
        # Normalisasi CF score untuk penyakit yang diprediksi KNN
        cf_for_knn_disease = dict(all_cf).get(penyakit_knn, 0)
        
        hybrid_score = (prob_knn * self.weight_knn) + (cf_for_knn_disease * self.weight_cf)
        
        # Tentukan penyakit final
        if hybrid_score >= 0.6:
            penyakit_final = penyakit_knn
        else:
            penyakit_final = penyakit_cf if penyakit_cf else penyakit_knn
        
        return {
            'penyakit_final': penyakit_final,
            'hybrid_score': round(hybrid_score, 4),
            'cf_result': {
                'penyakit': penyakit_cf,
                'score': cf_score,
                'all_scores': all_cf
            },
            'knn_result': {
                'penyakit': penyakit_knn,
                'probability': round(prob_knn, 4)
            }
        }
    
    def get_all_diseases(self) -> List[Dict]:
        """Get information about all diseases"""
        return self.cf_engine.get_disease_info()
    
    def get_symptom_list(self) -> List[Dict[str, str]]:
        """Get list of all symptoms with Indonesian labels"""
        symptoms = [
            {"id": "daun_menguning", "label": "Daun Menguning"},
            {"id": "bercak_coklat", "label": "Bercak Coklat"},
            {"id": "daun_menggulung", "label": "Daun Menggulung"},
            {"id": "pertumbuhan_terhambat", "label": "Pertumbuhan Terhambat"},
            {"id": "batang_busuk", "label": "Batang Busuk"},
            {"id": "bulir_hampa", "label": "Bulir Hampa"},
            {"id": "bercak_putih", "label": "Bercak Putih"},
            {"id": "daun_kering", "label": "Daun Kering"},
            {"id": "akar_busuk", "label": "Akar Busuk"},
            {"id": "anakan_berkurang", "label": "Anakan Berkurang"},
            {"id": "malai_tidak_keluar", "label": "Malai Tidak Keluar"},
            {"id": "bercak_oval", "label": "Bercak Oval"},
            {"id": "lendir_bakteri", "label": "Lendir Bakteri"},
            {"id": "hawar_daun", "label": "Hawar Daun"},
            {"id": "bau_busuk", "label": "Bau Busuk"}
        ]
        return symptoms
