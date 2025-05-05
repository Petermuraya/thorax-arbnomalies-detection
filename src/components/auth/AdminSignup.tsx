
import { AdminSignupForm } from "./admin/AdminSignupForm";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminSignup = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">Create Admin Account</h1>
        <p className="text-slate-600 mb-2">Register as a system administrator</p>
      </div>
      
      <Card className="mb-6 shadow-lg border border-indigo-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-50 z-0"></div>
        <CardHeader className="relative z-10 border-b border-indigo-100">
          <CardTitle className="text-indigo-700">Administrator Registration</CardTitle>
          <CardDescription className="text-slate-600">
            Create a new administrator account with full system privileges
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <AdminSignupForm />
        </CardContent>
      </Card>
      
      <div className="text-center mt-4 space-y-2">
        <Link to="/login" className="block text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">
          Return to login
        </Link>
      </div>
    </div>
  );
};

export default AdminSignup;
