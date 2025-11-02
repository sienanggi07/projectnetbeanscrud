# Dataset Training untuk Sistem Pendukung Keputusan Diagnosa Penyakit Tanaman Padi

## Metode yang Digunakan
1. **Certainty Factor (CF)**: Untuk menghitung tingkat kepastian diagnosa berdasarkan gejala yang diamati
2. **K-Nearest Neighbor (KNN)**: Untuk klasifikasi pola gejala berdasarkan kemiripan dengan data training

## Struktur Dataset

### 1. Dataset Penyakit Padi (dataset_penyakit_padi.csv)

Dataset ini berisi 60 record data training dengan 15 fitur gejala dan 1 label penyakit.

#### Fitur/Gejala (15 fitur):
1. **daun_menguning**: Daun tanaman padi menguning (0=tidak, 1=ya)
2. **bercak_coklat**: Terdapat bercak coklat pada daun (0=tidak, 1=ya)
3. **daun_menggulung**: Daun menggulung ke dalam (0=tidak, 1=ya)
4. **pertumbuhan_terhambat**: Pertumbuhan tanaman terhambat/kerdil (0=tidak, 1=ya)
5. **batang_busuk**: Batang tanaman membusuk (0=tidak, 1=ya)
6. **bulir_hampa**: Bulir padi hampa/tidak berisi (0=tidak, 1=ya)
7. **bercak_putih**: Terdapat bercak putih pada daun (0=tidak, 1=ya)
8. **daun_kering**: Daun mengering (0=tidak, 1=ya)
9. **akar_busuk**: Akar tanaman membusuk (0=tidak, 1=ya)
10. **anakan_berkurang**: Jumlah anakan berkurang (0=tidak, 1=ya)
11. **malai_tidak_keluar**: Malai tidak keluar atau terhambat (0=tidak, 1=ya)
12. **bercak_oval**: Bercak berbentuk oval/lonjong (0=tidak, 1=ya)
13. **lendir_bakteri**: Terdapat lendir bakteri pada daun (0=tidak, 1=ya)
14. **hawar_daun**: Gejala hawar pada daun (0=tidak, 1=ya)
15. **bau_busuk**: Tercium bau busuk pada tanaman (0=tidak, 1=ya)

#### Label/Target (6 kelas penyakit):
1. **Blas**: Penyakit blas (Pyricularia oryzae) - 15 data
2. **Kresek**: Hawar daun bakteri (Xanthomonas oryzae) - 10 data
3. **Tungro**: Penyakit virus tungro - 10 data
4. **Hawar_Daun**: Hawar daun (Rhizoctonia solani) - 10 data
5. **Busuk_Batang**: Busuk batang - 8 data
6. **Busuk_Pelepah**: Busuk pelepah (Sarocladium oryzae) - 7 data

### 2. Aturan Certainty Factor (certainty_factor_rules.json)

File ini berisi aturan pakar untuk metode Certainty Factor dengan struktur:

#### Komponen Utama:
- **cf_pakar**: Nilai certainty factor dari pakar (0.0 - 1.0) yang menunjukkan tingkat kepastian gejala terhadap penyakit
- **bobot**: Bobot fitur untuk algoritma KNN (feature importance)
- **tingkat_keyakinan_user**: Skala keyakinan user saat input gejala
  - Sangat Yakin: 1.0
  - Yakin: 0.8
  - Cukup Yakin: 0.6
  - Kurang Yakin: 0.4
  - Tidak Yakin: 0.2

#### Rumus Certainty Factor:
```
CF(H,E) = CF(E) × CF(H,E)
```
Dimana:
- CF(H,E) = Certainty Factor hipotesis H berdasarkan evidence E
- CF(E) = Certainty Factor evidence (keyakinan user)
- CF(H,E) = Certainty Factor aturan pakar

Untuk kombinasi beberapa gejala:
```
CF_combine(CF1, CF2) = CF1 + CF2 × (1 - CF1)
```

## Karakteristik Pola Gejala per Penyakit

### 1. Blas (P001)
**Gejala Utama:**
- Bercak coklat (CF: 0.9) ⭐ Gejala paling kuat
- Bercak oval (CF: 0.85)
- Daun menguning (CF: 0.8)
- Pertumbuhan terhambat (CF: 0.7)

**Pola:** Kombinasi bercak coklat berbentuk oval dengan daun menguning

### 2. Kresek (P002)
**Gejala Utama:**
- Lendir bakteri (CF: 0.95) ⭐ Gejala paling khas
- Daun menggulung (CF: 0.9)
- Daun kering (CF: 0.85)
- Pertumbuhan terhambat (CF: 0.75)

**Pola:** Daun menggulung dan kering dengan lendir bakteri

### 3. Tungro (P003)
**Gejala Utama:**
- Daun menguning (CF: 0.95) ⭐ Gejala paling dominan
- Pertumbuhan terhambat (CF: 0.9)
- Anakan berkurang (CF: 0.85)
- Daun menggulung (CF: 0.8)

**Pola:** Daun menguning parah dengan pertumbuhan sangat terhambat

### 4. Hawar Daun (P004)
**Gejala Utama:**
- Hawar daun (CF: 0.95) ⭐ Gejala spesifik
- Bercak coklat (CF: 0.8)
- Daun kering (CF: 0.75)
- Pertumbuhan terhambat (CF: 0.65)

**Pola:** Gejala hawar khas dengan bercak coklat

### 5. Busuk Batang (P005)
**Gejala Utama:**
- Batang busuk (CF: 0.95) ⭐ Gejala khas
- Akar busuk (CF: 0.9)
- Pertumbuhan terhambat (CF: 0.85)
- Bau busuk (CF: 0.8)

**Pola:** Pembusukan pada batang dan akar dengan bau khas

### 6. Busuk Pelepah (P006)
**Gejala Utama:**
- Bulir hampa (CF: 0.9) ⭐ Gejala khas
- Malai tidak keluar (CF: 0.85)
- Pertumbuhan terhambat (CF: 0.8)
- Daun menguning (CF: 0.75)

**Pola:** Gangguan pada pembentukan bulir dan malai

## Cara Penggunaan Dataset

### Untuk Metode Certainty Factor:
1. User input gejala yang diamati dengan tingkat keyakinan
2. Sistem menghitung CF untuk setiap penyakit menggunakan aturan pakar
3. CF dikombinasikan untuk multiple gejala
4. Penyakit dengan CF tertinggi (>threshold 0.6) menjadi diagnosa

### Untuk Metode K-Nearest Neighbor:
1. Dataset digunakan sebagai training data
2. Fitur gejala (15 kolom) sebagai input features
3. Label penyakit sebagai target class
4. Gunakan distance metric (Euclidean/Manhattan)
5. K optimal: 3-7 (perlu tuning)
6. Bobot dari CF rules dapat digunakan sebagai feature weights

### Hybrid CF + KNN:
1. **Tahap 1 (KNN)**: Klasifikasi awal untuk mendapat kandidat penyakit
2. **Tahap 2 (CF)**: Hitung certainty factor untuk kandidat penyakit
3. **Keputusan**: Kombinasi probabilitas KNN dengan CF score
4. **Formula**: `Score_final = (KNN_probability × 0.5) + (CF_score × 0.5)`

## Evaluasi Model

### Metrik yang Disarankan:
- **Accuracy**: Akurasi keseluruhan
- **Precision**: Ketepatan diagnosa per penyakit
- **Recall**: Kemampuan mendeteksi penyakit
- **F1-Score**: Harmonic mean precision dan recall
- **Confusion Matrix**: Analisis kesalahan klasifikasi

### Split Data:
- Training: 70% (42 data)
- Testing: 30% (18 data)
- Atau gunakan K-Fold Cross Validation (k=5 atau k=10)

## Ekspansi Dataset

Dataset ini dapat diperluas dengan:
1. Menambah jumlah record per penyakit (minimal 50-100 per kelas)
2. Menambah variasi kombinasi gejala
3. Menambah gejala baru yang lebih spesifik
4. Menambah tingkat keparahan gejala (mild, moderate, severe)
5. Menambah faktor lingkungan (cuaca, musim, lokasi)
6. Data real dari lapangan atau penelitian

## Referensi Penyakit Padi

1. **Blas**: Disebabkan jamur *Pyricularia oryzae*
2. **Kresek**: Disebabkan bakteri *Xanthomonas oryzae pv. oryzae*
3. **Tungro**: Disebabkan Rice Tungro Bacilliform Virus (RTBV) dan Rice Tungro Spherical Virus (RTSV)
4. **Hawar Daun**: Disebabkan jamur *Rhizoctonia solani*
5. **Busuk Batang**: Disebabkan berbagai jamur patogen
6. **Busuk Pelepah**: Disebabkan jamur *Sarocladium oryzae*

## Catatan Implementasi

- Dataset dalam format CSV untuk kemudahan import ke berbagai tools (Python, R, Excel)
- Rules dalam format JSON untuk fleksibilitas parsing
- Nilai binary (0/1) memudahkan perhitungan distance dan CF
- Dapat diimplementasikan dengan: Python (scikit-learn, pandas), R, PHP, Java, atau platform lain
- Threshold CF dapat disesuaikan berdasarkan kebutuhan (default: 0.6)
