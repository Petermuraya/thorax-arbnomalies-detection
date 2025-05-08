import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { VerificationItem } from './useVerificationAdmin';

interface VerificationData {
  id?: string;
  user_id: string;
  license_number: string;
  specialization: string;
  document_path: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer_notes?: string;
  reviewer_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useHealthcareVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verification, setVerification] = useState<VerificationData | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const { user } = useAuth();

  const verifyHealthcareProfessional = async (licenseNumber: string) => {
    setIsVerifying(true);
    setVerificationError(null);

    if (!user?.id) {
      setVerificationError("User ID not found. Please ensure you are logged in.");
      setIsVerifying(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('verify-healthcare-professional', {
        body: {
          user_id: user.id,
          license_number: licenseNumber,
        },
      });

      if (error) {
        console.error("Verification error:", error);
        setVerificationError(error.message || "An error occurred during verification.");
      } else if (data?.success) {
        setIsVerified(true);
        console.log("Healthcare professional verified successfully.");
      } else {
        setVerificationError(data?.message || "Verification failed. Please check your license number.");
      }
    } catch (err) {
      console.error("Unexpected verification error:", err);
      setVerificationError("An unexpected error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const submitVerification = async (file: File, licenseNumber: string, specialization: string) => {
    if (!user?.id) {
      setVerificationError("User ID not found. Please ensure you are logged in.");
      return false;
    }

    try {
      setIsVerifying(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `verifications/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('healthcare_documents')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const verificationData: VerificationData = {
        user_id: user.id,
        license_number: licenseNumber,
        specialization,
        document_path: filePath,
        status: 'pending'
      };
      
      const { data, error } = await supabase
        .from('healthcare_verification')
        .insert(verificationData)
        .select()
        .single();
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('healthcare_documents')
        .getPublicUrl(filePath);
        
      setDocumentUrl(urlData.publicUrl);
      
      if (data) {
        const typedData = data as unknown as VerificationData;
        setVerification(typedData);
      }
      
      return true;
    } catch (err) {
      console.error("Verification submission error:", err);
      setVerificationError("An error occurred while submitting verification. Please try again.");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchVerificationStatus = async (): Promise<{ data: VerificationItem[] | null; error: any }> => {
    if (!user?.id) {
      return { data: null, error: new Error("User ID not found. Please ensure you are logged in.") };
    }

    try {
      const { data, error } = await supabase
        .from('healthcare_verification')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data && data.length > 0 && data[0].document_path) {
        const { data: urlData } = supabase.storage
          .from('healthcare_documents')
          .getPublicUrl(data[0].document_path);
          
        setDocumentUrl(urlData.publicUrl);
      }
      
      if (data && data.length > 0) {
        setVerification(data[0] as VerificationData);
        setIsVerified(data[0].status === 'approved');
      }
      
      return { 
        data: data as unknown as VerificationItem[], 
        error: null 
      };
    } catch (err) {
      console.error("Error fetching verification status:", err);
      setVerificationError("Failed to fetch verification status.");
      return { data: null, error: err };
    }
  };

  return {
    verifyHealthcareProfessional,
    isVerifying,
    verificationError,
    isVerified,
    verification,
    documentUrl,
    submitVerification,
    fetchVerificationStatus
  };
};
