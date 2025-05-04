
// Define Role type as a string literal type
export type Role = "patient" | "healthstaff" | "admin" | "superuser";

// Export a constant list of roles (for forms, selects, etc.)
export const ROLES: Role[] = ["patient", "healthstaff", "admin", "superuser"];

// All possible roles for user-friendly display
export const ROLE_DISPLAY_NAMES: Record<Role, string> = {
  patient: "Patient",
  healthstaff: "Healthcare Professional",
  admin: "Administrator",
  superuser: "Super User"
};

// New: Define a type for users with multiple roles
export type UserRoles = {
  [key in Role]?: boolean;
};

// New: Helper functions for working with multiple roles
export const hasRole = (userRoles: UserRoles | undefined, role: Role): boolean => {
  if (!userRoles) return false;
  return !!userRoles[role];
};

export const addRole = (userRoles: UserRoles, role: Role): UserRoles => {
  return { ...userRoles, [role]: true };
};

export const removeRole = (userRoles: UserRoles, role: Role): UserRoles => {
  const newRoles = { ...userRoles };
  delete newRoles[role];
  return newRoles;
};

export const rolesToArray = (userRoles: UserRoles): Role[] => {
  return Object.entries(userRoles)
    .filter(([_, value]) => value)
    .map(([key, _]) => key as Role);
};

export const arrayToRoles = (roles: Role[]): UserRoles => {
  const userRoles: UserRoles = {};
  roles.forEach(role => {
    userRoles[role] = true;
  });
  return userRoles;
};
