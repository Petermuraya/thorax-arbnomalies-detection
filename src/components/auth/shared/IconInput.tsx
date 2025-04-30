"use client";

import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface IconInputProps {
  control: Control<any>;
  name: string;
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
}

export const IconInput = ({
  control,
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
}: IconInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                id={name}
                type={inputType}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                disabled={disabled}
                className="pl-10 pr-10 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
              />
            </FormControl>

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
            <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
