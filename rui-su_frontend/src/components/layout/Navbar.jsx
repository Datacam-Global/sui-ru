import React from 'react';
import { Shield, Menu, X, Home, MessageSquare, Camera, Flag, Phone, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = ({ user, handleLogout, handleAuthClick, navigateWithLoading, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { colors } = useTheme();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
      style={{ 
        backgroundColor: colors.navBg,
        borderColor: colors.navBorder 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: colors.gradientPrimary }}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>Sui-Ru</h1>
              <p className="text-xs" style={{ color: colors.textMuted }}>MHSMS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("/", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("about", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("faq", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              FAQ
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("chatbot", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Chatbot
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("image-detection", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Camera className="w-4 h-4 mr-1" />
              Image Detection AI
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("report", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Flag className="w-4 h-4 mr-1" />
              Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("contact", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: colors.text }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: colors.text }} />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium" style={{ color: colors.text }}>{user.name}</p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>{user.role}</p>
                  </div>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <User className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  </div>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                  Login
                </Button>
                <Button variant="primary" onClick={() => handleAuthClick("register")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

