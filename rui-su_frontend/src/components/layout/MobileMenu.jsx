import React from 'react';
import { Home, MessageSquare, Camera, Flag, Phone } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const MobileMenu = ({ user, handleAuthClick, navigateWithLoading, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { colors } = useTheme();

  return (
    isMobileMenuOpen && (
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
              onClick={() => {
                navigateWithLoading('landing', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('about', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('faq', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              FAQ
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('chatbot', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chatbot
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('image-detection', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Camera className="w-4 h-4 mr-2" />
              Image Detection AI
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('report', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                navigateWithLoading('contact', 500);
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            
            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleAuthClick('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      handleAuthClick('register');
                      setIsMobileMenuOpen(false);
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

