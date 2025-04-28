
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";

interface SignupFormFooterProps {
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  isLoading: boolean;
}

export const SignupFormFooter = ({
  termsAccepted,
  setTermsAccepted,
  isLoading
}: SignupFormFooterProps) => {
  return (
    <>
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
        className="w-full bg-medical-blue hover:bg-medical-blue-dark flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : (
          <>
            <UserPlus className="h-5 w-5" />
            Create account
          </>
        )}
      </Button>
    </>
  );
};
