
import { AdminSignupForm } from "./admin/AdminSignupForm";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const AdminSignup = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create Admin Account</h1>
        <p className="text-medical-gray mb-2">Register as a system administrator</p>
      </div>
      
      <Alert className="mb-6 bg-yellow-50 border-yellow-200">
        <ShieldAlert className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Restricted Registration</AlertTitle>
        <AlertDescription className="text-yellow-700">
          Admin registration requires a special key and is only for authorized personnel.
          The system enforces strict database constraints for admin accounts.
        </AlertDescription>
      </Alert>
      
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Administrator Registration</CardTitle>
          <CardDescription>
            Create a new administrator account with full system privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSignupForm />
        </CardContent>
      </Card>
      
      <div className="text-center mt-4 space-y-2">
        <Link to="/login" className="block text-medical-blue hover:underline">
          Return to login
        </Link>
        <p className="text-xs text-medical-gray">
          For testing purposes, use the admin key: "admin123"
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
