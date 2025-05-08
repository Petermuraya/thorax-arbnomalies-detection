
import { supabase } from "@/integrations/supabase/client";
import { ChestAnalysis, Consultation } from "@/types/healthcare";
import { toast } from "sonner";

export const fetchPendingAnalyses = async () => {
  const { data, error } = await supabase
    .from("chest_analysis")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchCompletedAnalyses = async (doctorId: string) => {
  const { data, error } = await supabase
    .from("chest_analysis")
    .select("*")
    .eq("status", "reviewed")
    .eq("doctor_id", doctorId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchTodayConsultations = async (doctorId: string) => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("doctor_id", doctorId)
    .gte("scheduled_for", startOfDay)
    .lte("scheduled_for", endOfDay)
    .order("scheduled_for", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateAnalysis = async (userId: string, analysisId: string, doctorNotes: string) => {
  try {
    const { error } = await supabase
      .from("chest_analysis")
      .update({
        doctor_notes: doctorNotes,
        doctor_id: userId,
        status: "reviewed",
        updated_at: new Date().toISOString()
      })
      .eq("id", analysisId);

    if (error) throw error;
    toast.success("The X-ray analysis has been successfully reviewed");
    return true;
  } catch (error) {
    console.error("Error updating analysis:", error);
    toast.error("Failed to update the analysis. Please try again.");
    return false;
  }
};

export const scheduleConsultation = async (doctorId: string, patientId: string, scheduledFor: string) => {
  try {
    const { error } = await supabase
      .from("consultations")
      .insert({
        doctor_id: doctorId,
        patient_id: patientId,
        scheduled_for: scheduledFor,
        status: "scheduled"
      });

    if (error) throw error;
    toast.success("Consultation scheduled successfully");
    return true;
  } catch (error) {
    console.error("Error scheduling consultation:", error);
    toast.error("Failed to schedule consultation. Please try again.");
    return false;
  }
};

export const getUniquePatientCount = async (doctorId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .select("patient_id", { count: "exact", head: true })
      .eq("doctor_id", doctorId);

    if (error) throw error;
    
    return data?.length || 0;
  } catch (error) {
    console.error("Error counting patients:", error);
    return 0;
  }
};
