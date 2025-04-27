
import { useAuth } from "@/contexts/AuthContext";

export const useRolePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'patient';

  const canVerifyHealthStaff = userRole === 'admin';
  const canReviewXrays = ['healthstaff', 'admin'].includes(userRole);
  const canUploadXrays = ['patient'].includes(userRole);
  const canManageUsers = userRole === 'admin';

  return {
    userRole,
    canVerifyHealthStaff,
    canReviewXrays,
    canUploadXrays,
    canManageUsers,
    isAdmin: userRole === 'admin',
    isHealthStaff: userRole === 'healthstaff',
    isPatient: userRole === 'patient'
  };
};
