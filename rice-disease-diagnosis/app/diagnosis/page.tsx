'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SymptomSelector from '@/components/SymptomSelector';
import DiagnosisResult from '@/components/DiagnosisResult';
import { Symptom, DiagnosisResult as DiagnosisResultType } from '@/lib/types';
import { diagnoseDisease } from '@/lib/api';

const initialSymptoms: Symptom[] = [
  { id: 'daun_menguning', label: 'Daun Menguning', selected: false, confidence: 0.8 },
  { id: 'bercak_coklat', label: 'Bercak Coklat', selected: false, confidence: 0.8 },
  { id: 'daun_menggulung', label: 'Daun Menggulung', selected: false, confidence: 0.8 },
  { id: 'pertumbuhan_terhambat', label: 'Pertumbuhan Terhambat', selected: false, confidence: 0.8 },
  { id: 'batang_busuk', label: 'Batang Busuk', selected: false, confidence: 0.8 },
  { id: 'bulir_hampa', label: 'Bulir Hampa', selected: false, confidence: 0.8 },
  { id: 'bercak_putih', label: 'Bercak Putih', selected: false, confidence: 0.8 },
  { id: 'daun_kering', label: 'Daun Kering', selected: false, confidence: 0.8 },
  { id: 'akar_busuk', label: 'Akar Busuk', selected: false, confidence: 0.8 },
  { id: 'anakan_berkurang', label: 'Anakan Berkurang', selected: false, confidence: 0.8 },
  { id: 'malai_tidak_keluar', label: 'Malai Tidak Keluar', selected: false, confidence: 0.8 },
  { id: 'bercak_oval', label: 'Bercak Oval', selected: false, confidence: 0.8 },
  { id: 'lendir_bakteri', label: 'Lendir Bakteri', selected: false, confidence: 0.8 },
  { id: 'hawar_daun', label: 'Hawar Daun', selected: false, confidence: 0.8 },
  { id: 'bau_busuk', label: 'Bau Busuk', selected: false, confidence: 0.8 },
];

export default function DiagnosisPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSymptomChange = (id: string, selected: boolean) => {
    setSymptoms(prev =>
      prev.map(s => (s.id === id ? { ...s, selected } : s))
    );
  };

  const handleConfidenceChange = (id: string, confidence: number) => {
    setSymptoms(prev =>
      prev.map(s => (s.id === id ? { ...s, confidence } : s))
    );
  };

  const handleDiagnose = async () => {
    const selectedSymptoms = symptoms.filter(s => s.selected);
    
    if (selectedSymptoms.length === 0) {
      setError('Pilih minimal satu gejala untuk melakukan diagnosa');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const symptomsData: Record<string, boolean> = {};
      const confidenceData: Record<string, number> = {};

      selectedSymptoms.forEach(s => {
        symptomsData[s.id] = true;
        confidenceData[s.id] = s.confidence;
      });

      const diagnosisResult = await diagnoseDisease(symptomsData, confidenceData);
      setResult(diagnosisResult);
    } catch (err) {
      setError('Gagal melakukan diagnosa. Pastikan backend API sudah berjalan di http://localhost:8000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms(initialSymptoms);
    setResult(null);
    setError(null);
  };

  const selectedCount = symptoms.filter(s => s.selected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistem Diagnosa Penyakit Padi</h1>
                <p className="text-sm text-gray-600">Diagnosa Penyakit</p>
              </div>
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Symptom Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pilih Gejala</h2>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {selectedCount} gejala dipilih
                  </span>
                </div>
                <SymptomSelector
                  symptoms={symptoms}
                  onSymptomChange={handleSymptomChange}
                  onConfidenceChange={handleConfidenceChange}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Gejala Dipilih</span>
                      <span className="font-semibold text-gray-900">{selectedCount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Total Gejala</span>
                      <span className="font-semibold text-gray-900">{symptoms.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Metode</span>
                      <span className="font-semibold text-gray-900">CF + KNN</span>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleDiagnose}
                    disabled={loading || selectedCount === 0}
                    className={`w-full mt-6 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                      loading || selectedCount === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menganalisis...
                      </span>
                    ) : (
                      'Mulai Diagnosa'
                    )}
                  </button>

                  {selectedCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="w-full mt-3 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                    >
                      Reset Semua
                    </button>
                  )}
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">ℹ️ Informasi</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Pilih gejala yang terlihat pada tanaman</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Atur tingkat keyakinan untuk setiap gejala</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Sistem akan menganalisis dengan 2 metode</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Hasil diagnosa menggabungkan CF dan KNN</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DiagnosisResult result={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
