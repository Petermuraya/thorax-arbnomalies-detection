
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

interface PasswordInputProps {
  id: string;
  password: string;
  setPassword: (value: string) => void;
  label: string;
  placeholder?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  autoComplete?: string;
  required?: boolean;
  showStrengthIndicator?: boolean;
  setPasswordStrength?: (value: { score: number; label: string; color: string }) => void;
}

export const PasswordInput = ({
  id,
  password,
  setPassword,
  label,
  placeholder = "••••••••",
  showPassword,
  setShowPassword,
  autoComplete = "new-password",
  required = true,
  showStrengthIndicator = false,
  setPasswordStrength
}: PasswordInputProps) => {
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
    
    if (setPasswordStrength) {
      setPasswordStrength({ score, label, color });
    }
    
    return score;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="label-text">
        {label}
      </label>
      <div className="relative mt-1">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          className="input-field pr-10"
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
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
      {showStrengthIndicator && password && (
        <div className="mt-2">
          <PasswordStrengthIndicator password={password} />
          <p className="text-xs text-medical-gray">
            Use at least 8 characters with uppercase letters, numbers, and symbols
          </p>
        </div>
      )}
    </div>
  );
};
