
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useNotify } from "@/hooks/useNotify";
import { ChestAnalysis, Consultation, HealthcareStats } from "@/types/healthcare";
import { 
  fetchPendingAnalyses, 
  fetchCompletedAnalyses, 
  fetchTodayConsultations,
  updateAnalysis as updateAnalysisService,
  scheduleConsultation as scheduleConsultationService,
  getUniquePatientCount
} from "@/services/healthcareService";
import { 
  addUserNameToAnalyses,
  addPatientNameToConsultations 
} from "@/utils/healthcareUtils";

export { ChestAnalysis, Consultation } from "@/types/healthcare";

export const useHealthcareStaff = () => {
  const [pendingAnalyses, setPendingAnalyses] = useState<ChestAnalysis[]>([]);
  const [completedAnalyses, setCompletedAnalyses] = useState<ChestAnalysis[]>([]);
  const [todayConsultations, setTodayConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<HealthcareStats>({
    pendingAnalysesCount: 0,
    completedAnalysesCount: 0,
    todayConsultationsCount: 0,
    totalPatientsCount: 0
  });
  
  const { user } = useAuth();
  const { notifyInfo, notifyError } = useNotify();
  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!user?.id || isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching healthcare staff data...");
      
      // Fetch analyses that need doctor review (pending)
      const pendingData = await fetchPendingAnalyses();
      const pendingWithUserNames = await addUserNameToAnalyses(pendingData);
      setPendingAnalyses(pendingWithUserNames);

      // Fetch completed analyses
      const completedData = await fetchCompletedAnalyses(user.id);
      const completedWithUserNames = await addUserNameToAnalyses(completedData);
      setCompletedAnalyses(completedWithUserNames);

      // Get today's consultations
      const consultationsData = await fetchTodayConsultations(user.id);
      const consultationsWithNames = await addPatientNameToConsultations(consultationsData);
      setTodayConsultations(consultationsWithNames);

      // Update stats
      setStats({
        pendingAnalysesCount: pendingWithUserNames.length,
        completedAnalysesCount: completedWithUserNames.length,
        todayConsultationsCount: consultationsWithNames.length,
        totalPatientsCount: await getUniquePatientCount(user.id)
      });
      
    } catch (error) {
      console.error("Error fetching healthcare data:", error);
      setError("Failed to load healthcare data. Please try again.");
      notifyError(
        "Data Loading Error", 
        "We encountered a problem loading your healthcare data. Please try refreshing."
      );
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [user?.id, notifyError]);

  const updateAnalysis = async (analysisId: string, doctorNotes: string) => {
    if (!user?.id) return false;
    
    const success = await updateAnalysisService(user.id, analysisId, doctorNotes);
    if (success) {
      await fetchData();
    }
    return success;
  };

  const scheduleConsultation = async (patientId: string, scheduledFor: string) => {
    if (!user?.id) return false;
    
    const success = await scheduleConsultationService(user.id, patientId, scheduledFor);
    if (success) {
      await fetchData();
    }
    return success;
  };

  // Set up realtime subscription for new analyses
  useEffect(() => {
    if (!user?.id) return;
    
    // Create a subscription for new analyses
    const channel = supabase
      .channel('healthcare_staff_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chest_analysis',
          filter: `status=eq.pending`
        },
        (payload) => {
          console.log("New analysis submitted:", payload);
          // Refresh the data to get the latest
          fetchData();
          
          // Show notification for new analysis
          notifyInfo(
            "New Analysis Submitted", 
            "A new X-ray has been submitted for review", 
            { 
              showToast: true,
              link: "/health-staff-dashboard?tab=pending-analysis",
              actionText: "Review Now"
            }
          );
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, notifyInfo, fetchData]);

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
    error,
    refreshData: fetchData,
    stats,
    updateAnalysis,
    scheduleConsultation
  };
};
