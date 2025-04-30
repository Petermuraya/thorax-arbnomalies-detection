
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, VALID_USER_ROLES } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SignupFormInputs } from "./SignupFormInputs";
import { SignupFormFooter } from "./SignupFormFooter";

export const HealthcareSignupForm = () => {
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
      // Ensure we're using the exact string value expected by the database
      const role = "healthstaff";
      
      // Verify the role is valid
      if (!VALID_USER_ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      
      await signUp(email, password, { 
        full_name: fullName, 
        role: role
      });
      toast.success("Healthcare account created successfully! Verification email sent.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      // Extract more specific error messages if available
      if (error.message) {
        if (error.message.includes("role_check")) {
          errorMessage = "Invalid role selection. This appears to be a database constraint issue.";
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
        buttonText="Create healthcare account"
      />
    </form>
  );
};
