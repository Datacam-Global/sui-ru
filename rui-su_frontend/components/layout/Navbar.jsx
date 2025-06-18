import React, { useState } from 'react';
import { Shield, Menu, X, Home, MessageSquare, Camera, Flag, Phone, User, ChevronDown, Briefcase } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = ({ user, handleLogout, handleAuthClick, navigateWithLoading, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { colors } = useTheme();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

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
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/sui_ru_logo.png" 
                alt="Sui-Ru Logo" 
                className="w-8 h-8 object-contain"
              />
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
            
            {/* Services Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="text-sm font-medium hover:scale-105 transition-transform flex items-center"
              >
                Services
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isServicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg border backdrop-blur-md z-50"
                  style={{ 
                    backgroundColor: colors.navBg,
                    borderColor: colors.navBorder 
                  }}
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigateWithLoading("chatbot", 500);
                        setIsServicesDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-white transition-colors flex items-center"
                      style={{ color: colors.text }}
                    >
                      <MessageSquare className="w-4 h-4 mr-3" />
                      AI Chatbot
                      <span className="text-xs ml-auto" style={{ color: colors.textMuted }}>Interactive AI</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateWithLoading("image-detection", 500);
                        setIsServicesDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-10 hover:bg-white transition-colors flex items-center"
                      style={{ color: colors.text }}
                    >
                      <Camera className="w-4 h-4 mr-3" />
                      Image Detection AI
                      <span className="text-xs ml-auto" style={{ color: colors.textMuted }}>Content Analysis</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateWithLoading("marketing", 500)}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Briefcase className="w-4 h-4 mr-1" />
              Marketing
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

