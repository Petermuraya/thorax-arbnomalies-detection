
import { User } from "@supabase/supabase-js";
import { Role, UserRoles } from "@/types/roles";
import { getDashboardRoute } from "@/utils/navigation";

export const VALID_USER_ROLES: Role[] = ['admin', 'healthstaff', 'patient', 'superuser'];

/**
 * Resolves user roles from user metadata
 */
export const resolveUserRoles = (user: User | null): UserRoles => {
  if (!user) return {};
  
  // Check for roles object in user metadata (new format)
  if (user.user_metadata?.roles) {
    return user.user_metadata.roles as UserRoles;
  }
  
  // Check for legacy role string in user metadata
  if (user.user_metadata?.role && typeof user.user_metadata.role === 'string') {
    const legacyRole = user.user_metadata.role as string;
    if (VALID_USER_ROLES.includes(legacyRole as Role)) {
      return { [legacyRole]: true } as UserRoles;
    }
  }
  
  // Default to empty roles
  return {};
};

// Re-export getDashboardRoute from navigation utils
export { getDashboardRoute };
