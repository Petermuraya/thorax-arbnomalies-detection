
import { Role, UserRoles } from "@/types/roles";

/**
 * Gets the appropriate dashboard route based on user roles
 */
export const getDashboardRoute = (userRoles: UserRoles | undefined): string => {
  if (!userRoles) {
    return '/login';
  }
  
  // Priority order: admin -> healthstaff -> patient
  if (userRoles.admin) {
    return '/admin-dashboard';
  } else if (userRoles.healthstaff) {
    return '/health-staff-dashboard';
  } else if (userRoles.patient) {
    return '/patient-dashboard';
  } else {
    return '/profile';
  }
};
