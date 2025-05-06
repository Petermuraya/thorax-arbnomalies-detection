
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
  requiredPermission?: 'admin' | 'healthstaff' | 'patient' | null;
}

export const ProtectedRoute = ({ 
  children, 
  redirectPath = "/login",
  requiredPermission = null
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { isSuperuser, isAdmin, isHealthStaff, isPatient } = useRolePermissions();
  const location = useLocation();

  // Show loading state while authenticating
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-medical-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For superusers, always allow access to any route
  if (isSuperuser) {
    return <>{children}</>;
  }
  
  // Check permissions if a specific permission is required
  if (requiredPermission) {
    const hasPermission = 
      (requiredPermission === 'admin' && isAdmin) ||
      (requiredPermission === 'healthstaff' && isHealthStaff) ||
      (requiredPermission === 'patient' && isPatient);
    
    if (!hasPermission) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/profile" replace />;
    }
  }

  // If user is authenticated and has required permissions, allow access to the route
  return <>{children}</>;
};
