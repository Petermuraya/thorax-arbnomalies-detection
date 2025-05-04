
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { Role, hasRole } from "@/types/roles";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  redirectPath 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { userRoles, isSuperuser } = useRolePermissions();

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

  // Superusers can access any route
  if (isSuperuser) {
    return <>{children}</>;
  }

  // Check if user has any of the required roles
  if (allowedRoles && 
      !allowedRoles.some(role => hasRole(userRoles, role))) {
    toast.error(`Access denied. You don't have permission to access this page.`);
    
    // Redirect to appropriate dashboard based on roles
    if (redirectPath) {
      return <Navigate to={redirectPath} replace />;
    } else if (hasRole(userRoles, 'admin')) {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (hasRole(userRoles, 'healthstaff')) {
      return <Navigate to="/health-staff-dashboard" replace />;
    } else {
      return <Navigate to="/patient-dashboard" replace />;
    }
  }

  return <>{children}</>;
};
