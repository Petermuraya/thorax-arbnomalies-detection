
import { IconInput } from "@/components/auth/shared/IconInput";
import { PasswordInput } from "@/components/auth/shared/PasswordInput";
import { Mail, User } from "lucide-react";

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
      />
      
      <PasswordInput
        id="password"
        password={password}
        setPassword={setPassword}
        label="Password"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showStrengthIndicator={true}
        setPasswordStrength={setPasswordStrength}
      />
      
      <div>
        <PasswordInput
          id="confirmPassword"
          password={confirmPassword}
          setPassword={setConfirmPassword}
          label="Confirm Password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
        {confirmPassword && password !== confirmPassword && (
          <p className="mt-1 text-xs text-red-500">
            Passwords do not match
          </p>
        )}
      </div>
    </>
  );
};
