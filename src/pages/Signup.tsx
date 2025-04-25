
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "bg-red-500"
  });

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Set strength based on score
    let label, color;
    switch (score) {
      case 4:
        label = "Strong";
        color = "bg-green-500";
        break;
      case 3:
        label = "Good";
        color = "bg-blue-500";
        break;
      case 2:
        label = "Fair";
        color = "bg-yellow-500";
        break;
      default:
        label = "Weak";
        color = "bg-red-500";
    }
    
    setPasswordStrength({ score, label, color });
    return score;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
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
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to register the user
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate a successful registration
      toast.success("Account created successfully! Verification email sent.");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google signup integration coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create an account</h1>
            <p className="text-medical-gray">Join XRay Insight for better healthcare outcomes</p>
          </div>
          
          <div className="medical-card p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="label-text">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field pl-10"
                    placeholder="John Smith"
                    required
                  />
                  <User className="absolute left-3 top-3 h-5 w-5 text-medical-gray" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="label-text">
                  Email address
                </label>
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-medical-gray" />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="label-text">
                  Password
                </label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-medical-gray" />
                    ) : (
                      <Eye className="h-5 w-5 text-medical-gray" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-medical-gray-dark ml-2 w-12">
                        {passwordStrength.label}
                      </span>
                    </div>
                    <p className="text-xs text-medical-gray">
                      Use at least 8 characters with uppercase letters, numbers, and symbols
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="label-text">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-medical-gray" />
                    ) : (
                      <Eye className="h-5 w-5 text-medical-gray" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>
              
              <div>
                <label className="label-text mb-3 inline-block">Select Role</label>
                <RadioGroup value={role} onValueChange={setRole}>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patient" id="patient" />
                      <Label htmlFor="patient">Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="healthstaff" id="healthstaff" />
                      <Label htmlFor="healthstaff">Healthcare Professional</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-medical-gray"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-medical-blue hover:text-medical-blue-dark">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-medical-blue hover:text-medical-blue-dark">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical-blue hover:bg-medical-blue-dark"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-medical-gray-light"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-medical-gray">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={handleGoogleSignup}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-medical-gray">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-medical-blue hover:text-medical-blue-dark">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
