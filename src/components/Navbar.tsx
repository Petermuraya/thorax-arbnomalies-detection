
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-md overflow-hidden hero-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="font-bold text-xl text-medical-gray-dark hidden sm:inline-block">
            Chest
          </span>
        </Link>

        {/* Authentication Buttons */}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-medical-gray-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-medical-gray-light">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <div className="pt-2 flex flex-col space-y-2">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
