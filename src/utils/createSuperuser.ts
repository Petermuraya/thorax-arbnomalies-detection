
import { supabase } from "@/integrations/supabase/client";
import { Role } from "@/types/roles";

export const createSuperuser = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    // Explicitly set role to superuser
    const role: Role = "superuser";
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) throw error;
    
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
