
import { Navigate, useLocation, useNavigate, useEffect, useState } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { supabase } from "@/integrations/supabase/client";
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
  const navigate = useNavigate();
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && !user) {
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      // For logged in users, check permissions if a specific permission is required
      if (!loading && user && requiredPermission) {
        const hasPermission = 
          (requiredPermission === 'admin' && isAdmin) ||
          (requiredPermission === 'healthstaff' && isHealthStaff) ||
          (requiredPermission === 'patient' && isPatient) ||
          isSuperuser;
        
        if (!hasPermission) {
          toast.error("You don't have permission to access this page");
          navigate('/profile', { replace: true });
          return;
        }

        // Special case for healthstaff: check verification status
        if (requiredPermission === 'healthstaff' && isHealthStaff) {
          setIsCheckingVerification(true);
          try {
            const { data, error } = await supabase
              .from('healthcare_verification')
              .select('status')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();
            
            if (error) throw error;
            
            if (data && data.status !== 'approved') {
              // If not on the verification status page, redirect there
              if (location.pathname !== '/verification-status') {
                navigate('/verification-status', { replace: true });
                return;
              }
            }
          } catch (err) {
            console.error("Error checking verification status:", err);
            // If we can't determine verification status, let them proceed
            // but this could be handled differently
          } finally {
            setIsCheckingVerification(false);
          }
        }
      }
    };
    
    checkAuth();
  }, [user, loading, requiredPermission, isAdmin, isHealthStaff, isPatient, isSuperuser, navigate, location]);

  // Show loading state while authenticating or checking verification
  if (loading || isCheckingVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-medical-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If user is authenticated and we've passed permission checks in useEffect (which would have redirected if failed)
  // Just render the children
  return <>{children}</>;
};
