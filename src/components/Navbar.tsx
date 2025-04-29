import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, Twitter, Linkedin, Facebook } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useRolePermissions } from '@/hooks/useRolePermissions';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { userRole } = useRolePermissions();

  const handleDashboardClick = () => {
    if (userRole === 'admin') {
      return '/admin-dashboard';
    } else if (userRole === 'healthstaff') {
      return '/health-staff-dashboard';
    } else {
      return '/patient-dashboard';
    }
  };

  return (
    <TooltipProvider>
      <header className="fixed w-full top-0 bg-white/95 backdrop-blur-md shadow z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-medical-blue flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg">TQ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-medical-gray-dark">ThoraxIQ</span>
              <span className="text-xs text-medical-gray">AI Chest X-ray Insight</span>
            </div>
          </Link>

          {/* Main Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to={handleDashboardClick()}>
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                  Profile
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                onClick={signOut}
              >
                Log out
              </Button>
            </div>
          )}

          {!user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-medical-blue hover:bg-medical-blue-dark">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-medical-gray-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-medical-gray-light">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {user ? (
                <>
                  <Link to={handleDashboardClick()} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}

              {/* Social Links */}
              <div className="pt-4 border-t border-medical-gray-light text-center text-medical-gray-dark text-sm space-y-3">
                <p className="text-medical-gray-dark font-medium">Connect with Sammy Peter</p>
                <div className="flex justify-center space-x-6">
                  <a href="https://twitter.com/SammyPeter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/sammy-peter" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.facebook.com/sammy.peter.12/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </TooltipProvider>
  );
};

export default Navbar;
