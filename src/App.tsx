
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { NotificationsProvider } from "@/contexts/notifications";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientSignup from "./pages/PatientSignup";
import HealthcareSignup from "./pages/HealthcareSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PatientDashboard from "./pages/PatientDashboard";
import HealthStaffDashboard from "./pages/HealthStaffDashboard";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminSignup from "./components/auth/AdminSignup";
import SuperuserCreation from "./pages/SuperuserCreation";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationsProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/patient" element={<PatientSignup />} />
            <Route path="/signup/healthcare" element={<HealthcareSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Hidden Admin Registration */}
            <Route path="/secure-admin-registration" element={<AdminSignup />} />
            
            {/* Superuser Creation */}
            <Route path="/create-superuser" element={<SuperuserCreation />} />
            
            {/* Protected routes with role-based access */}
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute requiredPermission="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/health-staff-dashboard" 
              element={
                <ProtectedRoute requiredPermission="healthstaff">
                  <HealthStaffDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredPermission="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
