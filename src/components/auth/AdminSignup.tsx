
import { AdminSignupForm } from "./admin/AdminSignupForm";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminSignup = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create Admin Account</h1>
        <p className="text-medical-gray mb-2">Register as a system administrator</p>
      </div>
      
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
      </div>
    </div>
  );
};

export default AdminSignup;
