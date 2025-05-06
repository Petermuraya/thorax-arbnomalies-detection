
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User } from "lucide-react";

interface PatientSignupFormProps {}

export const PatientSignupForm: React.FC<PatientSignupFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, { full_name: data.fullName });
      toast.success("Account created! Check your email to verify.");
    } catch (error: any) {
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
          Full Name
        </Label>
        <div className="relative">
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            {...register("fullName", { required: "Full name is required" })}
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{String(errors.fullName.message)}</p>}
      </div>
      
      <div>
        <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
      </div>
      
      <div>
        <Label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
      </div>

      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        Sign up
      </Button>
    </form>
  );
};
