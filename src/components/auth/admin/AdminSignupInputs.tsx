
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, User, KeyRound } from "lucide-react";
import { useState } from "react";
import { PasswordStrengthIndicator } from "../shared/PasswordStrengthIndicator";

interface AdminSignupInputsProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  adminKey: string;
  setAdminKey: (value: string) => void;
}

export const AdminSignupInputs = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  adminKey,
  setAdminKey,
}: AdminSignupInputsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            onChange={(e) => setPassword(e.target.value)}
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
        {password && <PasswordStrengthIndicator password={password} />}
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
    </>
  );
};
