
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
            <p className="text-medical-gray">Choose your account type to get started</p>
          </div>
          
          <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
            <div className="grid gap-6">
              <Link to="/signup/patient">
                <Button variant="outline" className="w-full h-16 text-left flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Patient</div>
                    <div className="text-sm text-gray-500">Get insights about your x-rays</div>
                  </div>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              
              <Link to="/signup/healthcare">
                <Button variant="outline" className="w-full h-16 text-left flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Healthcare Professional</div>
                    <div className="text-sm text-gray-500">Review and analyze x-rays</div>
                  </div>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
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
