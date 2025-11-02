import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistem Diagnosa Penyakit Padi</h1>
                <p className="text-sm text-gray-600">Certainty Factor + K-Nearest Neighbor</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Diagnosa Penyakit Tanaman Padi
            <span className="block text-green-600 mt-2">Cepat & Akurat</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sistem pendukung keputusan berbasis AI yang menggunakan metode Certainty Factor dan 
            K-Nearest Neighbor untuk mendiagnosa penyakit pada tanaman padi berdasarkan gejala yang diamati.
          </p>
          <Link 
            href="/diagnosis"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Mulai Diagnosa
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🔬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Metode Hybrid</h3>
            <p className="text-gray-600">
              Kombinasi Certainty Factor dan K-Nearest Neighbor untuk hasil diagnosa yang lebih akurat dan reliable.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Analisis Detail</h3>
            <p className="text-gray-600">
              Visualisasi lengkap hasil diagnosa dengan skor kepastian, probabilitas, dan perbandingan metode.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cepat & Mudah</h3>
            <p className="text-gray-600">
              Interface intuitif dengan slider tingkat keyakinan untuk setiap gejala yang diamati.
            </p>
          </div>
        </div>

        {/* Diseases */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Penyakit yang Dapat Didiagnosa</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Blas', desc: 'Pyricularia oryzae', icon: '🍂' },
              { name: 'Kresek', desc: 'Xanthomonas oryzae', icon: '🦠' },
              { name: 'Tungro', desc: 'Virus Tungro', icon: '🌿' },
              { name: 'Hawar Daun', desc: 'Rhizoctonia solani', icon: '🍃' },
              { name: 'Busuk Batang', desc: 'Busuk batang padi', icon: '🌱' },
              { name: 'Busuk Pelepah', desc: 'Sarocladium oryzae', icon: '🌾' }
            ].map((disease, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <span className="text-2xl">{disease.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{disease.name}</h4>
                  <p className="text-sm text-gray-600 italic">{disease.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Cara Kerja Sistem</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Pilih Gejala', desc: 'Pilih gejala yang terlihat pada tanaman padi' },
              { step: '2', title: 'Atur Keyakinan', desc: 'Tentukan tingkat keyakinan untuk setiap gejala' },
              { step: '3', title: 'Analisis AI', desc: 'Sistem menganalisis dengan CF dan KNN' },
              { step: '4', title: 'Hasil Diagnosa', desc: 'Dapatkan hasil diagnosa dengan skor akurasi' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Sistem Diagnosa Penyakit Padi. Menggunakan metode Certainty Factor dan K-Nearest Neighbor.
          </p>
        </div>
      </footer>
    </div>
  );
}
