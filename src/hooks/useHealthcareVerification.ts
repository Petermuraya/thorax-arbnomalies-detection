
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface HealthcareVerification {
  id: string;
  user_id: string;
  document_path: string;
  license_number: string;
  specialization: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer_notes: string | null;
  reviewer_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useHealthcareVerification = () => {
  const [verification, setVerification] = useState<HealthcareVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchVerification = async () => {
      try {
        const { data, error } = await supabase
          .from('healthcare_verification')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setVerification(data);
      } catch (error) {
        console.error('Error fetching verification:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, [user]);

  const submitVerification = async (file: File, licenseNumber: string, specialization: string) => {
    if (!user) {
      toast.error('Please log in to submit verification');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('healthcare-docs')
        .upload(filePath, file, {
          metadata: {
            user_id: user.id
          }
        });

      if (uploadError) throw uploadError;

      const { data, error: insertError } = await supabase
        .from('healthcare_verification')
        .insert({
          user_id: user.id,
          document_path: filePath,
          license_number: licenseNumber,
          specialization: specialization,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setVerification(data);
      toast.success('Verification documents submitted successfully');
      return data;
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast.error('Failed to submit verification documents');
      return null;
    }
  };

  return { verification, loading, submitVerification };
};
