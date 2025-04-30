
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, VALID_USER_ROLES } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AdminSignupInputs } from "./AdminSignupInputs";
import { PasswordStrengthIndicator } from "../shared/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";

export const AdminSignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword || !adminKey) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const validAdminKey = "admin123"; // In production, this should be securely stored
    if (adminKey !== validAdminKey) {
      toast.error("Invalid admin key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ensure we're using the exact string value expected by the database
      const role = "admin";
      
      // Verify the role is valid
      if (!VALID_USER_ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      
      console.log("Attempting admin registration with role:", role);
      
      await signUp(email, password, { 
        full_name: fullName, 
        role: role
      });
      toast.success("Admin account created successfully! Verification email sent.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";
      
      // Extract more specific error messages if available
      if (error.message) {
        if (error.message.includes("role_check")) {
          errorMessage = "Invalid role selection. This appears to be a database constraint issue. Check if 'admin' is an allowed role value.";
        } else if (error.message.includes("User already registered")) {
          errorMessage = "This email is already registered. Please use a different email or login instead.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminSignupInputs
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        adminKey={adminKey}
        setAdminKey={setAdminKey}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-medical-blue hover:bg-medical-blue-dark flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md text-white"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Admin Account"}
      </Button>
    </form>
  );
};
