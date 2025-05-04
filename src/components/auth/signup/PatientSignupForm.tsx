
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SignupFormInputs } from "./SignupFormInputs";
import { SignupFormFooter } from "./SignupFormFooter";
import { UserRoles } from "@/types/roles";

export const PatientSignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      // Create user roles object with patient role
      const roles: UserRoles = {
        patient: true
      };
      
      await signUp(email, password, { 
        full_name: fullName, 
        roles: roles
      });
      toast.success("Account created successfully! Verification email sent.");
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
      
      <SignupFormFooter
        termsAccepted={termsAccepted}
        setTermsAccepted={setTermsAccepted}
        isLoading={isLoading}
        buttonText="Create patient account"
      />
    </form>
  );
};
