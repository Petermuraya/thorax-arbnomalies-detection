
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

interface VerificationData {
  id?: string;
  user_id: string;
  license_number: string;
  specialization: string;
  document_path?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer_notes?: string;
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
      // Call the Supabase function to verify healthcare professional status
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
      
      // Upload document
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `verifications/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('healthcare_documents')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Create verification record
      const verificationData: VerificationData = {
        user_id: user.id,
        license_number: licenseNumber,
        specialization,
        document_path: filePath,
        status: 'pending'
      };
      
      const { data, error } = await supabase
        .from('healthcare_verifications')
        .insert(verificationData)
        .select()
        .single();
        
      if (error) throw error;
      
      // Get document URL
      const { data: urlData } = supabase.storage
        .from('healthcare_documents')
        .getPublicUrl(filePath);
        
      setDocumentUrl(urlData.publicUrl);
      setVerification(data);
      
      return true;
    } catch (err) {
      console.error("Verification submission error:", err);
      setVerificationError("An error occurred while submitting verification. Please try again.");
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verifyHealthcareProfessional,
    isVerifying,
    verificationError,
    isVerified,
    verification,
    documentUrl,
    submitVerification
  };
};
