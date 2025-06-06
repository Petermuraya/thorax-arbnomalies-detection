
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { SignupFormInputs } from "./SignupFormInputs";
import { SignupFormFooter } from "./SignupFormFooter";
import { RoleSelector } from "./RoleSelector";
import { Role, UserRoles } from "@/types/roles";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRoles>({ patient: true });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "bg-red-500"
  });

  const handleRoleChange = (role: Role, checked: boolean) => {
    setSelectedRoles(prev => ({
      ...prev,
      [role]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (passwordStrength.score < 2) {
      toast.error("Please choose a stronger password");
      return;
    }
    
    if (!termsAccepted) {
      toast.error("You must agree to the terms and privacy policy");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, { 
        full_name: fullName, 
        roles: selectedRoles
      });
      toast.success("Account created successfully! Verification email sent.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.message) {
        if (error.message.includes("User already registered")) {
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
      <SignupFormInputs
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        passwordStrength={passwordStrength}
        setPasswordStrength={setPasswordStrength}
      />
      
      <RoleSelector 
        selectedRoles={selectedRoles} 
        onRoleChange={handleRoleChange} 
      />
      
      <SignupFormFooter
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        isLoading={isLoading}
        buttonText="Create account"
      />
    </form>
  );
};
