
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealthcareVerification } from '@/hooks/useHealthcareVerification';
import { Upload, FileCheck, FileX, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const HealthcareVerificationForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verification, documentUrl, submitVerification } = useHealthcareVerification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!file) {
      setError('Please select a document to upload');
      return;
    }
    
    if (!licenseNumber) {
      setError('Please enter your license number');
      return;
    }
    
    if (!specialization) {
      setError('Please select your specialization');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitVerification(file, licenseNumber, specialization);
      if (!result) {
        setError('Verification submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (verification) {
    return (
      <Card className="overflow-hidden border border-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-40 z-0"></div>
        <CardHeader className="relative z-10 border-b border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-indigo-700">Verification Status</CardTitle>
              <CardDescription className="text-slate-600">
                Your verification is currently being processed
              </CardDescription>
            </div>
            <Badge className={`${getStatusColor(verification.status)}`}>
              {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
                <p className="text-sm text-gray-500 mb-1">License Number</p>
                <p className="font-medium text-indigo-900">{verification.license_number}</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
                <p className="text-sm text-gray-500 mb-1">Specialization</p>
                <p className="font-medium text-indigo-900">{verification.specialization}</p>
              </div>
            </div>
            
            <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
              <p className="text-sm text-gray-500 mb-2">Submitted Document</p>
              <div className="flex items-center">
                {verification.document_path ? (
                  documentUrl ? (
                    <a 
                      href={documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <FileCheck className="h-5 w-5 mr-2" />
                      View Document
                    </a>
                  ) : (
                    <span className="text-gray-500 flex items-center">
                      <FileX className="h-5 w-5 mr-2" />
                      Document not available for preview
                    </span>
                  )
                ) : (
                  <span className="text-gray-500">No document uploaded</span>
                )}
              </div>
            </div>
            
            {verification.reviewer_notes && (
              <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
                <p className="text-sm text-gray-500 mb-1">Reviewer Notes</p>
                <p className="text-gray-700">{verification.reviewer_notes}</p>
              </div>
            )}
            
            {verification.status === 'pending' && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    <div className="animate-pulse h-3 w-3 rounded-full bg-amber-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Verification In Progress</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Your credentials are being reviewed by our team. This process typically takes 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {verification.status === 'approved' && (
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-emerald-800">Verification Approved</h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      Your healthcare professional status has been verified. You now have access to all healthcare staff features.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {verification.status === 'rejected' && (
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-rose-800">Verification Rejected</h4>
                    <p className="text-xs text-rose-700 mt-1">
                      Unfortunately, your verification was not approved. Please review any notes from the reviewer and resubmit if needed.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-40 z-0"></div>
      <CardHeader className="relative z-10 border-b border-indigo-100">
        <CardTitle className="text-indigo-700">Healthcare Professional Verification</CardTitle>
        <CardDescription className="text-slate-600">
          Please submit your credentials for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4 bg-rose-50 border-rose-200">
            <AlertDescription className="text-rose-800">{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license" className="text-slate-700">License Number</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
              disabled={isSubmitting}
              className="border-indigo-200 focus:border-indigo-300 focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization" className="text-slate-700">Specialization</Label>
            <Select onValueChange={setSpecialization} disabled={isSubmitting}>
              <SelectTrigger className="border-indigo-200 focus:border-indigo-300 focus:ring-indigo-200">
                <SelectValue placeholder="Select your specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radiologist">Radiologist</SelectItem>
                <SelectItem value="pulmonologist">Pulmonologist</SelectItem>
                <SelectItem value="general_practitioner">General Practitioner</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document" className="text-slate-700">License Document</Label>
            <div className="border-2 border-dashed border-indigo-200 rounded-lg p-6 text-center bg-white/60">
              <input
                id="document"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              {file ? (
                <div className="space-y-2">
                  <p className="text-sm text-indigo-700">{file.name}</p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFile(null)}
                    disabled={isSubmitting}
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('document')?.click()}
                  disabled={isSubmitting}
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              )}
              <p className="text-xs text-slate-500 mt-2">
                Upload your medical license or certification (PDF, JPG, PNG, max 10MB)
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit for Verification'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthcareVerificationForm;
