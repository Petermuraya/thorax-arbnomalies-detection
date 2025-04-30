
// Define Role type
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
