
import { User, Session } from "@supabase/supabase-js";
import { Role, UserRoles } from "@/types/roles";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { full_name: string; roles?: UserRoles; role?: Role }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
  updateUserRoles: (roles: UserRoles) => Promise<void>;
}
