
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, User } from "lucide-react";

interface SignupFormInputsProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  passwordStrength: {
    score: number;
    label: string;
    color: string;
  };
  setPasswordStrength: (value: { score: number; label: string; color: string; }) => void;
}

export const SignupFormInputs = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  setPasswordStrength,
}: SignupFormInputsProps) => {
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
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

  return (
    <>
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
    </>
  );
};
