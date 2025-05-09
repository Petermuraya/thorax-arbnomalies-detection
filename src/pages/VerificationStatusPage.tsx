
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { StatusDisplay } from '@/components/verification/StatusDisplay';
import { DocumentUploader } from '@/components/verification/DocumentUploader';

const VerificationStatusPage = () => {
  const { user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  const fetchVerificationStatus = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('healthcare_verification')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching verification status:", error);
        toast.error("Failed to fetch verification status.");
        setVerificationStatus(null);
      } else if (data) {
        setVerificationStatus(data.status);
      } else {
        setVerificationStatus(null); // No verification record found
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!user) return;
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const filePath = `healthcare-documents/${user.id}/${file.name}`;
      const { error: storageError } = await supabase.storage
        .from('healthcare-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (storageError) {
        console.error("Error uploading file:", storageError);
        setUploadError("Failed to upload file. Please try again.");
        return;
      }

      // File uploaded successfully, now create a verification request
      const { error: dbError } = await supabase
        .from('healthcare_verification')
        .insert([
          { 
            user_id: user.id, 
            document_path: filePath,
            license_number: 'TEMP_LICENSE', // Replace with actual form data later
            specialization: 'TEMP_SPECIALIZATION' // Replace with actual form data later
          }
        ]);

      if (dbError) {
        console.error("Error creating verification request:", dbError);
        setUploadError("Failed to create verification request. Please try again.");
        return;
      }

      toast.success("Verification request submitted successfully!");
      setVerificationStatus('pending');
      navigate('/verification-status');
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("An unexpected error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">Verification Status</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
          <span className="ml-2">Checking status...</span>
        </div>
      ) : (
        <>
          <StatusDisplay status={verificationStatus as 'approved' | 'pending' | 'rejected' | null} />
          
          {verificationStatus === 'rejected' && (
            <DocumentUploader 
              error={uploadError}
              uploading={uploading}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
            />
          )}
          
          {!verificationStatus && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please upload your healthcare license or relevant document for verification.</p>
              <DocumentUploader 
                error={uploadError}
                uploading={uploading}
                onFileChange={handleFileChange}
                onUpload={handleUpload}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerificationStatusPage;
