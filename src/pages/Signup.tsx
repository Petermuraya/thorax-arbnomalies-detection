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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-sky-50">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
              Join Our Platform
            </h1>
            <p className="text-blue-600/80 text-lg">Select your role to begin your journey</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100/50 mb-8">
            <div className="space-y-5">
              <Link to="/signup/patient">
                <Button 
                  variant="outline" 
                  className="w-full h-20 px-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all group hover:bg-blue-50/50"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-100/50 group-hover:bg-blue-200/50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-blue-800">Patient</div>
                        <div className="text-sm text-blue-500/80">Get insights about your x-rays</div>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Button>
              </Link>
              
              <Link to="/signup/healthcare">
                <Button 
                  variant="outline" 
                  className="w-full h-20 px-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all group hover:bg-blue-50/50"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-100/50 group-hover:bg-blue-200/50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-blue-800">Healthcare Professional</div>
                        <div className="text-sm text-blue-500/80">Review and analyze x-rays</div>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-blue-600/80">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-colors"
              >
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