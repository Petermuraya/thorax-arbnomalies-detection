
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for verification success message in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('verified') === 'true') {
      toast.success("Email verified successfully! Please login to continue.");
    }
  }, [location]);

  // Redirect if already logged in
  useEffect(() => {
    const redirectLoggedInUser = async () => {
      if (user) {
        const role = user.user_metadata?.role || 
                    user.user_metadata?.roles?.patient ? 'patient' : 
                    user.user_metadata?.roles?.healthstaff ? 'healthstaff' : 
                    user.user_metadata?.roles?.admin ? 'admin' : 'patient';
        
        // For healthcare staff, check verification status
        if (role === 'healthstaff' || user.user_metadata?.roles?.healthstaff) {
          try {
            const { data, error } = await supabase
              .from('healthcare_verification')
              .select('status')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();
            
            if (error) {
              console.error("Error checking verification:", error);
              navigate('/verification-status');
              return;
            }
            
            // If not approved, send to verification status page
            if (data && data.status !== 'approved') {
              navigate('/verification-status');
              return;
            }
            
            // If approved or no verification record found, continue to dashboard
            navigate('/health-staff-dashboard');
          } catch (err) {
            console.error("Error checking verification status:", err);
            navigate('/verification-status');
          }
          return;
        }
        
        // For other roles, redirect to appropriate dashboard
        if (role === 'patient') {
          navigate('/patient-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/profile');
        }
      }
    };
    
    redirectLoggedInUser();
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-sky-50">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
              Welcome Back
            </h1>
            <p className="text-blue-600/80 text-lg">Log in to access your medical insights</p>
          </div>
          
          <LoginForm />
          
          <div className="text-center">
            <p className="text-blue-600/80">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
