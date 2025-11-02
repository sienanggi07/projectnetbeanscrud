# 5 IDE JUDUL SKRIPSI SISTEM PENDUKUNG KEPUTUSAN
## Mahasiswa Sistem Informasi

---

## 1. Sistem Pendukung Keputusan Pemilihan Supplier Bahan Baku Menggunakan Metode AHP-TOPSIS

### Permasalahan
Perusahaan manufaktur sering menghadapi kesulitan dalam memilih supplier bahan baku yang tepat karena banyaknya kriteria yang harus dipertimbangkan seperti harga, kualitas produk, ketepatan waktu pengiriman, kredibilitas, dan layanan purna jual. Keputusan yang tidak tepat dapat berdampak pada kualitas produk akhir dan efisiensi operasional perusahaan.

### Data yang Digunakan
- Data profil supplier (nama, lokasi, lama kerjasama)
- Data historis pembelian dan harga bahan baku
- Data kualitas produk dari supplier (tingkat defect, sertifikasi)
- Data ketepatan waktu pengiriman (on-time delivery rate)
- Data kredibilitas supplier (track record, kapasitas produksi)
- Data layanan purna jual dan responsivitas
- Hasil kuesioner dari tim procurement dan quality control

### Solusi yang Diberikan
Mengembangkan sistem pendukung keputusan berbasis web yang mengintegrasikan metode Analytical Hierarchy Process (AHP) untuk pembobotan kriteria berdasarkan tingkat kepentingan, dan metode TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) untuk merangking alternatif supplier. Sistem akan memberikan rekomendasi supplier terbaik secara objektif dan terukur, serta menyediakan visualisasi perbandingan antar supplier untuk memudahkan pengambilan keputusan.

---

## 2. Sistem Pendukung Keputusan Penerimaan Karyawan Menggunakan Metode SAW dan Profile Matching

### Permasalahan
Proses rekrutmen karyawan di perusahaan seringkali memakan waktu lama dan subjektif karena banyaknya pelamar dengan kualifikasi yang beragam. HRD kesulitan menilai kandidat secara objektif berdasarkan kriteria teknis (hard skills) dan non-teknis (soft skills) secara bersamaan. Hal ini dapat menyebabkan kesalahan dalam memilih kandidat yang paling sesuai dengan kebutuhan posisi.

### Data yang Digunakan
- Data pelamar (biodata, pendidikan, pengalaman kerja)
- Hasil tes kemampuan teknis (skor tes programming, akuntansi, dll)
- Hasil tes psikologi dan kepribadian
- Nilai soft skills (komunikasi, leadership, teamwork)
- Hasil wawancara dari berbagai interviewer
- Standar kompetensi untuk setiap posisi jabatan
- Data gap kompetensi (core factor dan secondary factor)

### Solusi yang Diberikan
Membangun sistem pendukung keputusan yang mengkombinasikan metode Simple Additive Weighting (SAW) untuk menilai kriteria umum seperti pendidikan dan pengalaman, dengan metode Profile Matching untuk menganalisis kesesuaian kompetensi kandidat terhadap profil ideal posisi yang dilamar. Sistem akan menghasilkan ranking kandidat terbaik dengan perhitungan yang transparan dan dapat dipertanggungjawabkan, serta menyediakan laporan analisis gap kompetensi untuk setiap kandidat.

---

## 3. Sistem Pendukung Keputusan Pemberian Beasiswa Mahasiswa Menggunakan Metode SMART dan Naive Bayes

### Permasalahan
Institusi pendidikan menghadapi tantangan dalam menentukan mahasiswa yang layak menerima beasiswa dari ratusan pendaftar dengan latar belakang ekonomi dan prestasi akademik yang berbeda-beda. Proses seleksi manual membutuhkan waktu lama dan rentan terhadap bias subjektif. Diperlukan sistem yang dapat menilai kelayakan secara adil berdasarkan kriteria yang telah ditetapkan.

### Data yang Digunakan
- Data akademik mahasiswa (IPK, jumlah SKS, prestasi akademik)
- Data ekonomi keluarga (penghasilan orang tua, jumlah tanggungan)
- Data prestasi non-akademik (organisasi, kompetisi, volunteer)
- Data kehadiran dan kedisiplinan
- Data historis penerima beasiswa tahun sebelumnya
- Kriteria dan bobot penilaian beasiswa
- Data verifikasi dokumen pendukung

### Solusi yang Diberikan
Mengembangkan sistem pendukung keputusan hybrid yang menggunakan metode SMART (Simple Multi-Attribute Rating Technique) untuk menghitung skor kelayakan berdasarkan normalisasi kriteria dan pembobotan, dikombinasikan dengan algoritma Naive Bayes untuk klasifikasi prediktif berdasarkan pola data historis penerima beasiswa. Sistem akan memberikan rekomendasi mahasiswa yang layak menerima beasiswa dengan tingkat akurasi tinggi, serta menyediakan dashboard monitoring untuk panitia seleksi.

---

## 4. Sistem Pendukung Keputusan Penentuan Lokasi Cabang Baru Menggunakan Metode Fuzzy AHP dan GIS

### Permasalahan
Perusahaan retail atau perbankan yang ingin membuka cabang baru menghadapi kesulitan dalam menentukan lokasi strategis yang optimal. Banyak faktor yang harus dipertimbangkan seperti kepadatan penduduk, aksesibilitas, kompetitor, daya beli masyarakat, dan biaya operasional. Keputusan lokasi yang salah dapat menyebabkan kerugian finansial yang signifikan.

### Data yang Digunakan
- Data geografis wilayah (koordinat, peta digital)
- Data demografi (jumlah penduduk, usia, pendidikan)
- Data ekonomi wilayah (daya beli, PDRB per kapita)
- Data aksesibilitas (jarak ke jalan utama, transportasi umum)
- Data kompetitor (lokasi, jarak, market share)
- Data infrastruktur (ketersediaan listrik, air, internet)
- Data harga sewa atau pembelian properti
- Data traffic dan footfall area

### Solusi yang Diberikan
Membangun sistem pendukung keputusan berbasis Geographic Information System (GIS) yang mengintegrasikan metode Fuzzy AHP untuk menangani ketidakpastian dalam penilaian kriteria kualitatif dan pembobotan yang bersifat linguistik. Sistem akan menampilkan visualisasi peta interaktif dengan heat map yang menunjukkan area-area potensial untuk pembukaan cabang baru, lengkap dengan analisis komparatif antar lokasi dan proyeksi kelayakan bisnis.

---

## 5. Sistem Pendukung Keputusan Diagnosa Penyakit Tanaman Padi Menggunakan Metode Certainty Factor dan K-Nearest Neighbor

### Permasalahan
Petani padi sering mengalami kesulitan dalam mendiagnosa penyakit tanaman secara dini dan akurat karena keterbatasan pengetahuan dan akses ke ahli pertanian. Keterlambatan diagnosa dapat menyebabkan penyebaran penyakit yang lebih luas dan penurunan hasil panen yang signifikan. Diperlukan sistem yang dapat membantu petani mengidentifikasi penyakit berdasarkan gejala yang terlihat.

### Data yang Digunakan
- Data jenis penyakit tanaman padi (blast, blight, tungro, dll)
- Data gejala penyakit (perubahan warna daun, bercak, kering, dll)
- Data tingkat kepastian hubungan gejala-penyakit dari pakar
- Data citra/foto tanaman yang terinfeksi
- Data kondisi lingkungan (suhu, kelembaban, musim)
- Data historis kasus penyakit di berbagai wilayah
- Data penanganan dan treatment untuk setiap penyakit
- Dataset training untuk klasifikasi pola gejala

### Solusi yang Diberikan
Mengembangkan sistem pendukung keputusan mobile-friendly yang mengkombinasikan metode Certainty Factor untuk menghitung tingkat kepastian diagnosa berdasarkan gejala yang dipilih pengguna dengan nilai kepercayaan dari pakar, dan algoritma K-Nearest Neighbor (KNN) untuk klasifikasi penyakit berdasarkan kemiripan pola gejala dengan data historis. Sistem akan memberikan diagnosa penyakit dengan tingkat kepastian, rekomendasi penanganan, dan fitur upload foto untuk analisis visual, sehingga membantu petani mengambil tindakan preventif dan kuratif yang tepat waktu.

---

## Catatan Pengembangan

### Teknologi yang Dapat Digunakan:
- **Frontend**: HTML, CSS, JavaScript, Bootstrap/Tailwind, React/Vue.js
- **Backend**: PHP (Laravel/CodeIgniter), Python (Flask/Django), Node.js (Express)
- **Database**: MySQL, PostgreSQL, MongoDB
- **Tools**: XAMPP/WAMP, Visual Studio Code, Git
- **Library**: Chart.js untuk visualisasi, Leaflet/Google Maps API untuk GIS

### Metodologi Penelitian:
1. Studi literatur
2. Pengumpulan data dan wawancara dengan stakeholder
3. Analisis sistem berjalan
4. Perancangan sistem (DFD, ERD, Flowchart)
5. Implementasi algoritma dan sistem
6. Testing dan validasi
7. Analisis hasil dan kesimpulan

### Tips Pemilihan Judul:
- Sesuaikan dengan minat dan kemampuan teknis Anda
- Pertimbangkan ketersediaan data dan akses ke objek penelitian
- Konsultasikan dengan dosen pembimbing
- Pastikan ada kontribusi atau novelty dalam penelitian
- Pilih metode yang sesuai dengan karakteristik masalah

---

**Dibuat untuk mahasiswa Sistem Informasi**
**Fokus: Sistem Pendukung Keputusan (SPK/DSS)**
