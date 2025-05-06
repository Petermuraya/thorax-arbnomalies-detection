
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Role, UserRoles } from "@/types/roles";
import { AuthContextType } from "./types";
import { VALID_USER_ROLES, resolveUserRoles, getDashboardRoute } from "./utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);

        // Use setTimeout to avoid navigation issues
        if (event === 'SIGNED_IN') {
          setTimeout(() => {
            // Check if user has metadata, if not (Google sign-in) fetch from profiles table
            if (currentSession?.user) {
              // Check for roles or legacy role in metadata
              const userRoles = resolveUserRoles(currentSession.user);
              
              // If this is a new Google signup, check for stored role preference
              if (event === 'SIGNED_IN' && !currentSession.user.user_metadata?.roles && !currentSession.user.user_metadata?.role) {
                const storedRole = localStorage.getItem("signupRole");
                if (storedRole && VALID_USER_ROLES.includes(storedRole as Role)) {
                  const newRoles = { [storedRole as Role]: true };
                  
                  // Clear stored role
                  localStorage.removeItem("signupRole");
                  
                  // Update user metadata with the selected role
                  supabase.auth.updateUser({
                    data: { roles: newRoles }
                  }).catch(error => {
                    console.error("Error updating user roles:", error);
                  });
                }
              }
              
              toast.success(`Welcome back, ${currentSession.user.user_metadata?.full_name || currentSession.user.email}`);
              
              // Navigate based on roles priority
              navigate(getDashboardRoute(userRoles));
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            toast.info("You have been signed out");
            navigate('/login');
          }, 0);
        } else if (event === 'USER_UPDATED') {
          // Refresh user data
          setUser(currentSession?.user ?? null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) throw error;
  };

  const signUp = async (email: string, password: string, metadata: { full_name: string; roles?: UserRoles; role?: Role }) => {
    // Convert legacy role to roles object if needed
    let userRoles: UserRoles = {};
    
    if (metadata.roles) {
      userRoles = metadata.roles;
    } else if (metadata.role) {
      if (VALID_USER_ROLES.includes(metadata.role)) {
        userRoles = { [metadata.role]: true };
      } else {
        console.error(`Role '${metadata.role}' is not valid`);
        throw new Error(`Invalid role: ${metadata.role}. Must be one of: ${VALID_USER_ROLES.join(', ')}`);
      }
    } else {
      // Default to patient if no role specified
      userRoles = { patient: true };
    }
    
    console.log("Signing up with roles:", userRoles);
    
    // Final metadata with roles
    const finalMetadata = { 
      ...metadata,
      roles: userRoles
    };
    
    // Remove legacy role if it exists
    if ('role' in finalMetadata) {
      delete finalMetadata.role;
    }
    
    console.log("Final metadata being sent:", finalMetadata);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: finalMetadata,
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateUserRoles = async (roles: UserRoles) => {
    const { error } = await supabase.auth.updateUser({
      data: { roles }
    });

    if (error) {
      console.error("Error updating user roles:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signUp, 
      signInWithGoogle,
      signOut, 
      loading,
      resetPassword,
      updateUserRoles
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = AuthContext;
