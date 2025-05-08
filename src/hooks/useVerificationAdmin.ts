
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

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
      console.log('Fetching verifications...');
      
      // Fetch all verifications first with proper ordering
      const { data, error } = await supabase
        .from('healthcare_verification')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching verifications:', error);
        throw error;
      }
      
      console.log('Fetched verifications:', data?.length || 0);

      // Transform data to include proper typing for status
      const transformedData = data.map(item => ({
        ...item,
        status: item.status as VerificationStatus, // Cast to ensure it's the correct type
        user_name: 'Unknown User' // Default name
      }));

      // Get user profiles in a separate query for each verification
      const profilePromises = transformedData.map(async (item) => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', item.user_id)
          .single();

        if (!profileError && profileData) {
          item.user_name = profileData.full_name || 'Unknown User';
        } else if (profileError) {
          console.warn(`Could not fetch profile for user ${item.user_id}:`, profileError);
        }
        return item;
      });

      // Wait for all profile data to be fetched
      const verificationWithProfiles = await Promise.all(profilePromises);
      
      setVerifications(verificationWithProfiles as VerificationItem[]);

      // Calculate counts
      const pending = verificationWithProfiles.filter(v => v.status === 'pending').length;
      const approved = verificationWithProfiles.filter(v => v.status === 'approved').length;
      const rejected = verificationWithProfiles.filter(v => v.status === 'rejected').length;

      console.log('Verification counts:', { pending, approved, rejected });
      
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
