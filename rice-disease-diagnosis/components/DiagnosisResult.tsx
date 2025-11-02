'use client';

import type { DiagnosisResult as DiagnosisResultType } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
}

const diseaseDescriptions: Record<string, { desc: string; cause: string; icon: string }> = {
  'Blas': {
    desc: 'Penyakit blas menyerang daun, batang, dan malai padi dengan ciri khas bercak coklat berbentuk oval.',
    cause: 'Disebabkan oleh jamur Pyricularia oryzae',
    icon: '🍂'
  },
  'Kresek': {
    desc: 'Hawar daun bakteri yang menyebabkan daun menggulung dan kering dengan lendir bakteri.',
    cause: 'Disebabkan oleh bakteri Xanthomonas oryzae',
    icon: '🦠'
  },
  'Tungro': {
    desc: 'Penyakit virus yang menyebabkan daun menguning parah dan pertumbuhan sangat terhambat.',
    cause: 'Disebabkan oleh virus tungro yang ditularkan wereng hijau',
    icon: '🌿'
  },
  'Hawar_Daun': {
    desc: 'Penyakit hawar yang menyerang daun dengan bercak coklat dan hawar khas.',
    cause: 'Disebabkan oleh jamur Rhizoctonia solani',
    icon: '🍃'
  },
  'Busuk_Batang': {
    desc: 'Penyakit yang menyerang batang dan akar padi dengan bau busuk khas.',
    cause: 'Disebabkan oleh jamur yang menyerang batang',
    icon: '🌱'
  },
  'Busuk_Pelepah': {
    desc: 'Penyakit yang menyebabkan bulir hampa dan malai tidak keluar sempurna.',
    cause: 'Disebabkan oleh jamur Sarocladium oryzae',
    icon: '🌾'
  }
};

export default function DiagnosisResult({ result, onReset }: DiagnosisResultProps) {
  const diseaseInfo = diseaseDescriptions[result.penyakit_final] || {
    desc: 'Informasi penyakit tidak tersedia',
    cause: '',
    icon: '🌾'
  };

  // Prepare data for chart
  const chartData = result.cf_result.all_scores.slice(0, 5).map(([name, score]) => ({
    name: name.replace('_', ' '),
    'CF Score': score,
    'KNN Prob': name === result.knn_result.penyakit ? result.knn_result.probability : 0,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Sangat Tinggi';
    if (score >= 0.6) return 'Tinggi';
    if (score >= 0.4) return 'Sedang';
    return 'Rendah';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-5xl">{diseaseInfo.icon}</span>
              <div>
                <p className="text-green-100 text-sm font-medium">Hasil Diagnosa</p>
                <h2 className="text-3xl font-bold">{result.penyakit_final.replace('_', ' ')}</h2>
              </div>
            </div>
            <p className="text-green-50 mb-2">{diseaseInfo.desc}</p>
            <p className="text-green-100 text-sm italic">{diseaseInfo.cause}</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <p className="text-green-100 text-sm mb-1">Hybrid Score</p>
              <p className="text-4xl font-bold">{(result.hybrid_score * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Method Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* CF Result */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Certainty Factor</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.cf_result.score)}`}>
              {getScoreLabel(result.cf_result.score)}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Penyakit:</span>
              <span className="font-semibold text-gray-900">
                {result.cf_result.penyakit?.replace('_', ' ') || 'Tidak terdeteksi'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CF Score:</span>
              <span className="font-semibold text-gray-900">{result.cf_result.score.toFixed(4)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${result.cf_result.score * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* KNN Result */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">K-Nearest Neighbor</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.knn_result.probability)}`}>
              {getScoreLabel(result.knn_result.probability)}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Penyakit:</span>
              <span className="font-semibold text-gray-900">{result.knn_result.penyakit.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Probability:</span>
              <span className="font-semibold text-gray-900">{result.knn_result.probability.toFixed(4)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${result.knn_result.probability * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Score Comparison Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Perbandingan Skor Semua Penyakit</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="CF Score" fill="#10b981" />
            <Bar dataKey="KNN Prob" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* All CF Scores */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Detail Skor CF Semua Penyakit</h3>
        <div className="space-y-3">
          {result.cf_result.all_scores.map(([name, score], idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{name.replace('_', ' ')}</span>
                  <span className="text-sm font-semibold text-gray-900">{score.toFixed(4)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-400'
                    }`}
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Diagnosa Baru
        </button>
        <button
          onClick={() => window.print()}
          className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
        >
          Cetak Hasil
        </button>
      </div>
    </div>
  );
}
