
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AdminSignupInputs } from "./AdminSignupInputs";
import { PasswordStrengthIndicator } from "../shared/PasswordStrengthIndicator";

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
      await signUp(email, password, { full_name: fullName, role: 'admin' });
      toast.success("Admin account created successfully! Verification email sent.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
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
      <button 
        type="submit" 
        className="w-full bg-medical-blue hover:bg-medical-blue-dark flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md text-white"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Admin Account"}
      </button>
    </form>
  );
};
