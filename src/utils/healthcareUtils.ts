
import { supabase } from "@/integrations/supabase/client";
import { ChestAnalysis, Consultation } from "@/types/healthcare";

export const addUserNameToAnalyses = async (analyses: any[]): Promise<ChestAnalysis[]> => {
  const result: ChestAnalysis[] = [...analyses];
  
  for (const analysis of result) {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", analysis.user_id)
        .single();
      
      analysis.user_name = profileData?.full_name || "Unknown Patient";
    } catch (error) {
      analysis.user_name = "Unknown Patient";
    }
  }
  
  return result;
};

export const addPatientNameToConsultations = async (consultations: any[]): Promise<Consultation[]> => {
  const result: Consultation[] = [];
  
  for (const consultation of consultations) {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", consultation.patient_id)
        .single();
      
      // Ensure status is a valid enum value
      const status = consultation.status as "scheduled" | "completed" | "cancelled";
      
      result.push({
        ...consultation,
        patient_name: profileData?.full_name || "Unknown Patient",
        status: status || "scheduled" // Default to scheduled if null
      });
    } catch (error) {
      // Still add the consultation with a default name if profile fetch fails
      const status = consultation.status as "scheduled" | "completed" | "cancelled";
      
      result.push({
        ...consultation,
        patient_name: "Unknown Patient",
        status: status || "scheduled"
      });
    }
  }
  
  return result;
};
