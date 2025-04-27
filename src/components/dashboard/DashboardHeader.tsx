
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userName = user?.user_metadata?.full_name || "Patient";
  const userImage = user?.user_metadata?.avatar_url;

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-medical-gray-light shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-md overflow-hidden hero-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">X</span>
          </div>
          <span className="font-bold text-xl text-medical-gray-dark">X-Ray Insight</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImage} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-medical-gray-dark">{userName}</span>
          </div>
          <Button 
            variant="outline" 
            className="border-medical-gray-light hover:bg-medical-gray-lightest"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};
