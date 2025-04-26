
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HealthcareVerificationForm from '@/components/HealthcareVerificationForm';
import { useHealthcareVerification } from '@/hooks/useHealthcareVerification';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const HealthStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { verification, loading } = useHealthcareVerification();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.user_metadata?.role !== 'healthstaff') {
      toast.error('Access denied. This page is for healthcare professionals only.');
      navigate('/');
    }
  }, [user, navigate]);

  // Show loading state while verification status is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-gray-500">Loading verification status...</p>
      </div>
    );
  }

  // If not verified or pending verification
  if (!verification || verification.status !== 'approved') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <HealthcareVerificationForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Healthcare Professional Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assigned Cases</h2>
            {/* Implementation for assigned cases */}
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Analysis Results</h2>
            {/* Implementation for AI analysis results */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthStaffDashboard;
