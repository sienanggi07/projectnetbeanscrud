export interface Symptom {
  id: string;
  label: string;
  selected: boolean;
  confidence: number;
}

export interface DiagnosisResult {
  penyakit_final: string;
  hybrid_score: number;
  cf_result: {
    penyakit: string | null;
    score: number;
    all_scores: [string, number][];
  };
  knn_result: {
    penyakit: string;
    probability: number;
  };
}

export interface DiseaseInfo {
  nama: string;
  kode: string;
  deskripsi: string;
  gejala: Array<{
    kode: string;
    nama: string;
    cf_pakar: number;
    bobot: number;
  }>;
}
