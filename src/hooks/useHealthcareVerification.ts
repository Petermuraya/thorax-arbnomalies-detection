import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export const useHealthcareVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
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

  return {
    verifyHealthcareProfessional,
    isVerifying,
    verificationError,
    isVerified,
  };
};
