import React, { useState } from 'react';
import { Home, MessageSquare, Camera, Flag, Phone, ChevronDown, Briefcase } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const MobileMenu = ({ user, handleAuthClick, onNavigate, isOpen, onClose, onLogout }) => {
  const { colors } = useTheme();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleNavigation = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    isOpen && (
      <div 
        className="fixed top-16 left-0 right-0 z-40 md:hidden backdrop-blur-md border-b transition-all duration-300"
        style={{ 
          backgroundColor: colors.navBg,
          borderColor: colors.navBorder 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/about')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/faq')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              FAQ
            </Button>
            
            {/* Services Section */}
            <div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-sm font-medium hover:scale-105 transition-transform justify-start w-full"
              >
                Services
                <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleNavigation('/chatbot')}
                    className="text-sm font-medium hover:scale-105 transition-transform justify-start w-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Chatbot
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleNavigation('/image-detection')}
                    className="text-sm font-medium hover:scale-105 transition-transform justify-start w-full"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Image Detection AI
                  </Button>
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/marketing')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Marketing
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/report')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/contact')}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            
            {/* Mobile Auth Buttons */}
            {user ? (
              <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                <div className="flex flex-col space-y-2">
                  <div className="text-sm" style={{ color: colors.text }}>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>{user.role}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleAuthClick('login');
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      handleAuthClick('register');
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MobileMenu;

