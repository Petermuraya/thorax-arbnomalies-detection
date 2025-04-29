
import { useState } from "react";
import { Eye, EyeOff, Mail, User, KeyRound } from "lucide-react";
import { IconInput } from "../shared/IconInput";
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
      <IconInput
        id="fullName"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        label="Full Name"
        placeholder="John Smith"
        Icon={User}
        required
      />
      
      <IconInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email address"
        placeholder="name@company.com"
        Icon={Mail}
        autoComplete="email"
        required
      />
      
      <div>
        <label htmlFor="password" className="label-text">
          Password
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field w-full h-10 px-3 py-2 border border-gray-300 rounded-md pr-10"
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
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field w-full h-10 px-3 py-2 border border-gray-300 rounded-md pr-10"
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
      
      <IconInput
        id="adminKey"
        type="password"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
        label="Admin Registration Key"
        placeholder="Enter admin key"
        Icon={KeyRound}
        required
      />
    </>
  );
};
