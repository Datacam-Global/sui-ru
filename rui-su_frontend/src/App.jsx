import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PageLoader from './components/common/PageLoader';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import LandingPage from './pages/LandingPage';
import AuthPage from './components/authPage/AuthPage';
import ExecutiveDashboard from './dashboard/ExecutiveDashboard';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ChatbotPage from './pages/ChatbotPage';
import ImageDetectionPage from './pages/ImageDetectionPage';
import ReportPage from './pages/ReportPage';
import ContactPage from './pages/ContactPage';
import ChatbotOverlay from './components/common/ChatbotOverlay'; 
import PublicRoute from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AlertManagementPage from './dashboard/AlertManagementPage';
import PlatformAnalysisPage from './dashboard/PlatformAnalysisPage';
import { AuthContext } from './AuthProvider';

function AppRoutes({ user, setUser, isLoading, setIsLoading }) {
  const { colors } = useTheme();
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

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
    if (typeof setIsLoggedIn === 'function') {
      setIsLoggedIn(false);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (typeof window !== 'undefined') {
      // Defensive: clear tokens if they exist
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
    }
    setUser(null);
    navigate('/');
  };

  const handleAuthSubmit = () => {
    setUser({
      name: authMode === 'login' ? 'Alex Johnson' : 'New User',
      role: 'Senior Analyst',
      email: authMode === 'login' ? 'alex.johnson@fonsee.ai' : 'newuser@fonsee.ai'
    });
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <PageLoader isLoading={isLoading} />
      <Navbar 
        user={user}
        handleLogout={handleLogout}
        handleAuthClick={handleAuthClick}
        navigateWithLoading={navigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
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
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><LandingPage onAuthClick={handleAuthClick} onDemoClick={handleDemoClick} /></PublicRoute>} />
        <Route path="/auth" element={
          <PublicRoute>
            <AuthPage 
              setUser={setUser}
              mode={authMode} 
              onSubmit={handleAuthSubmit}
              onModeSwitch={setAuthMode}
              onBack={() => navigate('/')}
            />
          </PublicRoute>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/image-detection" element={<ImageDetectionPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/report" element={<ReportPage />} />
        {/* Private routes */}
        <Route path="/alert-management" element={<PrivateRoutes><AlertManagementPage /></PrivateRoutes>} />
        <Route path="/dashboard" element={<PrivateRoutes><ExecutiveDashboard user={user} onLogout={handleLogout} onAnalystClick={handleAnalystClick} /></PrivateRoutes>} />
        <Route path="/platform-analysis" element={<PrivateRoutes><PlatformAnalysisPage /></PrivateRoutes>} />
        <Route path="/reports" element={<PrivateRoutes><ReportPage /></PrivateRoutes>} />
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