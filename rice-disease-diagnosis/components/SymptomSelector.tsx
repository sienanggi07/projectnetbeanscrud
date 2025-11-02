'use client';

import { Symptom } from '@/lib/types';

interface SymptomSelectorProps {
  symptoms: Symptom[];
  onSymptomChange: (id: string, selected: boolean) => void;
  onConfidenceChange: (id: string, confidence: number) => void;
}

const confidenceLevels = [
  { value: 0.2, label: 'Tidak Yakin', color: 'bg-red-500' },
  { value: 0.4, label: 'Kurang Yakin', color: 'bg-orange-500' },
  { value: 0.6, label: 'Cukup Yakin', color: 'bg-yellow-500' },
  { value: 0.8, label: 'Yakin', color: 'bg-lime-500' },
  { value: 1.0, label: 'Sangat Yakin', color: 'bg-green-500' },
];

export default function SymptomSelector({
  symptoms,
  onSymptomChange,
  onConfidenceChange,
}: SymptomSelectorProps) {
  const getConfidenceLabel = (value: number) => {
    const level = confidenceLevels.find(l => l.value === value);
    return level ? level.label : 'Yakin';
  };

  const getConfidenceColor = (value: number) => {
    if (value <= 0.2) return 'bg-red-500';
    if (value <= 0.4) return 'bg-orange-500';
    if (value <= 0.6) return 'bg-yellow-500';
    if (value <= 0.8) return 'bg-lime-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Petunjuk:</span> Pilih gejala yang terlihat pada tanaman padi, 
          kemudian atur tingkat keyakinan Anda untuk setiap gejala menggunakan slider.
        </p>
      </div>

      {symptoms.map((symptom) => (
        <div
          key={symptom.id}
          className={`border rounded-xl p-5 transition-all duration-200 ${
            symptom.selected
              ? 'border-green-300 bg-green-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex items-center h-6 mt-1">
              <input
                type="checkbox"
                id={symptom.id}
                checked={symptom.selected}
                onChange={(e) => onSymptomChange(symptom.id, e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor={symptom.id}
                className="block text-base font-medium text-gray-900 cursor-pointer mb-3"
              >
                {symptom.label}
              </label>

              {symptom.selected && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tingkat Keyakinan:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-white ${getConfidenceColor(symptom.confidence)}`}>
                      {getConfidenceLabel(symptom.confidence)} ({symptom.confidence.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.2"
                      value={symptom.confidence}
                      onChange={(e) => onConfidenceChange(symptom.id, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                      style={{
                        background: `linear-gradient(to right, 
                          rgb(239 68 68) 0%, 
                          rgb(249 115 22) 25%, 
                          rgb(234 179 8) 50%, 
                          rgb(163 230 53) 75%, 
                          rgb(34 197 94) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.2</span>
                      <span>0.4</span>
                      <span>0.6</span>
                      <span>0.8</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
