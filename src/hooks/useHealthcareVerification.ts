
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
        if (data) {
          setVerification(data as HealthcareVerification);
        }
      } catch (error: any) {
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
      // First, ensure the healthcare-docs bucket exists (this is handled by backend)
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      const filePath = `${user.id}/${fileName}.${fileExt}`;

      console.log('Uploading file to:', filePath);
      
      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('healthcare-docs')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`File upload failed: ${uploadError.message}`);
      }

      console.log('File uploaded successfully:', uploadData);
      
      // Insert verification record in the database
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

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error(`Database record failed: ${insertError.message}`);
      }

      setVerification(data as HealthcareVerification);
      toast.success('Verification documents submitted successfully');
      return data as HealthcareVerification;
    } catch (error: any) {
      console.error('Error submitting verification:', error);
      toast.error(`Failed to submit verification documents: ${error.message}`);
      return null;
    }
  };

  return { verification, loading, submitVerification };
};
