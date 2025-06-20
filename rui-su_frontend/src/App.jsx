import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PageLoader from './components/common/PageLoader';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import LandingPage from './components/pages/LandingPage';
import AuthPage from './components/authPage/AuthPage';
import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard';
import AboutPage from './components/pages/AboutPage';
import FAQPage from './components/pages/FAQPage';
import ChatbotPage from './components/pages/ChatbotPage';
import ImageDetectionPage from './components/pages/ImageDetectionPage';
import ReportPage from './components/pages/ReportPage';
import ContactPage from './components/pages/ContactPage';
import SUILearnPage from './components/pages/SUILearnPage';
import MarketingPage from './components/pages/MarketingPage';
import BlogPage from './components/pages/BlogPage';
import NewsPage from './components/pages/NewsPage';
import HelpCenterPage from './components/pages/HelpCenterPage';
import ChatbotOverlay from './components/common/ChatbotOverlay'; 
import PublicRoute from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AlertManagementPage from './components/dashboard/AlertManagementPage';
import PlatformAnalysisPage from './components/dashboard/PlatformAnalysisPage';
import { AuthContext } from './AuthProvider';
import AnalystWorkstation from './components/dashboard/AnalystWorkstation';


function AppRoutes({ user, setUser, isLoading, setIsLoading }) {
  const { colors } = useTheme();
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  // Navigation helpers
  const handleAuthClick = (mode = 'login') => {
    setAuthMode(mode);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/auth');
      setIsLoading(false);
    }, 500);
  };

  const handleDemoClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Alex Johnson',
        role: 'Senior Analyst',
        email: 'alex.johnson@fonsee.ai'
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };


  const handleLogout = () => {
    setIsLoading(true);
    if (typeof setIsLoggedIn === 'function') {
      setIsLoggedIn(false);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
    }
    setUser(null);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 500);
  };

  const handleAuthSubmit = (data) => {
    // If user object exists in response, use username, else fallback
    if (data && data.user) {
      setUser({
        username: data.user.username,
        email: data.user.email,
        id: data.user.id,
        first_name: data.user.first_name,
        last_name: data.user.last_name
      });
    } else {
      setUser({
        username: authMode === 'login' ? 'User' : 'New User',
        email: '',
        id: '',
        first_name: '',
        last_name: ''
      });
    }
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
        <Route path="/sui-learn" element={<SUILearnPage />} />
        <Route path="/sui-learn/courses" element={<SUILearnPage />} />
        <Route path="/sui-learn/certifications" element={<SUILearnPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        {/* Private routes */}
        <Route path="/alert-management" element={<PrivateRoutes><AlertManagementPage /></PrivateRoutes>} />
        <Route path="/dashboard" element={<PrivateRoutes><ExecutiveDashboard user={user} onLogout={handleLogout} /></PrivateRoutes>} />
        <Route path="/platform-analysis" element={<PrivateRoutes><PlatformAnalysisPage /></PrivateRoutes>} />
        <Route path="/reports" element={<PrivateRoutes><ReportPage /></PrivateRoutes>} />
        <Route path="/analyst" element={<PrivateRoutes><AnalystWorkstation/></PrivateRoutes>} />
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