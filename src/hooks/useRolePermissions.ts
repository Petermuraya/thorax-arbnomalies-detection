
import { useAuth } from "@/contexts/AuthContext";

export const useRolePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'patient';

  const canVerifyHealthStaff = userRole === 'admin';
  const canReviewXrays = ['healthstaff', 'admin'].includes(userRole);
  const canUploadXrays = ['patient', 'admin'].includes(userRole);
  const canManageUsers = userRole === 'admin';
  const canAccessAdminDashboard = userRole === 'admin';
  const canAccessHealthStaffDashboard = ['healthstaff', 'admin'].includes(userRole);
  const canAccessPatientDashboard = ['patient', 'admin'].includes(userRole);

  return {
    userRole,
    canVerifyHealthStaff,
    canReviewXrays,
    canUploadXrays,
    canManageUsers,
    canAccessAdminDashboard,
    canAccessHealthStaffDashboard,
    canAccessPatientDashboard,
    isAdmin: userRole === 'admin',
    isHealthStaff: userRole === 'healthstaff',
    isPatient: userRole === 'patient'
  };
};
