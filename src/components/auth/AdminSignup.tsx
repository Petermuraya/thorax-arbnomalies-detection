
import { AdminSignupForm } from "./admin/AdminSignupForm";

const AdminSignup = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-medical-gray-dark mb-2">Create Admin Account</h1>
        <p className="text-medical-gray">Register as an administrator</p>
      </div>
      
      <div className="medical-card p-8 mb-6 shadow-lg border border-gray-100 rounded-xl">
        <AdminSignupForm />
      </div>
    </div>
  );
};

export default AdminSignup;
