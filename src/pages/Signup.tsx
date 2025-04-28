
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignupForm } from "@/components/auth/signup/SignupForm";
import { GoogleSignupButton } from "@/components/auth/signup/GoogleSignupButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'patient';
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/health-staff-dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create an account</h1>
            <p className="text-medical-gray">Join XRay Insight for better healthcare outcomes</p>
          </div>
          
          <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
            <SignupForm />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-medical-gray-light"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-medical-gray">Or continue with</span>
                </div>
              </div>
              
              <GoogleSignupButton />
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
