
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          role: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          role?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          role?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          scheduled_for: string;
          cost: number;
          created_at: string | null;
          updated_at: string | null;
          status: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          patient_id: string;
          doctor_id: string;
          scheduled_for: string;
          cost?: number;
          created_at?: string | null;
          updated_at?: string | null;
          status?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          patient_id?: string;
          doctor_id?: string;
          scheduled_for?: string;
          cost?: number;
          created_at?: string | null;
          updated_at?: string | null;
          status?: string | null;
          notes?: string | null;
        };
      };
      healthcare_verification: {
        Row: {
          id: string;
          user_id: string;
          reviewer_id: string | null;
          document_path: string;
          license_number: string;
          specialization: string;
          status: string | null;
          reviewer_notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          reviewer_id?: string | null;
          document_path: string;
          license_number: string;
          specialization: string;
          status?: string | null;
          reviewer_notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          reviewer_id?: string | null;
          document_path?: string;
          license_number?: string;
          specialization?: string;
          status?: string | null;
          reviewer_notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      chest_analysis: {
        Row: {
          id: string;
          user_id: string;
          doctor_id: string | null;
          created_at: string | null;
          updated_at: string | null;
          analysis_result: string | null;
          doctor_notes: string | null;
          ai_prediction: string | null;
          status: string | null;
          image_path: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          doctor_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          analysis_result?: string | null;
          doctor_notes?: string | null;
          ai_prediction?: string | null;
          status?: string | null;
          image_path: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          doctor_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          analysis_result?: string | null;
          doctor_notes?: string | null;
          ai_prediction?: string | null;
          status?: string | null;
          image_path?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
