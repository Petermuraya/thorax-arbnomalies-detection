
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

const HealthStaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Health Staff Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard. You can manage and review patient data here.</p>
      </div>
    </DashboardLayout>
  );
};

export default HealthStaffDashboard;
