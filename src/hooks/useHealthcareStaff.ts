import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { useNotify } from "@/hooks/useNotify";

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

interface HealthcareStats {
  pendingAnalysesCount: number;
  completedAnalysesCount: number;
  todayConsultationsCount: number;
  totalPatientsCount: number;
}

export const useHealthcareStaff = () => {
  const [pendingAnalyses, setPendingAnalyses] = useState<ChestAnalysis[]>([]);
  const [completedAnalyses, setCompletedAnalyses] = useState<ChestAnalysis[]>([]);
  const [todayConsultations, setTodayConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<HealthcareStats>({
    pendingAnalysesCount: 0,
    completedAnalysesCount: 0,
    todayConsultationsCount: 0,
    totalPatientsCount: 0
  });
  const { user } = useAuth();
  const { notifyInfo, notifySuccess, notifyError } = useNotify();

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Fetch analyses that need doctor review (pending)
      const { data: pendingData, error: pendingError } = await supabase
        .from("chest_analysis")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (pendingError) throw pendingError;

      // Fetch user data for pending analyses
      const pendingWithUserNames = await addUserNameToAnalyses(pendingData || []);
      setPendingAnalyses(pendingWithUserNames);

      // Fetch completed analyses
      const { data: completedData, error: completedError } = await supabase
        .from("chest_analysis")
        .select("*")
        .eq("status", "reviewed")
        .eq("doctor_id", user.id)
        .order("updated_at", { ascending: false });

      if (completedError) throw completedError;

      // Fetch user data for completed analyses
      const completedWithUserNames = await addUserNameToAnalyses(completedData || []);
      setCompletedAnalyses(completedWithUserNames);

      // Get today's consultations
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();

      const { data: consultationsData, error: consultationsError } = await supabase
        .from("consultations")
        .select("*")
        .eq("doctor_id", user.id)
        .gte("scheduled_for", startOfDay)
        .lte("scheduled_for", endOfDay)
        .order("scheduled_for", { ascending: true });

      if (consultationsError) throw consultationsError;

      // Fetch patient names for consultations
      const consultationsWithNames = await addPatientNameToConsultations(consultationsData || []);
      setTodayConsultations(consultationsWithNames);

      // Update stats
      setStats({
        pendingAnalysesCount: pendingWithUserNames.length,
        completedAnalysesCount: completedWithUserNames.length,
        todayConsultationsCount: consultationsWithNames.length,
        totalPatientsCount: await getUniquePatientCount(user.id)
      });

      // Send notifications for new data
      if (pendingWithUserNames.length > 0) {
        notifyInfo(
          "Pending Analyses", 
          `You have ${pendingWithUserNames.length} analyses waiting for review`,
          { link: "/health-staff-dashboard?tab=pending-analysis", actionText: "View Analyses" }
        );
      }
      
      if (consultationsWithNames.length > 0) {
        const nextConsultation = consultationsWithNames[0];
        const consultationTime = new Date(nextConsultation.scheduled_for).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        notifyInfo(
          "Upcoming Consultations", 
          `You have ${consultationsWithNames.length} consultations today. Next one at ${consultationTime} with ${nextConsultation.patient_name}`,
          { link: "/health-staff-dashboard?tab=consultations", actionText: "View Schedule" }
        );
      }

    } catch (error) {
      console.error("Error fetching healthcare data:", error);
      notifyError("Data Error", "Failed to load healthcare data");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, notifyInfo, notifyError]);

  const addUserNameToAnalyses = async (analyses: any[]): Promise<ChestAnalysis[]> => {
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

  const addPatientNameToConsultations = async (consultations: any[]): Promise<Consultation[]> => {
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

  const getUniquePatientCount = async (doctorId: string): Promise<number> => {
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

  const updateAnalysis = async (analysisId: string, doctorNotes: string) => {
    if (!user?.id) return false;
    
    try {
      const { error } = await supabase
        .from("chest_analysis")
        .update({
          doctor_notes: doctorNotes,
          doctor_id: user.id,
          status: "reviewed",
          updated_at: new Date().toISOString()
        })
        .eq("id", analysisId);

      if (error) throw error;
      
      notifySuccess(
        "Analysis Updated", 
        "The X-ray analysis has been successfully reviewed",
        { showToast: true }
      );
      
      await fetchData();
      return true;
    } catch (error) {
      console.error("Error updating analysis:", error);
      notifyError(
        "Update Failed", 
        "Failed to update the analysis. Please try again."
      );
      return false;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id, fetchData]);

  return {
    pendingAnalyses,
    completedAnalyses,
    todayConsultations,
    isLoading,
    refreshData: fetchData,
    stats,
    updateAnalysis
  };
};
