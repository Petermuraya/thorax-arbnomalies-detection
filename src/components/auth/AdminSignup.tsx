
import { AdminSignupForm } from "./admin/AdminSignupForm";
import { Link } from "react-router-dom";

const AdminSignup = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create Admin Account</h1>
        <p className="text-medical-gray">Register as an administrator</p>
      </div>
      
      <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
        <AdminSignupForm />
      </div>
      
      <div className="text-center mt-4">
        <Link to="/login" className="text-medical-blue hover:underline">
          Return to login
        </Link>
      </div>
    </div>
  );
};

export default AdminSignup;
