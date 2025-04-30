
import { useAuth } from "@/contexts/AuthContext";

export const useRolePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'patient';

  // If the user is a superuser, they have all permissions
  const isSuperuser = userRole === 'superuser';

  // Make sure we're using consistent role values that match the database constraint
  // 'patient', 'healthstaff', 'admin', and 'superuser' should be the exact values used in the database
  const canVerifyHealthStaff = isSuperuser || userRole === 'admin';
  const canReviewXrays = isSuperuser || ['healthstaff', 'admin'].includes(userRole);
  const canUploadXrays = isSuperuser || ['patient', 'admin'].includes(userRole);
  const canManageUsers = isSuperuser || userRole === 'admin';
  const canAccessAdminDashboard = isSuperuser || userRole === 'admin';
  const canAccessHealthStaffDashboard = isSuperuser || ['healthstaff', 'admin'].includes(userRole);
  const canAccessPatientDashboard = isSuperuser || ['patient', 'admin'].includes(userRole);

  return {
    userRole,
    canVerifyHealthStaff,
    canReviewXrays,
    canUploadXrays,
    canManageUsers,
    canAccessAdminDashboard,
    canAccessHealthStaffDashboard,
    canAccessPatientDashboard,
    isAdmin: isSuperuser || userRole === 'admin',
    isHealthStaff: isSuperuser || userRole === 'healthstaff',
    isPatient: isSuperuser || userRole === 'patient',
    isSuperuser
  };
};
