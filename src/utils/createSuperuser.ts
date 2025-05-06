
import { supabase } from "@/integrations/supabase/client";
import { Role, addRole, UserRoles } from "@/types/roles";

export const createSuperuser = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    // Create user roles object with superuser role
    const userRoles: UserRoles = { superuser: true };
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          roles: userRoles
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) throw error;
    
    // If the user was created successfully, log success message
    console.log("Superuser created successfully:", data);
    
    return {
      success: true,
      message: "Superuser created successfully",
      data
    };
  } catch (error: any) {
    console.error("Error creating superuser:", error);
    return {
      success: false,
      message: error.message || "Failed to create superuser",
      error
    };
  }
};
