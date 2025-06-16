import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PageLoader from './components/common/PageLoader';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import LandingPage from './pages/LandingPage';
import AuthPage from './components/authPage/AuthPage';
import ExecutiveDashboard from './dashboard/ExecutiveDashboard';
import AnalystWorkstation from './components/analystWorkstation/AnalystWorkstation';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ChatbotPage from './pages/ChatbotPage';
import ImageDetectionPage from './pages/ImageDetectionPage';
import ReportPage from './pages/ReportPage';
import ContactPage from './pages/ContactPage';
import ChatbotOverlay from './components/common/ChatbotOverlay'; 

function AppRoutes({ user, setUser, isLoading, setIsLoading }) {
  const { colors } = useTheme();
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation helpers
  const handleAuthClick = (mode = 'login') => {
    setAuthMode(mode);
    navigate('/auth');
  };

  const handleDemoClick = () => {
    setUser({
      name: 'Alex Johnson',
      role: 'Senior Analyst',
      email: 'alex.johnson@fonsee.ai'
    });
    navigate('/dashboard');
  };

  const handleAnalystClick = () => {
    navigate('/analyst');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleAuthSubmit = () => {
    setUser({
      name: authMode === 'login' ? 'Alex Johnson' : 'New User',
      role: 'Senior Analyst',
      email: authMode === 'login' ? 'alex.johnson@fonsee.ai' : 'newuser@fonsee.ai'
    });
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <PageLoader isLoading={isLoading} />
      <Navbar 
        user={user} 
        handleAuthClick={handleAuthClick}
        onLogout={handleLogout}
        navigateWithLoading={navigate}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={navigate}
        handleAuthClick={handleAuthClick}
        onLogout={handleLogout}
        user={user}
      />
      <Routes>
        <Route path="/" element={<LandingPage onAuthClick={handleAuthClick} onDemoClick={handleDemoClick} />} />
        <Route path="/auth" element={
          <AuthPage 
            mode={authMode} 
            onSubmit={handleAuthSubmit}
            onModeSwitch={setAuthMode}
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/dashboard" element={user ? <ExecutiveDashboard user={user} onLogout={handleLogout} onAnalystClick={handleAnalystClick} /> : <LandingPage onAuthClick={handleAuthClick} onDemoClick={handleDemoClick} />} />
        <Route path="/analyst" element={user ? <AnalystWorkstation user={user} onLogout={handleLogout} /> : <LandingPage onAuthClick={handleAuthClick} onDemoClick={handleDemoClick} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/image-detection" element={<ImageDetectionPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add a catch-all route for 404 if desired */}
      </Routes>
      <ChatbotOverlay />
    </div>
  );
}

export default function FonSeeApp() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <AppRoutes user={user} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading} />
      </Router>
    </ThemeProvider>
  );
}