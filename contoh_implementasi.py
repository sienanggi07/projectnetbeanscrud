#!/usr/bin/env python3
"""
Contoh Implementasi Sistem Pendukung Keputusan Diagnosa Penyakit Tanaman Padi
Menggunakan Metode Certainty Factor dan K-Nearest Neighbor
"""

import pandas as pd
import numpy as np
import json
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.preprocessing import StandardScaler

class CertaintyFactorEngine:
    """Engine untuk perhitungan Certainty Factor"""
    
    def __init__(self, rules_file='certainty_factor_rules.json'):
        with open(rules_file, 'r') as f:
            self.rules = json.load(f)
        self.threshold = self.rules['threshold_diagnosa']
    
    def calculate_cf(self, gejala_input, tingkat_keyakinan):
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
    
    def diagnosa(self, gejala_input, tingkat_keyakinan):
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
    
    def train(self, test_size=0.3, random_state=42):
        """Melatih model KNN"""
        X = self.df[self.feature_columns]
        y = self.df['penyakit']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )
        
        # Scaling (opsional untuk binary features, tapi baik untuk konsistensi)
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Training
        self.model = KNeighborsClassifier(n_neighbors=self.k, weights='distance')
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluasi
        y_pred = self.model.predict(X_test_scaled)
        
        print("=" * 60)
        print("EVALUASI MODEL K-NEAREST NEIGHBOR")
        print("=" * 60)
        print(f"K = {self.k}")
        print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))
        print("\nConfusion Matrix:")
        print(confusion_matrix(y_test, y_pred))
        print("=" * 60)
        
        return X_test, y_test, y_pred
    
    def predict(self, gejala_input):
        """
        Prediksi penyakit berdasarkan gejala
        
        Args:
            gejala_input: dict {nama_gejala: True/False}
        
        Returns:
            tuple: (penyakit, probabilitas)
        """
        if self.model is None:
            raise Exception("Model belum dilatih. Jalankan train() terlebih dahulu.")
        
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
    
    def train_knn(self):
        """Melatih komponen KNN"""
        return self.knn_classifier.train()
    
    def diagnosa_hybrid(self, gejala_input, tingkat_keyakinan):
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


def contoh_penggunaan():
    """Contoh penggunaan sistem"""
    
    print("\n" + "=" * 60)
    print("SISTEM PENDUKUNG KEPUTUSAN DIAGNOSA PENYAKIT PADI")
    print("Metode: Certainty Factor + K-Nearest Neighbor")
    print("=" * 60 + "\n")
    
    # Inisialisasi sistem
    sistem = HybridDiagnosisSystem(k=5)
    
    # Training KNN
    print("Training model KNN...\n")
    sistem.train_knn()
    
    # Contoh kasus diagnosa
    print("\n" + "=" * 60)
    print("CONTOH KASUS DIAGNOSA")
    print("=" * 60 + "\n")
    
    # Kasus 1: Penyakit Blas
    print("Kasus 1: Gejala Penyakit Blas")
    print("-" * 60)
    gejala_1 = {
        'daun_menguning': True,
        'bercak_coklat': True,
        'pertumbuhan_terhambat': True,
        'bercak_oval': True
    }
    keyakinan_1 = {
        'daun_menguning': 0.8,
        'bercak_coklat': 1.0,
        'pertumbuhan_terhambat': 0.8,
        'bercak_oval': 0.9
    }
    
    hasil_1 = sistem.diagnosa_hybrid(gejala_1, keyakinan_1)
    print(f"Penyakit Terdiagnosa: {hasil_1['penyakit_final']}")
    print(f"Hybrid Score: {hasil_1['hybrid_score']}")
    print(f"CF Score: {hasil_1['cf_result']['score']}")
    print(f"KNN Probability: {hasil_1['knn_result']['probability']}")
    print(f"Top 3 CF Scores: {hasil_1['cf_result']['all_scores'][:3]}")
    
    # Kasus 2: Penyakit Tungro
    print("\n\nKasus 2: Gejala Penyakit Tungro")
    print("-" * 60)
    gejala_2 = {
        'daun_menguning': True,
        'daun_menggulung': True,
        'pertumbuhan_terhambat': True,
        'anakan_berkurang': True
    }
    keyakinan_2 = {
        'daun_menguning': 1.0,
        'daun_menggulung': 0.8,
        'pertumbuhan_terhambat': 0.9,
        'anakan_berkurang': 0.8
    }
    
    hasil_2 = sistem.diagnosa_hybrid(gejala_2, keyakinan_2)
    print(f"Penyakit Terdiagnosa: {hasil_2['penyakit_final']}")
    print(f"Hybrid Score: {hasil_2['hybrid_score']}")
    print(f"CF Score: {hasil_2['cf_result']['score']}")
    print(f"KNN Probability: {hasil_2['knn_result']['probability']}")
    print(f"Top 3 CF Scores: {hasil_2['cf_result']['all_scores'][:3]}")
    
    # Kasus 3: Penyakit Kresek
    print("\n\nKasus 3: Gejala Penyakit Kresek")
    print("-" * 60)
    gejala_3 = {
        'daun_menggulung': True,
        'daun_kering': True,
        'pertumbuhan_terhambat': True,
        'lendir_bakteri': True
    }
    keyakinan_3 = {
        'daun_menggulung': 0.9,
        'daun_kering': 0.8,
        'pertumbuhan_terhambat': 0.7,
        'lendir_bakteri': 1.0
    }
    
    hasil_3 = sistem.diagnosa_hybrid(gejala_3, keyakinan_3)
    print(f"Penyakit Terdiagnosa: {hasil_3['penyakit_final']}")
    print(f"Hybrid Score: {hasil_3['hybrid_score']}")
    print(f"CF Score: {hasil_3['cf_result']['score']}")
    print(f"KNN Probability: {hasil_3['knn_result']['probability']}")
    print(f"Top 3 CF Scores: {hasil_3['cf_result']['all_scores'][:3]}")
    
    print("\n" + "=" * 60)
    print("SELESAI")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    contoh_penggunaan()
