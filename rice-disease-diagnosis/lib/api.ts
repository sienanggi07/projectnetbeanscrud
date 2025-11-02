import { DiagnosisResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function diagnoseDisease(
  symptoms: Record<string, boolean>,
  confidence: Record<string, number>
): Promise<DiagnosisResult> {
  const response = await fetch(`${API_BASE_URL}/api/diagnose`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symptoms,
      confidence,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to diagnose disease');
  }

  return response.json();
}

export async function getSymptoms() {
  const response = await fetch(`${API_BASE_URL}/api/symptoms`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch symptoms');
  }

  return response.json();
}

export async function getDiseases() {
  const response = await fetch(`${API_BASE_URL}/api/diseases`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch diseases');
  }

  return response.json();
}
