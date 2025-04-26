
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PatientDashboard from "./pages/PatientDashboard";
import HealthStaffDashboard from "./pages/HealthStaffDashboard";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  // Move QueryClientProvider inside BrowserRouter
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/health-staff-dashboard" element={<HealthStaffDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
