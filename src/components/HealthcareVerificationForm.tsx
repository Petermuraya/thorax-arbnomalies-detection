
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealthcareVerification } from '@/hooks/useHealthcareVerification';
import { Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HealthcareVerificationForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verification, submitVerification } = useHealthcareVerification();

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

  if (verification) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>
            Your verification is {verification.status}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">License Number: {verification.license_number}</p>
            <p className="text-sm text-gray-500">Specialization: {verification.specialization}</p>
            {verification.reviewer_notes && (
              <p className="text-sm text-gray-500">Notes: {verification.reviewer_notes}</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthcare Professional Verification</CardTitle>
        <CardDescription>
          Please submit your credentials for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select onValueChange={setSpecialization} disabled={isSubmitting}>
              <SelectTrigger>
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
            <Label htmlFor="document">License Document</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  <p className="text-sm text-gray-500">{file.name}</p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFile(null)}
                    disabled={isSubmitting}
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
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Upload your medical license or certification (PDF, JPG, PNG, max 10MB)
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthcareVerificationForm;
