
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard. You have access to manage users, review healthcare professionals, and analyze system data.</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
