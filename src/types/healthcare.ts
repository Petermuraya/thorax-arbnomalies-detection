
export interface ChestAnalysis {
  id: string;
  user_id: string;
  image_path: string;
  analysis_result: string | null;
  doctor_notes: string | null;
  status: "pending" | "reviewed" | "completed";
  created_at: string;
  updated_at: string;
  user_name?: string;
}

export interface Consultation {
  id: string;
  patient_id: string;
  doctor_id: string;
  scheduled_for: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string | null;
  cost: number;
  created_at: string;
  patient_name?: string;
}

export interface HealthcareStats {
  pendingAnalysesCount: number;
  completedAnalysesCount: number;
  todayConsultationsCount: number;
  totalPatientsCount: number;
}
