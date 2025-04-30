
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HealthcareSignupForm } from "@/components/auth/signup/HealthcareSignupForm";
import { GoogleSignupButton } from "@/components/auth/signup/GoogleSignupButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Role } from "@/types/roles";

const HealthcareSignup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'patient';
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/health-staff-dashboard');
      }
    }
  }, [user, navigate]);

  // Store role preference for Google sign-in
  useEffect(() => {
    const healthstaffRole: Role = "healthstaff";
    localStorage.setItem("signupRole", healthstaffRole);
    return () => {
      localStorage.removeItem("signupRole");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Healthcare Professional Registration</h1>
            <p className="text-medical-gray">Join our platform to review and analyze x-rays</p>
          </div>
          
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Healthcare Verification Required</AlertTitle>
            <AlertDescription className="text-blue-700">
              After signing up, you'll need to verify your healthcare credentials by providing your license information.
            </AlertDescription>
          </Alert>
          
          <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
            <HealthcareSignupForm />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-medical-gray-light"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-medical-gray">Or continue with</span>
                </div>
              </div>
              
              <GoogleSignupButton role="healthstaff" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-medical-gray">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-medical-blue hover:text-medical-blue-dark">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-medical-gray">
              <Link to="/signup" className="font-medium text-medical-gray hover:text-medical-gray-dark">
                ← Back to account types
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HealthcareSignup;
