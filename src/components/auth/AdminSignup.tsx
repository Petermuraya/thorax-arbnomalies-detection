import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, User, UserPlus, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
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
    if (!fullName || !email || !password || !confirmPassword || !adminKey) {
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
    
    // Verify admin key (This should be replaced with a more secure method)
    const validAdminKey = "admin123"; // In production, this should be securely stored
    if (adminKey !== validAdminKey) {
      toast.error("Invalid admin key");
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Use the exact role value 'admin' that matches the database constraint
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
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create Admin Account</h1>
        <p className="text-medical-gray">Register as an administrator</p>
      </div>
      
      <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
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
          </div>
          
          <div>
            <label htmlFor="adminKey" className="label-text">
              Admin Registration Key
            </label>
            <div className="relative mt-1">
              <Input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter admin key"
                required
              />
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-medical-gray" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-medical-blue hover:bg-medical-blue-dark flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : (
              <>
                <UserPlus className="h-5 w-5" />
                Create Admin Account
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
