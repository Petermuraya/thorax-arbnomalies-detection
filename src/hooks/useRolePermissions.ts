
import { useAuth } from "@/contexts/AuthContext";

export const useRolePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'patient';

  // Make sure we're using consistent role values that match the database constraint
  // 'patient', 'healthstaff', and 'admin' should be the exact values used in the database
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
