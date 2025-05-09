
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle, user } = useAuth();
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
        const role = user.user_metadata?.role || user.user_metadata?.roles?.patient ? 'patient' : 
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login error:", error);
      setIsGoogleLoading(false);
    }
  };

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
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100/50 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
                  Email address
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-1">
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-blue-300 data-[state=checked]:bg-blue-600"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-blue-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-md hover:shadow-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Log in
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-blue-500">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </span>
                )}
              </Button>
            </div>
          </div>
          
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
