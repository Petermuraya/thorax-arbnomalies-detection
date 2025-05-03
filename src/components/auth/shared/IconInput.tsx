
"use client";

import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IconInputProps {
  id: string;
  name?: string;
  label: string;
  placeholder: string;
  Icon: LucideIcon;
  type?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  iconSize?: number;
  iconColor?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const IconInput = ({
  id,
  name,
  label,
  placeholder,
  Icon,
  type = "text",
  description,
  required = true,
  disabled = false,
  autoComplete,
  iconSize = 20,
  iconColor = "text-gray-400 dark:text-gray-500",
  value,
  onChange,
  error,
}: IconInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          name={name || id}
          type={inputType}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className="pl-10 pr-10 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
        />

        {/* Left Icon */}
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`}
          size={iconSize}
          aria-hidden="true"
        />

        {/* Password Visibility Toggle */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      {error && (
        <p className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
