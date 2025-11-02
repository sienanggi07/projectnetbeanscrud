# 5 IDE JUDUL SKRIPSI SISTEM INFORMASI
## Topik: Makanan Bergizi Gratis - Sistem Pendukung Keputusan

---

## 1. SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN PENERIMA MAKANAN BERGIZI GRATIS MENGGUNAKAN METODE AHP (ANALYTICAL HIERARCHY PROCESS)

### Permasalahan:
- Distribusi makanan bergizi gratis sering tidak tepat sasaran karena proses seleksi penerima yang subjektif
- Banyaknya kriteria yang harus dipertimbangkan (ekonomi, kesehatan, jumlah tanggungan, dll) membuat pengambilan keputusan menjadi kompleks
- Tidak ada sistem terstruktur untuk menentukan prioritas penerima bantuan
- Data penerima tidak terorganisir dengan baik sehingga sulit melakukan evaluasi

### Data yang Digunakan:
- Data demografi calon penerima (nama, alamat, usia, pekerjaan)
- Data ekonomi keluarga (pendapatan, pengeluaran, aset)
- Data kesehatan (status gizi anak, riwayat penyakit)
- Data sosial (jumlah tanggungan, kondisi rumah, akses pendidikan)
- Data historis penerima bantuan sebelumnya
- Kriteria dan bobot penilaian dari stakeholder

### Solusi yang Diberikan:
- Sistem berbasis web yang mengimplementasikan metode AHP untuk menghitung bobot kriteria
- Fitur input data calon penerima dengan validasi otomatis
- Modul perhitungan skor prioritas berdasarkan multiple criteria
- Dashboard visualisasi ranking penerima dengan skor tertinggi
- Laporan rekomendasi penerima yang dapat diekspor (PDF/Excel)
- Sistem dapat membantu pengambil keputusan membuat keputusan yang lebih objektif dan terukur

---

## 2. SISTEM PENDUKUNG KEPUTUSAN PENENTUAN MENU MAKANAN BERGIZI GRATIS MENGGUNAKAN METODE TOPSIS (TECHNIQUE FOR ORDER PREFERENCE BY SIMILARITY TO IDEAL SOLUTION)

### Permasalahan:
- Kesulitan menentukan menu makanan yang optimal dengan mempertimbangkan nilai gizi, biaya, dan preferensi penerima
- Menu yang monoton menyebabkan rendahnya minat konsumsi makanan bergizi gratis
- Keterbatasan anggaran membuat perlu adanya optimasi pemilihan bahan makanan
- Tidak ada sistem yang membantu menyeimbangkan antara kandungan gizi, biaya produksi, dan variasi menu

### Data yang Digunakan:
- Database bahan makanan (nama, harga, ketersediaan)
- Data kandungan gizi (protein, karbohidrat, lemak, vitamin, mineral)
- Data anggaran program makanan bergizi gratis
- Data preferensi dan alergi penerima
- Data supplier dan harga pasar
- Standar kebutuhan gizi harian (berdasarkan usia dan kondisi)

### Solusi yang Diberikan:
- Sistem SPK berbasis web dengan metode TOPSIS untuk ranking alternatif menu
- Modul perhitungan nilai gizi total per menu
- Fitur kalkulasi biaya produksi per porsi
- Sistem rekomendasi menu harian/mingguan yang optimal
- Visualisasi perbandingan menu berdasarkan kriteria (gizi, biaya, variasi)
- Fitur perencanaan menu jangka panjang dengan rotasi otomatis
- Export menu planning untuk dapur produksi

---

## 3. SISTEM PENDUKUNG KEPUTUSAN LOKASI DISTRIBUSI MAKANAN BERGIZI GRATIS MENGGUNAKAN METODE SAW (SIMPLE ADDITIVE WEIGHTING) DAN ALGORITMA K-MEANS CLUSTERING

### Permasalahan:
- Distribusi makanan bergizi gratis tidak efisien karena lokasi penyaluran yang tidak strategis
- Jarak tempuh yang jauh menyebabkan banyak penerima tidak dapat mengakses program
- Biaya operasional distribusi tinggi karena rute yang tidak optimal
- Pengelompokan penerima berdasarkan lokasi geografis belum dilakukan secara sistematis

### Data yang Digunakan:
- Data geografis penerima (koordinat GPS, alamat lengkap)
- Data demografi wilayah (kepadatan penduduk, tingkat kemiskinan)
- Data infrastruktur (akses jalan, fasilitas umum)
- Data jarak dan waktu tempuh
- Data kapasitas lokasi potensial (luas, fasilitas)
- Data biaya operasional per lokasi

### Solusi yang Diberikan:
- Sistem clustering menggunakan K-Means untuk mengelompokkan penerima berdasarkan lokasi
- Implementasi metode SAW untuk menentukan lokasi distribusi terbaik per cluster
- Integrasi peta digital (Google Maps API) untuk visualisasi sebaran penerima
- Perhitungan otomatis jumlah titik distribusi optimal
- Analisis jangkauan layanan per lokasi distribusi
- Estimasi biaya operasional dan efisiensi distribusi
- Rekomendasi rute distribusi yang efisien

---

## 4. SISTEM PENDUKUNG KEPUTUSAN EVALUASI KINERJA PROGRAM MAKANAN BERGIZI GRATIS MENGGUNAKAN METODE SMART (SIMPLE MULTI-ATTRIBUTE RATING TECHNIQUE)

### Permasalahan:
- Tidak ada sistem evaluasi terstruktur untuk mengukur keberhasilan program makanan bergizi gratis
- Sulit mengidentifikasi area yang perlu perbaikan dalam pelaksanaan program
- Data monitoring tersebar dan tidak terintegrasi
- Pengambil kebijakan kesulitan membandingkan kinerja antar wilayah/periode

### Data yang Digunakan:
- Data jumlah penerima dan target program
- Data tingkat partisipasi dan kehadiran penerima
- Data perubahan status gizi penerima (sebelum dan sesudah)
- Data anggaran dan realisasi biaya
- Data kepuasan penerima (survei)
- Data ketepatan waktu distribusi
- Data kualitas makanan (keluhan, sisa makanan)
- Data kinerja pengelola program per wilayah

### Solusi yang Diberikan:
- Sistem evaluasi berbasis metode SMART dengan multiple criteria
- Dashboard monitoring real-time kinerja program
- Modul input data monitoring dari berbagai sumber
- Perhitungan skor kinerja otomatis dengan normalisasi data
- Visualisasi perbandingan kinerja antar wilayah/periode (grafik, chart)
- Sistem peringkat wilayah berdasarkan kinerja
- Laporan analisis gap dan rekomendasi perbaikan
- Alert system untuk indikator kinerja yang di bawah target

---

## 5. SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN VENDOR KATERING MAKANAN BERGIZI GRATIS MENGGUNAKAN METODE PROMETHEE (PREFERENCE RANKING ORGANIZATION METHOD FOR ENRICHMENT EVALUATION)

### Permasalahan:
- Proses tender pemilihan vendor katering sering tidak transparan dan objektif
- Banyak kriteria yang harus dipertimbangkan (harga, kualitas, kapasitas, track record)
- Kesulitan membandingkan proposal dari berbagai vendor dengan kriteria yang berbeda-beda
- Risiko memilih vendor yang tidak kompeten dapat mengganggu program

### Data yang Digunakan:
- Data profil vendor (legalitas, pengalaman, kapasitas produksi)
- Data penawaran harga per porsi
- Data sertifikasi (HACCP, halal, kesehatan)
- Data track record (proyek sebelumnya, testimoni)
- Data fasilitas produksi (dapur, peralatan, kebersihan)
- Data SDM (jumlah karyawan, chef bersertifikat)
- Data sampel menu dan nilai gizi
- Data waktu pengiriman dan jangkauan distribusi

### Solusi yang Diberikan:
- Sistem SPK berbasis metode PROMETHEE untuk ranking vendor
- Modul input data vendor dan proposal penawaran
- Perhitungan preference function untuk setiap kriteria
- Visualisasi perbandingan vendor (radar chart, bar chart)
- Analisis sensitivitas terhadap perubahan bobot kriteria
- Sistem scoring otomatis dengan transparansi perhitungan
- Laporan rekomendasi vendor terbaik dengan justifikasi
- Fitur simulasi "what-if" untuk berbagai skenario pembobotan
- Export hasil evaluasi untuk dokumentasi tender

---

## CATATAN TAMBAHAN:

### Keunggulan Setiap Metode:
- **AHP**: Baik untuk masalah dengan hierarki kriteria yang kompleks
- **TOPSIS**: Efektif untuk alternatif dengan banyak kriteria kuantitatif
- **SAW + K-Means**: Kombinasi clustering dan ranking untuk masalah spasial
- **SMART**: Sederhana namun powerful untuk evaluasi multi-kriteria
- **PROMETHEE**: Sophisticated untuk perbandingan alternatif dengan preferensi yang kompleks

### Tips Pengembangan:
1. Semua sistem dapat dikembangkan berbasis web (PHP, Python, atau Node.js)
2. Gunakan database MySQL/PostgreSQL untuk penyimpanan data
3. Implementasikan user authentication dan role management
4. Tambahkan fitur export laporan (PDF, Excel)
5. Buat dokumentasi lengkap (user manual, technical documentation)
6. Lakukan testing dengan data real dari instansi terkait
7. Validasi hasil sistem dengan expert judgment

### Sumber Data Potensial:
- Dinas Sosial setempat
- Puskesmas/Dinas Kesehatan
- Sekolah (untuk program makanan bergizi gratis siswa)
- Kelurahan/Kecamatan
- Vendor katering yang sudah beroperasi
- Data BPS (Badan Pusat Statistik)

---

**Semoga ide-ide skripsi ini bermanfaat! Pilih yang paling sesuai dengan minat dan ketersediaan data di lingkungan Anda.**
