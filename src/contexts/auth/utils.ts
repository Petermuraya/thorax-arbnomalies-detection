
import { supabase } from "@/integrations/supabase/client";
import { Role, ROLES, UserRoles } from "@/types/roles";

// Define valid roles as a constant to ensure consistency across the application
export const VALID_USER_ROLES = ROLES;

// Function to resolve user roles from metadata
export const resolveUserRoles = (userData: any): UserRoles => {
  let userRoles: UserRoles = {};
  
  if (userData?.user_metadata?.roles) {
    userRoles = userData.user_metadata.roles as UserRoles;
  } else if (userData?.user_metadata?.role) {
    const legacyRole = userData.user_metadata.role as Role;
    if (VALID_USER_ROLES.includes(legacyRole)) {
      userRoles = { [legacyRole]: true };
    }
  }
  
  return userRoles;
};

// Determine dashboard route based on user roles
export const getDashboardRoute = (userRoles: UserRoles): string => {
  if (userRoles.superuser) {
    return '/admin-dashboard';
  } else if (userRoles.admin) {
    return '/admin-dashboard';
  } else if (userRoles.healthstaff) {
    return '/health-staff-dashboard';
  } else if (userRoles.patient) {
    return '/patient-dashboard';
  } else {
    // If no specific role, default to patient dashboard
    return '/patient-dashboard';
  }
};
