# Sistem Pendukung Keputusan Diagnosa Penyakit Tanaman Padi

Sistem ini menggunakan kombinasi metode **Certainty Factor (CF)** dan **K-Nearest Neighbor (KNN)** untuk mendiagnosa penyakit pada tanaman padi berdasarkan gejala yang diamati.

## 📁 File-file dalam Project

1. **dataset_penyakit_padi.csv** - Dataset training berisi 60 record dengan 15 fitur gejala dan 6 kelas penyakit
2. **certainty_factor_rules.json** - Aturan pakar untuk perhitungan Certainty Factor
3. **penjelasan_dataset.md** - Dokumentasi lengkap tentang struktur dataset dan cara penggunaan
4. **contoh_implementasi.py** - Implementasi lengkap sistem dalam Python
5. **README.md** - File ini

## 🦠 Penyakit yang Dapat Didiagnosa

1. **Blas** - Disebabkan jamur *Pyricularia oryzae*
2. **Kresek** - Hawar daun bakteri (*Xanthomonas oryzae*)
3. **Tungro** - Penyakit virus tungro
4. **Hawar Daun** - Disebabkan jamur *Rhizoctonia solani*
5. **Busuk Batang** - Busuk batang padi
6. **Busuk Pelepah** - Disebabkan jamur *Sarocladium oryzae*

## 🔍 Gejala yang Dianalisis (15 Fitur)

1. Daun menguning
2. Bercak coklat
3. Daun menggulung
4. Pertumbuhan terhambat
5. Batang busuk
6. Bulir hampa
7. Bercak putih
8. Daun kering
9. Akar busuk
10. Anakan berkurang
11. Malai tidak keluar
12. Bercak oval
13. Lendir bakteri
14. Hawar daun
15. Bau busuk

## 🧮 Metode yang Digunakan

### 1. Certainty Factor (CF)
Metode berbasis aturan pakar yang menghitung tingkat kepastian diagnosa berdasarkan:
- **CF Pakar**: Nilai kepastian dari pakar untuk setiap gejala terhadap penyakit (0.0 - 1.0)
- **CF User**: Tingkat keyakinan user saat mengamati gejala
- **Kombinasi CF**: Menggabungkan multiple gejala menggunakan rumus kombinasi CF

**Rumus:**
```
CF(H,E) = CF(E) × CF(pakar)
CF_combine(CF1, CF2) = CF1 + CF2 × (1 - CF1)
```

### 2. K-Nearest Neighbor (KNN)
Algoritma machine learning yang mengklasifikasikan berdasarkan kemiripan pola gejala dengan data training:
- Menggunakan distance metric untuk mencari k tetangga terdekat
- Klasifikasi berdasarkan mayoritas kelas dari k tetangga
- Optimal k = 3-7 (perlu tuning)

### 3. Hybrid CF + KNN
Kombinasi kedua metode untuk hasil yang lebih akurat:
```
Score_final = (KNN_probability × 0.5) + (CF_score × 0.5)
```

## 🚀 Cara Menggunakan

### Instalasi Dependencies

```bash
pip install pandas numpy scikit-learn
```

### Menjalankan Contoh Implementasi

```bash
python contoh_implementasi.py
```

### Penggunaan dalam Kode

```python
from contoh_implementasi import HybridDiagnosisSystem

# Inisialisasi sistem
sistem = HybridDiagnosisSystem(k=5)

# Training model KNN
sistem.train_knn()

# Input gejala yang diamati
gejala = {
    'daun_menguning': True,
    'bercak_coklat': True,
    'pertumbuhan_terhambat': True,
    'bercak_oval': True
}

# Tingkat keyakinan untuk setiap gejala
keyakinan = {
    'daun_menguning': 0.8,      # Yakin
    'bercak_coklat': 1.0,        # Sangat yakin
    'pertumbuhan_terhambat': 0.8,
    'bercak_oval': 0.9
}

# Diagnosa
hasil = sistem.diagnosa_hybrid(gejala, keyakinan)

print(f"Penyakit: {hasil['penyakit_final']}")
print(f"Score: {hasil['hybrid_score']}")
```

## 📊 Struktur Dataset

### Format CSV
```csv
id,daun_menguning,bercak_coklat,...,penyakit
1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,Blas
2,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,Kresek
...
```

### Distribusi Data
- **Blas**: 15 data (25%)
- **Kresek**: 10 data (16.7%)
- **Tungro**: 10 data (16.7%)
- **Hawar Daun**: 10 data (16.7%)
- **Busuk Batang**: 8 data (13.3%)
- **Busuk Pelepah**: 7 data (11.7%)

**Total**: 60 data training

## 🎯 Evaluasi Model

Model dievaluasi menggunakan:
- **Accuracy**: Akurasi keseluruhan
- **Precision**: Ketepatan per kelas
- **Recall**: Sensitivitas deteksi
- **F1-Score**: Harmonic mean precision dan recall
- **Confusion Matrix**: Analisis kesalahan klasifikasi

### Split Data
- Training: 70% (42 data)
- Testing: 30% (18 data)

## 📈 Karakteristik Pola Gejala

### Blas
- **Gejala Kunci**: Bercak coklat oval (CF: 0.9)
- **Pola**: Kombinasi bercak coklat + daun menguning

### Kresek
- **Gejala Kunci**: Lendir bakteri (CF: 0.95)
- **Pola**: Daun menggulung + kering + lendir

### Tungro
- **Gejala Kunci**: Daun menguning parah (CF: 0.95)
- **Pola**: Menguning + pertumbuhan sangat terhambat

### Hawar Daun
- **Gejala Kunci**: Hawar daun spesifik (CF: 0.95)
- **Pola**: Hawar + bercak coklat

### Busuk Batang
- **Gejala Kunci**: Batang busuk (CF: 0.95)
- **Pola**: Busuk batang + akar + bau

### Busuk Pelepah
- **Gejala Kunci**: Bulir hampa (CF: 0.9)
- **Pola**: Gangguan pembentukan bulir + malai

## 🔧 Kustomisasi

### Mengubah Nilai K pada KNN
```python
sistem = HybridDiagnosisSystem(k=7)  # Default: k=5
```

### Mengubah Bobot Hybrid
```python
sistem.weight_knn = 0.6  # Bobot KNN
sistem.weight_cf = 0.4   # Bobot CF
```

### Mengubah Threshold CF
Edit file `certainty_factor_rules.json`:
```json
{
  "threshold_diagnosa": 0.7  // Default: 0.6
}
```

## 📝 Tingkat Keyakinan User

Saat input gejala, user dapat menentukan tingkat keyakinan:

- **Sangat Yakin**: 1.0
- **Yakin**: 0.8
- **Cukup Yakin**: 0.6
- **Kurang Yakin**: 0.4
- **Tidak Yakin**: 0.2

## 🔬 Pengembangan Lebih Lanjut

Dataset ini dapat dikembangkan dengan:

1. **Menambah jumlah data** - Minimal 50-100 data per kelas
2. **Menambah variasi gejala** - Kombinasi gejala yang lebih beragam
3. **Tingkat keparahan** - Mild, moderate, severe
4. **Faktor lingkungan** - Cuaca, musim, lokasi
5. **Data real** - Dari lapangan atau penelitian
6. **Gambar visual** - Untuk computer vision
7. **Time series** - Perkembangan gejala dari waktu ke waktu

## 📚 Referensi

1. Shortliffe, E. H., & Buchanan, B. G. (1975). A model of inexact reasoning in medicine. *Mathematical Biosciences*.
2. Cover, T., & Hart, P. (1967). Nearest neighbor pattern classification. *IEEE Transactions on Information Theory*.
3. Balai Besar Penelitian Tanaman Padi (BB Padi) - Kementerian Pertanian RI

## 📄 Lisensi

Dataset ini dibuat untuk keperluan edukasi dan penelitian.

## 👨‍💻 Kontributor

Dataset dan implementasi dibuat untuk mendukung penelitian Sistem Pendukung Keputusan diagnosa penyakit tanaman padi.

---

**Catatan**: Dataset ini adalah data sintetis yang dibuat berdasarkan karakteristik penyakit padi yang umum. Untuk aplikasi produksi, disarankan menggunakan data real dari lapangan atau validasi dengan pakar pertanian.
