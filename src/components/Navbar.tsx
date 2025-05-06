import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, Twitter, Linkedin, Facebook, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/auth';
import { useRolePermissions } from '@/hooks/useRolePermissions';
import { motion, AnimatePresence } from 'framer-motion';

type NavButtonProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  icon?: React.ElementType;
};

const NavButton = ({ to, children, onClick = () => {}, primary = false, icon: Icon }: NavButtonProps) => (
  <Link to={to} onClick={onClick}>
    <Button
      variant={primary ? 'default' : 'outline'}
      className={`group transition-all duration-300 ease-in-out ${
        primary
          ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-md'
          : 'border-blue-500 text-blue-600 hover:bg-blue-50/50 hover:border-blue-600 hover:text-blue-700'
      }`}
    >
      {Icon && <Icon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />}
      {children}
    </Button>
  </Link>
);

const SocialLinks = () => {
  const socials = [
    { icon: Twitter, url: 'https://twitter.com/SammyPeter', label: 'Twitter', color: 'text-sky-400 hover:text-sky-500' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/sammy-peter', label: 'LinkedIn', color: 'text-blue-600 hover:text-blue-700' },
    { icon: Facebook, url: 'https://www.facebook.com/sammy.peter.12/', label: 'Facebook', color: 'text-blue-700 hover:text-blue-800' },
  ];

  return (
    <div className="pt-6 border-t border-blue-100/50 mt-4">
      <p className="text-center text-blue-600/80 text-sm font-medium mb-3">Connect with us</p>
      <div className="flex justify-center space-x-5">
        {socials.map(({ icon: Icon, url, label, color }) => (
          <motion.a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`${color} transition-colors`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={20} className="hover:fill-current" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isSuperuser, isAdmin, isHealthStaff, isPatient } = useRolePermissions();

  return (
    <TooltipProvider>
      <header className="fixed w-full top-0 z-50 border-b border-blue-100/50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">

          <motion.div whileHover={{ y: -1 }}>
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                className="w-11 h-11 rounded-full overflow-hidden shadow-lg flex items-center justify-center"
                whileHover={{ rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10260/10260604.png"
                  alt="ThoraxIQ Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.replaceWith(document.createTextNode('TQ'));
                  }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
                  ThoraxIQ
                </span>
                <span className="text-xs text-blue-500/80">AI-Powered Diagnostics</span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {(isSuperuser || isAdmin) && (
                  <NavButton to="/admin-dashboard" icon={User}>Admin Dashboard</NavButton>
                )}
                {(isSuperuser || isHealthStaff) && (
                  <NavButton to="/health-staff-dashboard" icon={User}>Health Staff Dashboard</NavButton>
                )}
                {(isSuperuser || isPatient) && (
                  <NavButton to="/patient-dashboard" icon={User}>Patient Dashboard</NavButton>
                )}
                <NavButton to="/profile" icon={User}>Profile</NavButton>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50/50 hover:border-blue-600 hover:text-blue-700"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <NavButton to="/login" icon={LogIn}>Log in</NavButton>
                <NavButton to="/signup" icon={UserPlus} primary>Sign up</NavButton>
              </>
            )}
          </nav>

          <motion.button
            className="md:hidden text-blue-600 p-2 rounded-lg hover:bg-blue-50/50"
            onClick={() => setIsMenuOpen(prev => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 border-t border-blue-100/50"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                {user ? (
                  <>
                    {(isSuperuser || isAdmin) && (
                      <NavButton to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} icon={User}>Admin Dashboard</NavButton>
                    )}
                    {(isSuperuser || isHealthStaff) && (
                      <NavButton to="/health-staff-dashboard" onClick={() => setIsMenuOpen(false)} icon={User}>Health Staff Dashboard</NavButton>
                    )}
                    {(isSuperuser || isPatient) && (
                      <NavButton to="/patient-dashboard" onClick={() => setIsMenuOpen(false)} icon={User}>Patient Dashboard</NavButton>
                    )}
                    <NavButton to="/profile" onClick={() => setIsMenuOpen(false)} icon={User}>Profile</NavButton>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-600 hover:bg-blue-50/50"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <NavButton to="/login" onClick={() => setIsMenuOpen(false)} icon={LogIn}>Log in</NavButton>
                    <NavButton to="/signup" onClick={() => setIsMenuOpen(false)} icon={UserPlus} primary>Sign up</NavButton>
                  </>
                )}
                <SocialLinks />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </TooltipProvider>
  );
};

export default Navbar;
