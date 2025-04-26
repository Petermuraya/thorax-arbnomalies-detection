
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealthcareVerification } from '@/hooks/useHealthcareVerification';
import { Upload } from 'lucide-react';

const HealthcareVerificationForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verification, submitVerification } = useHealthcareVerification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !licenseNumber || !specialization) {
      return;
    }

    setIsSubmitting(true);
    await submitVerification(file, licenseNumber, specialization);
    setIsSubmitting(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select onValueChange={setSpecialization} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radiologist">Radiologist</SelectItem>
                <SelectItem value="pulmonologist">Pulmonologist</SelectItem>
                <SelectItem value="general_practitioner">General Practitioner</SelectItem>
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
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
              {file ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">{file.name}</p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFile(null)}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('document')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!file || !licenseNumber || !specialization || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthcareVerificationForm;
