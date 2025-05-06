
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { createSuperuser } from "@/utils/createSuperuser";
import { useNavigate } from "react-router-dom";

const SuperuserCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createUser = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      // Use the specified credentials
      const email = "sammypeter1944@gmail.com";
      const password = "Cate2005";
      const fullName = "Sammy Peter (Superuser)";
      
      const result = await createSuperuser(email, password, fullName);
      
      if (result.success) {
        toast.success("Superuser created successfully! Please check email for verification.");
        setIsCreated(true);
        console.log("Superuser creation success:", result);
      } else {
        setError(result.message);
        toast.error(result.message);
        console.error("Superuser creation error:", result.error);
      }
    } catch (error: any) {
      console.error("Creation error:", error);
      setError(error.message || "Something went wrong");
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="text-blue-700">Create Superuser</CardTitle>
          <CardDescription>
            This will create a superuser with email <strong>sammypeter1944@gmail.com</strong> who has 
            all permissions (admin, healthcare professional, and patient).
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isCreated ? (
            <div className="space-y-4 text-center">
              <div className="text-green-600 text-lg font-semibold">
                Superuser created successfully!
              </div>
              <p>Check the email for verification, then you can log in.</p>
              <Button 
                onClick={() => navigate("/login")} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                <div className="font-semibold text-yellow-800">Credentials:</div>
                <div>Email: <span className="font-mono">sammypeter1944@gmail.com</span></div>
                <div>Password: <span className="font-mono">Cate2005</span></div>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200 text-red-800">
                  <p className="font-semibold">Error:</p>
                  <p>{error}</p>
                </div>
              )}
              
              <Button 
                onClick={createUser} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Superuser"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperuserCreation;
