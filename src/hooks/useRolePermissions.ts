
import { useAuth } from "@/contexts/AuthContext";
import { Role, UserRoles, hasRole } from "@/types/roles";

export const useRolePermissions = () => {
  const { user } = useAuth();
  
  // Get roles from user metadata
  let userRoles: UserRoles = {};
  
  if (user?.user_metadata?.roles) {
    // If user has roles object in metadata, use it
    userRoles = user.user_metadata.roles as UserRoles;
  } else if (user?.user_metadata?.role) {
    // For backward compatibility - convert single role to roles object
    const legacyRole = user.user_metadata.role as Role;
    userRoles = { [legacyRole]: true };
  }

  // If the user is a superuser, they have all permissions
  const isSuperuser = hasRole(userRoles, 'superuser');

  // Permission checks based on roles
  const canVerifyHealthStaff = isSuperuser || hasRole(userRoles, 'admin');
  const canReviewXrays = isSuperuser || hasRole(userRoles, 'healthstaff') || hasRole(userRoles, 'admin');
  const canUploadXrays = isSuperuser || hasRole(userRoles, 'patient') || hasRole(userRoles, 'admin');
  const canManageUsers = isSuperuser || hasRole(userRoles, 'admin');
  const canAccessAdminDashboard = isSuperuser || hasRole(userRoles, 'admin');
  const canAccessHealthStaffDashboard = isSuperuser || hasRole(userRoles, 'healthstaff') || hasRole(userRoles, 'admin');
  const canAccessPatientDashboard = isSuperuser || hasRole(userRoles, 'patient') || hasRole(userRoles, 'admin');

  return {
    userRoles,
    canVerifyHealthStaff,
    canReviewXrays,
    canUploadXrays,
    canManageUsers,
    canAccessAdminDashboard,
    canAccessHealthStaffDashboard,
    canAccessPatientDashboard,
    isAdmin: isSuperuser || hasRole(userRoles, 'admin'),
    isHealthStaff: isSuperuser || hasRole(userRoles, 'healthstaff'),
    isPatient: isSuperuser || hasRole(userRoles, 'patient'),
    isSuperuser
  };
};
