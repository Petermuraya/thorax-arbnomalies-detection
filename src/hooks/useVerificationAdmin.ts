
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface VerificationItem {
  id: string;
  user_id: string;
  license_number: string;
  specialization: string;
  document_path: string;
  status: VerificationStatus;
  reviewer_notes?: string;
  reviewer_id?: string;
  created_at?: string;
  updated_at?: string;
  user_name?: string; // From profiles join
}

export const useVerificationAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const fetchVerifications = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch verifications with user profile data
      const { data, error } = await supabase
        .from('healthcare_verification')
        .select(`
          *,
          profiles:user_id (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to include user_name from the profiles join
      const transformedData = data.map(item => ({
        ...item,
        user_name: item.profiles?.full_name || 'Unknown User'
      }));

      setVerifications(transformedData);

      // Calculate counts
      const pending = transformedData.filter(v => v.status === 'pending').length;
      const approved = transformedData.filter(v => v.status === 'approved').length;
      const rejected = transformedData.filter(v => v.status === 'rejected').length;

      setPendingCount(pending);
      setApprovedCount(approved);
      setRejectedCount(rejected);
    } catch (err) {
      console.error('Error fetching verifications:', err);
      toast.error('Failed to load verification requests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  const updateVerificationStatus = async (id: string, status: VerificationStatus, reviewerNotes?: string) => {
    try {
      const { error } = await supabase
        .from('healthcare_verification')
        .update({
          status,
          reviewer_notes: reviewerNotes,
          reviewer_id: (await supabase.auth.getUser()).data.user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Verification ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      await fetchVerifications(); // Refresh the data
    } catch (err) {
      console.error(`Error updating verification status:`, err);
      toast.error('Failed to update verification status');
    }
  };

  const getDocumentUrl = useCallback((documentPath: string) => {
    const { data } = supabase.storage
      .from('healthcare_documents')
      .getPublicUrl(documentPath);
    
    return data.publicUrl;
  }, []);

  return {
    isLoading,
    verifications,
    pendingCount,
    approvedCount,
    rejectedCount,
    updateVerificationStatus,
    getDocumentUrl,
    refreshVerifications: fetchVerifications
  };
};
