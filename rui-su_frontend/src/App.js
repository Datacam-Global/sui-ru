import React, { useState, useEffect } from 'react';
import { Globe, Shield, Users, AlertTriangle, TrendingUp, Search, Bell, User, Settings, Menu, X, Eye, Filter, Calendar, MapPin, Activity, Database, FileText, UserCheck, Lock, Mail, Github, ChevronDown, ChevronRight, Play, Pause, Download, Zap, BarChart3, Network, Cpu, Brain, Radar, Home, MessageSquare, Target, Clock, CheckCircle, XCircle, AlertCircle, Wifi, WifiOff, ChevronUp, MoreVertical, ExternalLink, Layers, Map, Hash, Flame, Camera, Video, FileImage, Share2, Flag, Heart, ThumbsUp, MessageCircle, RotateCcw, UserPlus, Building, Phone, Globe2, Monitor, Smartphone, Users2, AlertOctagon, TrendingDown, Sun, Moon, Loader2, Save, Trash2, Key, Vote, Send } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart } from 'recharts';

// ==================== THEME SYSTEM ====================

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      // Dark theme (default)
      primary: '#0070f3',
      primaryHover: '#0060df',
      secondary: '#7c3aed',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      
      // Backgrounds
      bg: '#000000',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      bgCard: 'rgba(255, 255, 255, 0.05)',
      bgCardHover: 'rgba(255, 255, 255, 0.08)',
      
      // Borders
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(255, 255, 255, 0.2)',
      
      // Text
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      
      // Gradients
      gradientPrimary: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
      gradientSecondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      gradientDanger: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      
      // Navigation
      navBg: 'rgba(0, 0, 0, 0.8)',
      navBorder: 'rgba(255, 255, 255, 0.1)',
    } : {
      // Light theme
      primary: '#0070f3',
      primaryHover: '#0060df',
      secondary: '#7c3aed',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      
      // Backgrounds
      bg: '#ffffff',
      bgSecondary: '#fafafa',
      bgTertiary: '#f5f5f5',
      bgCard: 'rgba(255, 255, 255, 0.8)',
      bgCardHover: 'rgba(255, 255, 255, 0.95)',
      
      // Borders
      border: 'rgba(0, 0, 0, 0.1)',
      borderHover: 'rgba(0, 0, 0, 0.2)',
      
      // Text
      text: '#000000',
      textSecondary: '#525252',
      textMuted: '#737373',
      
      // Gradients
      gradientPrimary: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
      gradientSecondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      gradientDanger: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
      gradientSuccess: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
      
      // Navigation
      navBg: 'rgba(255, 255, 255, 0.8)',
      navBorder: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ==================== LOADING COMPONENT ====================

const PageLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />
      <div className="relative">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-blue-500 border-opacity-20 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm font-medium text-white">Loading...</p>
        </div>
      </div>
    </div>
  );
};

// ==================== UTILITY COMPONENTS ====================

const Card = ({ children, className = "", glow = false }) => {
  const { colors } = useTheme();
  
  return (
    <div 
      className={`backdrop-blur-sm border rounded-xl transition-all duration-300 ${glow ? 'shadow-lg' : ''} ${className}`}
      style={{ 
        backgroundColor: colors.bgCard,
        borderColor: colors.border,
        boxShadow: glow ? `0 0 20px ${colors.primary}20` : 'none'
      }}
    >
      {children}
    </div>
  );
};

const Button = ({ children, variant = "primary", size = "md", icon: Icon, onClick, className = "", disabled = false, ...props }) => {
  const { colors } = useTheme();
  
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          background: colors.gradientPrimary,
          color: '#ffffff'
        };
      case 'secondary':
        return {
          backgroundColor: colors.bgTertiary,
          color: colors.text,
          borderColor: colors.border
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.textSecondary
        };
      case 'danger':
        return {
          background: colors.gradientDanger,
          color: '#ffffff'
        };
      case 'success':
        return {
          background: colors.gradientSuccess,
          color: '#ffffff'
        };
      case 'warning':
        return {
          background: colors.gradientSecondary,
          color: '#ffffff'
        };
      default:
        return {
          background: colors.gradientPrimary,
          color: '#ffffff'
        };
    }
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", size = "md" }) => {
  const { colors } = useTheme();
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return { background: colors.gradientPrimary, color: '#ffffff' };
      case 'success':
        return { background: colors.gradientSuccess, color: '#ffffff' };
      case 'warning':
        return { backgroundColor: colors.warning, color: '#ffffff' };
      case 'danger':
        return { background: colors.gradientDanger, color: '#ffffff' };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          color: colors.text,
          border: `1px solid ${colors.border}`
        };
      default:
        return { 
          backgroundColor: colors.bgTertiary, 
          color: colors.text 
        };
    }
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5"
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium transition-all duration-200 ${sizes[size]}`}
      style={getVariantStyles()}
    >
      {children}
    </span>
  );
};

// ==================== THEME TOGGLE COMPONENT ====================

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="relative"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
    </Button>
  );
};

// ==================== MAIN APP COMPONENT ====================

export default function FonSeeApp() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { colors } = useTheme();
  
  // State management
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Page transition with loading
  const navigateWithLoading = (page, delay = 1000) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, delay);
  };

  const handleAuthClick = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
    navigateWithLoading('auth', 500);
  };

  const handleDemoClick = () => {
    setUser({
      name: 'Alex Johnson',
      role: 'Senior Analyst',
      email: 'alex.johnson@fonsee.ai'
    });
    navigateWithLoading('dashboard', 1200);
  };

  const handleAnalystClick = () => {
    navigateWithLoading('analyst', 800);
  };

  const handleLogout = () => {
    setUser(null);
    navigateWithLoading('landing', 600);
  };

  const handleAuthSubmit = () => {
    setUser({
      name: authMode === 'login' ? 'Alex Johnson' : 'New User',
      role: 'Senior Analyst',
      email: authMode === 'login' ? 'alex.johnson@fonsee.ai' : 'newuser@fonsee.ai'
    });
    navigateWithLoading('dashboard', 1000);
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <PageLoader isLoading={isLoading} />
      
      {/* Navigation */}
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
                onClick={() => navigateWithLoading('landing', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('about', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('faq', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                FAQ
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('chatbot', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Chatbot
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('image-detection', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                <Camera className="w-4 h-4 mr-1" />
                Image Detection AI
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('report', 500)}
                className="text-sm font-medium hover:scale-105 transition-transform"
              >
                <Flag className="w-4 h-4 mr-1" />
                Report
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigateWithLoading('contact', 500)}
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
                  <Button variant="ghost" onClick={() => handleAuthClick('login')}>
                    Login
                  </Button>
                  <Button variant="primary" onClick={() => handleAuthClick('register')}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
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
      )}

      {/* Main Content */}
      {currentPage === 'landing' && (
        <LandingPage onAuthClick={handleAuthClick} onDemoClick={handleDemoClick} />
      )}

      {currentPage === 'auth' && (
        <AuthPage 
          mode={authMode} 
          onSubmit={handleAuthSubmit}
          onModeSwitch={(mode) => setAuthMode(mode)}
          onBack={() => navigateWithLoading('landing', 400)}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <ExecutiveDashboard user={user} onLogout={handleLogout} onAnalystClick={handleAnalystClick} />
      )}

      {currentPage === 'analyst' && user && (
        <AnalystWorkstation user={user} onLogout={handleLogout} />
      )}

      {currentPage === 'about' && (
        <AboutPage />
      )}

      {currentPage === 'faq' && (
        <FAQPage />
      )}

      {currentPage === 'chatbot' && (
        <ChatbotPage />
      )}

      {currentPage === 'image-detection' && (
        <ImageDetectionPage />
      )}

      {currentPage === 'report' && (
        <ReportPage />
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}
      
      {/* Global Chatbot Overlay - Available on all pages */}
      <ChatbotOverlay />
    </div>
  );
};

// ==================== ANALYST WORKSTATION COMPONENT ====================

const AnalystWorkstation = ({ user, onLogout }) => {
  const { colors } = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    type: 'all',
    platform: 'all',
    status: 'pending'
  });
  const [analysisData, setAnalysisData] = useState({
    classification: '',
    confidence: 75,
    notes: '',
    priority: 'medium'
  });

  // Enhanced detailed content data for analyst review
  const detailedAlerts = [
    {
      id: 1,
      type: 'misinformation',
      severity: 'critical',
      title: 'False Election Information Spreading',
      platform: 'Facebook',
      location: 'Douala, Cameroon',
      time: '2 minutes ago',
      engagement: 1250,
      status: 'pending',
      content: {
        text: "URGENT: The election commission has changed voting dates to next month due to technical issues. Share this to inform others!",
        author: {
          name: "News Update Cameroon",
          verified: false,
          followers: 15420,
          account_age: "3 months"
        },
        media: [{ type: 'image', description: 'Fake election notice document' }],
        reactions: { likes: 342, shares: 189, comments: 76 },
        url: "https://facebook.com/example-post-123"
      },
      ai_analysis: {
        confidence: 89,
        threat_indicators: [
          "Urgent language designed to create panic",
          "False information about official processes",
          "Encourages viral sharing",
          "Unverified source with recent account creation"
        ],
        similar_patterns: 3
      }
    },
    {
      id: 2,
      type: 'hate_speech',
      severity: 'high',
      title: 'Ethnic Tension Content Detected',
      platform: 'WhatsApp',
      location: 'Yaoundé, Cameroon',
      time: '8 minutes ago',
      engagement: 890,
      status: 'pending',
      content: {
        text: "These people from [ethnic group] are destroying our economy. We need to stop them before they take everything from us. Share in all your groups.",
        author: {
          name: "+237 6XX XXX XXX",
          verified: false,
          groups: 23
        },
        media: [],
        forwarded_count: 45
      },
      ai_analysis: {
        confidence: 76,
        threat_indicators: [
          "Ethnic targeting language",
          "Economic scapegoating", 
          "Call for group action",
          "Encourages widespread distribution"
        ],
        similar_patterns: 7
      }
    },
    {
      id: 3,
      type: 'misinformation',
      severity: 'medium',
      title: 'Health Misinformation Campaign',
      platform: 'Twitter/X',
      location: 'Lagos, Nigeria',
      time: '15 minutes ago',
      engagement: 2100,
      status: 'investigating',
      content: {
        text: "BREAKING: Local doctors confirm traditional herb mixture cures COVID-19 100%. Big pharma doesn't want you to know! Recipe in comments. #NaturalCure #COVID19",
        author: {
          name: "@HealthTruthNG",
          verified: false,
          followers: 2340,
          account_age: "6 months"
        },
        media: [{ type: 'image', description: 'Photo of herbal mixture' }],
        reactions: { likes: 876, retweets: 234, comments: 145 },
        url: "https://twitter.com/example-tweet-456"
      },
      ai_analysis: {
        confidence: 82,
        threat_indicators: [
          "False medical claims",
          "Conspiracy theory elements",
          "Encourages self-medication",
          "Potential public health risk"
        ],
        similar_patterns: 12
      }
    },
    {
      id: 4,
      type: 'incitement',
      severity: 'critical',
      title: 'Call to Violence Against Government Officials',
      platform: 'Telegram',
      location: 'Abuja, Nigeria',
      time: '12 minutes ago',
      engagement: 567,
      status: 'pending',
      content: {
        text: "Time to take action! These corrupt officials need to face real consequences. Meet at the government house tomorrow at 6 PM. Bring what you need to make them listen. #Revolution #TakeAction",
        author: {
          name: "Freedom Fighter NG",
          verified: false,
          followers: 8900,
          account_age: "2 weeks"
        },
        media: [{ type: 'image', description: 'Photo of government building with threatening overlay' }],
        reactions: { likes: 234, shares: 89, comments: 45 },
        url: "https://t.me/example-channel-789"
      },
      ai_analysis: {
        confidence: 94,
        threat_indicators: [
          "Direct call to physical action",
          "Threatening language toward officials",
          "Specific time and location mentioned",
          "Encourages bringing weapons/tools",
          "Recently created account"
        ],
        similar_patterns: 2
      }
    },
    {
      id: 5,
      type: 'misinformation',
      severity: 'high',
      title: 'False Economic Crisis Information',
      platform: 'Instagram',
      location: 'Accra, Ghana',
      time: '25 minutes ago',
      engagement: 3400,
      status: 'investigating',
      content: {
        text: "BREAKING: Bank of Ghana secretly printing unlimited money causing inflation! Your savings are worthless! Convert everything to foreign currency NOW before it's too late! 🚨💰 #GhanaEconomy #BankingCrisis",
        author: {
          name: "Ghana Economic Truth",
          verified: false,
          followers: 45600,
          account_age: "1 year"
        },
        media: [{ type: 'video', description: 'Fake news report about banking crisis' }],
        reactions: { likes: 1200, shares: 890, comments: 234 },
        url: "https://instagram.com/example-post-456"
      },
      ai_analysis: {
        confidence: 87,
        threat_indicators: [
          "False financial information",
          "Panic-inducing language",
          "Encourages immediate financial action",
          "Potential market manipulation",
          "Unverified economic claims"
        ],
        similar_patterns: 8
      }
    },
    {
      id: 6,
      type: 'hate_speech',
      severity: 'medium',
      title: 'Religious Intolerance Content',
      platform: 'TikTok',
      location: 'Kano, Nigeria',
      time: '35 minutes ago',
      engagement: 1890,
      status: 'pending',
      content: {
        text: "These [religious group] people are trying to destroy our traditions and way of life. We need to protect our community from their influence. Share to spread awareness! 🙏",
        author: {
          name: "Traditional Values NG",
          verified: false,
          followers: 12300,
          account_age: "8 months"
        },
        media: [{ type: 'video', description: 'Video promoting religious intolerance' }],
        reactions: { likes: 567, shares: 234, comments: 89 },
        url: "https://tiktok.com/example-video-789"
      },
      ai_analysis: {
        confidence: 73,
        threat_indicators: [
          "Religious targeting language",
          "Us vs them mentality",
          "Calls for community action",
          "Promotes exclusion",
          "Spreads religious intolerance"
        ],
        similar_patterns: 15
      }
    },
    {
      id: 7,
      type: 'spam',
      severity: 'low',
      title: 'Coordinated Bot Activity Detected',
      platform: 'Twitter/X',
      location: 'Multiple Locations',
      time: '1 hour ago',
      engagement: 890,
      status: 'investigating',
      content: {
        text: "🎉 CONGRATULATIONS! You've been selected for our EXCLUSIVE cryptocurrency giveaway! 💰 Send 0.1 BTC to claim your 2 BTC reward! Limited time offer! #CryptoGiveaway #Bitcoin #FreeMoneyy",
        author: {
          name: "Crypto Rewards Official",
          verified: false,
          followers: 234,
          account_age: "1 day"
        },
        media: [{ type: 'image', description: 'Fake cryptocurrency promotion graphic' }],
        reactions: { likes: 45, retweets: 123, comments: 12 },
        url: "https://twitter.com/example-scam-123"
      },
      ai_analysis: {
        confidence: 96,
        threat_indicators: [
          "Classic cryptocurrency scam pattern",
          "Requests upfront payment",
          "Too good to be true offers",
          "Newly created account",
          "Multiple similar accounts detected"
        ],
        similar_patterns: 45
      }
    },
    {
      id: 8,
      type: 'misinformation',
      severity: 'high',
      title: 'False Climate Change Denial Campaign',
      platform: 'YouTube',
      location: 'Cape Town, South Africa',
      time: '2 hours ago',
      engagement: 5600,
      status: 'pending',
      content: {
        text: "EXPOSED: Climate change is a HOAX created by Western powers to control African development! Don't let them fool you with fake science! Our traditional weather patterns are normal! 🌍 #ClimateHoax #AfricaFirst",
        author: {
          name: "Africa Truth Channel",
          verified: false,
          followers: 89000,
          account_age: "2 years"
        },
        media: [{ type: 'video', description: '45-minute video spreading climate misinformation' }],
        reactions: { likes: 2300, shares: 890, comments: 567 },
        url: "https://youtube.com/example-video-climate"
      },
      ai_analysis: {
        confidence: 91,
        threat_indicators: [
          "Climate science denial",
          "Conspiracy theory promotion",
          "Anti-Western sentiment exploitation",
          "Undermines environmental action",
          "Spreads scientific misinformation"
        ],
        similar_patterns: 6
      }
    }
  ];

  const ContentReviewInterface = () => {
    if (!selectedAlert) {
      return (
        <Card className="p-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
          <h3 className="text-xl mb-2" style={{ color: colors.text }}>Select Content to Analyze</h3>
          <p style={{ color: colors.textSecondary }}>Choose an alert from the list to begin detailed analysis</p>
        </Card>
      );
    }

    const alert = selectedAlert;
    const content = alert.content;

    return (
      <div className="space-y-6">
        {/* Content Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge 
                variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                size="lg"
              >
                {alert.severity}
              </Badge>
              <Badge variant="default">{alert.type.replace('_', ' ')}</Badge>
              <Badge variant="outline">{alert.platform}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                <Flag size={16} />
                Flag as Threat
              </Button>
              <Button variant="secondary" size="sm">
                <CheckCircle size={16} />
                Mark Reviewed
              </Button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{alert.title}</h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {alert.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {alert.time}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {alert.engagement.toLocaleString()} engaged
            </span>
          </div>
        </Card>

        {/* Original Content */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <FileText className="w-5 h-5" />
            Original Content
          </h3>
          
          <div 
            className="rounded-lg p-4 mb-4"
            style={{ backgroundColor: colors.bgTertiary }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.bgCard }}
              >
                <User className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
              <div>
                <div className="font-medium" style={{ color: colors.text }}>{content.author.name}</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {content.author.followers && `${content.author.followers.toLocaleString()} followers`}
                  {content.author.account_age && ` • Account: ${content.author.account_age}`}
                  {content.author.groups && ` • ${content.author.groups} groups`}
                </div>
              </div>
            </div>
            
            <p className="leading-relaxed mb-4" style={{ color: colors.text }}>{content.text}</p>
            
            {content.media && content.media.length > 0 && (
              <div 
                className="border rounded p-3 mb-4"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                  <FileImage size={16} />
                  Media: {content.media[0].description}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm" style={{ color: colors.textSecondary }}>
              {content.reactions && (
                <>
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {content.reactions.likes || content.reactions.reactions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 size={14} />
                    {content.reactions.shares || content.reactions.retweets}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {content.reactions.comments}
                  </span>
                </>
              )}
              {content.forwarded_count && (
                <span className="flex items-center gap-1">
                  <RotateCcw size={14} />
                  {content.forwarded_count} forwards
                </span>
              )}
            </div>
          </div>

          {content.url && (
            <Button variant="ghost" size="sm" className="mb-4">
              <ExternalLink size={14} className="mr-2" />
              View Original Post
            </Button>
          )}
        </Card>

        {/* AI Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <Brain className="w-5 h-5" style={{ color: colors.secondary }} />
            AI Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Confidence Score</span>
                  <span className="font-bold" style={{ color: colors.text }}>{alert.ai_analysis.confidence}%</span>
                </div>
                <div 
                  className="w-full rounded-full h-2"
                  style={{ backgroundColor: colors.bgTertiary }}
                >
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${alert.ai_analysis.confidence}%`,
                      background: 'linear-gradient(to right, #f59e0b, #ef4444)'
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Similar Patterns Found</span>
                <p className="text-2xl font-bold" style={{ color: colors.text }}>{alert.ai_analysis.similar_patterns}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2" style={{ color: colors.text }}>Threat Indicators</h4>
              <ul className="space-y-1">
                {alert.ai_analysis.threat_indicators.map((indicator, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <AlertCircle size={12} style={{ color: colors.warning }} />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Analyst Tools */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <Settings className="w-5 h-5" style={{ color: colors.primary }} />
            Analysis Tools
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classification */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: colors.text }}>Classification</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>Threat Type</label>
                  <select 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text,
                      focusRingColor: colors.primary
                    }}
                    value={analysisData.classification}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, classification: e.target.value }))}
                  >
                    <option value="">Select classification...</option>
                    <option value="misinformation">Misinformation</option>
                    <option value="hate_speech">Hate Speech</option>
                    <option value="incitement">Incitement to Violence</option>
                    <option value="spam">Spam/Bot Activity</option>
                    <option value="false_positive">False Positive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>Priority Level</label>
                  <select 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                    value={analysisData.priority}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Confidence ({analysisData.confidence}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={analysisData.confidence}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, confidence: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: colors.text }}>Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  <Camera size={16} className="mr-2" />
                  Take Screenshot
                </Button>
                <Button variant="secondary" className="w-full">
                  <Download size={16} className="mr-2" />
                  Save Evidence
                </Button>
                <Button variant="secondary" className="w-full">
                  <Share2 size={16} className="mr-2" />
                  Share with Team
                </Button>
                <Button variant="warning" className="w-full">
                  <AlertTriangle size={16} className="mr-2" />
                  Escalate to Supervisor
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Analysis Notes</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24 focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              placeholder="Add your analysis notes, context, and recommendations..."
              value={analysisData.notes}
              onChange={(e) => setAnalysisData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button variant="success">
              <CheckCircle size={16} className="mr-2" />
              Complete Analysis
            </Button>
            <Button variant="secondary">
              <Clock size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button variant="danger">
              <XCircle size={16} className="mr-2" />
              Reject/Archive
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  // Enhanced filtering function
  const getFilteredAlerts = () => {
    return detailedAlerts.filter(alert => {
      if (filters.status !== 'all' && alert.status !== filters.status) return false;
      if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
      if (filters.type !== 'all' && alert.type !== filters.type) return false;
      if (filters.platform !== 'all' && alert.platform !== filters.platform) return false;
      return true;
    });
  };

  const AlertsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('time');
    
    const filteredAlerts = getFilteredAlerts().filter(alert =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.content.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedAlerts = [...filteredAlerts].sort((a, b) => {
      switch(sortBy) {
        case 'confidence':
          return b.ai_analysis.confidence - a.ai_analysis.confidence;
        case 'engagement':
          return b.engagement - a.engagement;
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        default:
          return 0; // Keep original order for time
      }
    });

    return (
      <Card className="p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Content Queue</h3>
            <Badge variant="primary" size="sm">
              {filteredAlerts.length} of {detailedAlerts.length}
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
            <input
              type="text"
              placeholder="Search alerts, content, or locations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="investigating">Investigating</option>
              <option value="completed">Completed</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.severity}
              onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">All Types</option>
              <option value="misinformation">Misinformation</option>
              <option value="hate_speech">Hate Speech</option>
              <option value="incitement">Incitement</option>
              <option value="spam">Spam/Bots</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.platform}
              onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
            >
              <option value="all">All Platforms</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter/X">Twitter/X</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Telegram">Telegram</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.textSecondary }}>Sort by:</span>
            <select 
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="time">Latest First</option>
              <option value="confidence">AI Confidence</option>
              <option value="engagement">Engagement</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3" style={{ color: colors.textMuted }} />
              <p style={{ color: colors.textSecondary }}>No alerts match your current filters</p>
            </div>
          ) : (
            sortedAlerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  selectedAlert?.id === alert.id ? 'ring-2' : ''
                }`}
                style={{ 
                  borderColor: selectedAlert?.id === alert.id ? colors.primary : colors.border,
                  backgroundColor: selectedAlert?.id === alert.id ? `${colors.primary}10` : colors.bgCard,
                  ringColor: colors.primary
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge 
                        variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                      <Badge variant="default" size="sm">{alert.type.replace('_', ' ')}</Badge>
                      <span className="text-xs" style={{ color: colors.textMuted }}>{alert.platform}</span>
                      {alert.status === 'investigating' && (
                        <Badge variant="warning" size="sm">
                          <Activity className="w-3 h-3 mr-1" />
                          In Progress
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-medium mb-1 truncate" style={{ color: colors.text }}>{alert.title}</h4>
                    <p className="text-sm mb-2 line-clamp-2" style={{ color: colors.textSecondary }}>
                      {alert.content.text.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: colors.textMuted }}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {alert.engagement.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-3 flex-shrink-0">
                    <div className="text-sm font-medium" style={{ color: colors.text }}>{alert.ai_analysis.confidence}%</div>
                    <div className="text-xs" style={{ color: colors.textMuted }}>confidence</div>
                    <div 
                      className="w-2 h-2 rounded-full mt-1 mx-auto"
                      style={{ 
                        backgroundColor: alert.ai_analysis.confidence > 85 ? colors.danger : 
                                        alert.ai_analysis.confidence > 70 ? colors.warning : colors.success 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
          <div className="flex gap-2 flex-wrap">
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none">
              <CheckCircle className="w-4 h-4 mr-1" />
              Bulk Review
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
              <RotateCcw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <AnalystSideNavigation onLogout={onLogout} />
      
      <div className="ml-64 pt-16">
        {/* Header */}
        <div 
          className="backdrop-blur-sm border-b px-6 py-4 transition-all duration-300"
          style={{ 
            backgroundColor: colors.navBg,
            borderColor: colors.navBorder 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.gradientSecondary }}
                >
                  <Search className="w-5 h-5 text-white" />
                </div>
                Analyst Workstation
              </h1>
              <p className="mt-1" style={{ color: colors.textSecondary }}>
                Detailed content analysis and threat investigation • {user?.name} • {user?.role}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="primary" size="lg">
                {detailedAlerts.filter(a => a.status === 'pending').length} Pending Review
              </Badge>
              
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - Alerts List */}
            <div className="lg:col-span-2">
              <AlertsList />
            </div>
            
            {/* Right Panel - Content Review */}
            <div className="lg:col-span-3">
              <ContentReviewInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalystSideNavigation = ({ onLogout }) => {
  const { colors } = useTheme();
  const [currentApp, setCurrentApp] = useState('analyst');

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Home },
    { id: 'analyst', label: 'Analyst Workstation', icon: Search },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigation = (id) => {
    if (id === 'dashboard') {
      window.location.reload();
    } else {
      setCurrentApp(id);
    }
  };

  return (
    <div 
      className="w-64 backdrop-blur-sm border-r h-screen fixed left-0 top-16 z-40 transition-all duration-300"
      style={{ 
        backgroundColor: colors.navBg,
        borderColor: colors.navBorder 
      }}
    >
      <div className="p-4">
        <div className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                currentApp === item.id ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: currentApp === item.id ? colors.primary : 'transparent',
                color: currentApp === item.id ? '#ffffff' : colors.textSecondary
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
        
        <div 
          className="border-t mt-6 pt-6"
          style={{ borderColor: colors.border }}
        >
          <Button variant="danger" className="w-full" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== DASHBOARD NAVIGATION ====================

const SideNavigation = ({ activeTab, setActiveTab, onLogout, onAnalystClick }) => {
  const { colors } = useTheme();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analyst', label: 'Analyst Workstation', icon: Search, isAnalyst: true },
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'geographic', label: 'Geographic Intel', icon: Globe2 },
    { id: 'platforms', label: 'Platform Analysis', icon: Monitor },
    { id: 'alerts', label: 'Alert Management', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (item) => {
    if (item.isAnalyst) {
      onAnalystClick();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div 
      className="w-64 backdrop-blur-sm border-r h-screen fixed left-0 top-16 z-40 transition-all duration-300"
      style={{ 
        backgroundColor: colors.navBg,
        borderColor: colors.navBorder 
      }}
    >
      <div className="p-4">
        <div className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                activeTab === item.id ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: activeTab === item.id ? colors.primary : 'transparent',
                color: activeTab === item.id ? '#ffffff' : colors.textSecondary
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
        
        <div 
          className="border-t mt-6 pt-6"
          style={{ borderColor: colors.border }}
        >
          <Button variant="danger" className="w-full" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== DASHBOARD COMPONENTS ====================

const LandingPage = ({ onAuthClick, onDemoClick }) => {
  const { colors, isDark } = useTheme();
  const [stats] = useState({
    contentMonitored: 2480000,
    accuracyRate: 94,
    platformsMonitored: 8,
    threatsDetected: 12500,
    countriesProtected: 15,
    responseTime: 2.3
  });

  // Dynamic Text Animation Component
  const DynamicWelcomeText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = [
      'Sui-Ru',
      'Digital Safety', 
      'AI Protection',
      'Smart Defense',
      'Cyber Security',
      'Africa Monitor'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }, 2500);
      return () => clearInterval(interval);
    }, [words.length]);

    return (
      <div className="relative h-20 overflow-hidden">
        {words.map((word, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentWordIndex 
                ? 'transform translate-y-0 opacity-100' 
                : index < currentWordIndex 
                  ? 'transform -translate-y-full opacity-0'
                  : 'transform translate-y-full opacity-0'
            }`}
          >
            <span 
              className="bg-clip-text text-transparent text-6xl lg:text-7xl font-bold block"
              style={{ 
                background: colors.gradientPrimary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Holographic 3D Cameroon Map (Based on your reference image)
 

  // Floating background elements
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main flowing curves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: colors.secondary, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: colors.primary, stopOpacity: 0.1 }} />
          </linearGradient>
          <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.secondary, stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: colors.primary, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        
        {/* Large flowing curve */}
        <path
          d="M0,400 Q300,200 600,300 T1200,250"
          stroke="url(#curve1)"
          strokeWidth="100"
          fill="none"
          className="animate-pulse"
        />
        
        {/* Secondary curve */}
        <path
          d="M200,600 Q500,400 800,500 T1400,450"
          stroke="url(#curve2)"
          strokeWidth="60"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Subtle accent curves */}
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 200},${300 + i * 50} Q${300 + i * 100},${200 + i * 30} ${600 + i * 150},${250 + i * 40}`}
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            backgroundColor: colors.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div 
      className="pt-16 min-h-screen relative overflow-hidden transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <FloatingElements />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div 
                className="inline-flex items-center px-6 py-3 border rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
                  borderColor: `${colors.primary}30`,
                  boxShadow: `0 0 30px ${colors.primary}20`
                }}
              >
                <Zap className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                <span className="font-medium" style={{ color: colors.primary }}>AI-Powered Detection System</span>
                <div className="ml-3 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.success }} />
              </div>
              
              {/* Main Heading with Dynamic Text */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    <span style={{ color: colors.text }}>Welcome to</span>
                  </h1>
                  <DynamicWelcomeText />
                </div>
                
                <div className="text-2xl font-light leading-relaxed max-w-2xl" style={{ color: colors.textSecondary }}>
                  Advanced <span className="font-semibold" style={{ color: colors.primary }}>misinformation</span> and{' '}
                  <span className="font-semibold" style={{ color: colors.secondary }}>hate speech</span> monitoring
                  for Cameroon's digital communities
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div 
                  className="flex items-center px-6 py-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-within:scale-105"
                  style={{ 
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                    boxShadow: `0 0 40px ${colors.primary}10`
                  }}
                >
                  <Search className="w-5 h-5 mr-4" style={{ color: colors.textMuted }} />
                  <input
                    type="text"
                    placeholder="Search threats, content, or regions..."
                    className="flex-1 bg-transparent outline-none text-lg"
                    style={{ color: colors.text }}
                  />
                  <Button variant="primary" size="sm" className="ml-2">
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={onDemoClick}
                className="px-8 py-4 text-lg font-semibold"
              >
                <Eye className="w-6 h-6 mr-3" />
                Explore Demo
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => onAuthClick('register')}
                className="px-8 py-4 text-lg"
              >
                <UserPlus className="w-6 h-6 mr-3" />
                Start Free Trial
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {(stats.contentMonitored / 1000000).toFixed(1)}M+
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Content Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {stats.accuracyRate}%
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {stats.responseTime}s
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Response Time</div>
              </div>
            </div>
          </div>

         {/* Right Column - 3D Cameroon */}
        <div className="flex justify-center lg:justify-end">
          <div>
          <img src="/map.png" alt="3D map of Cameroon" />          </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Protecting Digital Cameroon
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Real-time monitoring and analysis across multiple platforms with AI-powered threat detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden" 
              glow
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientPrimary }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientPrimary }}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                {stats.threatsDetected.toLocaleString()}+
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.primary }}>Threats Detected</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>This month</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden" 
              glow
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientSecondary }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientSecondary }}
              >
                <Globe2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                10
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.secondary }}>Regions Protected</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Across Cameroon</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden" 
              glow
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientSuccess }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientSuccess }}
              >
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                24/7
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.success }}>Live Monitoring</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Always active</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden" 
              glow
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientDanger }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientDanger }}
              >
                <Network className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                {stats.platformsMonitored}+
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.danger }}>Platforms</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Monitored</div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Advanced AI Detection
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Cutting-edge technology specifically trained for Cameroon's contexts and languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientPrimary }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Brain className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>AI Detection</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Machine learning algorithms trained on Cameroon's languages and cultural contexts for accurate threat identification.
              </p>
            </Card>

            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientSecondary }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <Radar className="w-7 h-7" style={{ color: colors.secondary }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Real-time Analysis</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Monitor social media platforms in real-time with instant threat detection and automated response systems.
              </p>
            </Card>

            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientSuccess }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.success}20` }}
              >
                <Target className="w-7 h-7" style={{ color: colors.success }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Precision Alerts</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Intelligent alert system that prioritizes threats and provides actionable insights for rapid response.
              </p>
            </Card>
          </div>
        </div>

        {/* Testimonials/Social Proof */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Trusted by Organizations
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Leading institutions across Cameroon trust Sui-Ru for digital safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ministry of Communication", country: "Cameroon", logo: Building },
              { name: "Digital Rights Foundation", country: "Nigeria", logo: Shield },
              { name: "Tech Innovation Hub", country: "Kenya", logo: Cpu }
            ].map((org, index) => (
              <Card key={index} className="p-8 text-center transition-all duration-300 hover:scale-105">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: colors.bgTertiary }}
                >
                  <org.logo className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
                <h4 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>{org.name}</h4>
                <p style={{ color: colors.textSecondary }}>{org.country}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Testimonials with Quotes */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              What Our Users Say
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Real feedback from organizations using Sui-Ru to protect their communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Sui-Ru has revolutionized how we monitor and respond to digital threats. The AI accuracy for Cameroon's languages is remarkable.",
                author: "Dr. Marie Ngozi",
                role: "Director of Digital Safety",
                organization: "Ministry of Communication, Cameroon",
                rating: 5
              },
              {
                quote: "The real-time alerts have helped us prevent several misinformation campaigns from spreading during critical periods in our regions.",
                author: "Jean-Paul Mbarga",
                role: "Chief Information Officer",
                organization: "Elections Cameroon (ELECAM)",
                rating: 5
              },
              {
                quote: "Finally, a solution that understands our local context and languages. The threat detection across all 10 regions is incredibly precise.",
                author: "Dr. Aminatou Ahidjo",
                role: "Head of Digital Communications",
                organization: "Cameroon Ministry of Posts and Telecommunications",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 rounded-full" style={{ background: colors.gradientPrimary }} />
                <div className="relative z-10">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full mr-1" style={{ backgroundColor: colors.warning }}>
                        <span className="text-white text-xs flex items-center justify-center h-full">★</span>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed mb-6" style={{ color: colors.text }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: colors.bgTertiary }}
                    >
                      <User className="w-6 h-6" style={{ color: colors.textSecondary }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: colors.text }}>{testimonial.author}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{testimonial.role}</div>
                      <div className="text-xs" style={{ color: colors.textMuted }}>{testimonial.organization}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Real-world impact of Sui-Ru in protecting Cameroon's digital communities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Municipal Election Protection",
                location: "Douala, Littoral Region, 2023",
                challenge: "Widespread misinformation campaigns targeting municipal electoral processes across social media platforms",
                solution: "Deployed Sui-Ru's AI monitoring system to track and identify false election information in real-time across Cameroon's regions",
                results: [
                  "Detected 1,247 false election posts",
                  "Prevented 91% from viral spread",
                  "Protected 8M+ Cameroonians from misinformation"
                ],
                icon: Vote,
                color: colors.primary
              },
              {
                title: "Regional Harmony Initiative",
                location: "Northwest & Southwest Regions, 2023",
                challenge: "Rising regional tensions fueled by hate speech on social media platforms between different communities",
                solution: "Implemented comprehensive hate speech detection with cultural context understanding for Cameroon's diverse regions",
                results: [
                  "Identified 834 hate speech incidents",
                  "Reduced regional tension posts by 68%",
                  "Improved inter-community relations index by 42%"
                ],
                icon: Heart,
                color: colors.success
              }
            ].map((study, index) => (
              <Card key={index} className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full" style={{ background: `linear-gradient(135deg, ${study.color}20, ${study.color}10)` }} />
                <div className="relative z-10">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${study.color}20` }}
                  >
                    <study.icon className="w-8 h-8" style={{ color: study.color }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{study.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: colors.textSecondary }}>{study.location}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Challenge</h4>
                      <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Solution</h4>
                      <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center text-sm" style={{ color: colors.textSecondary }}>
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: colors.success }} />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Coverage Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Comprehensive Platform Coverage
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Monitor threats across all major social media and messaging platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { name: "Facebook", icon: Globe, users: "2.9B", coverage: "98%" },
              { name: "WhatsApp", icon: MessageSquare, users: "2.0B", coverage: "95%" },
              { name: "Twitter/X", icon: MessageCircle, users: "450M", coverage: "97%" },
              { name: "Instagram", icon: Camera, users: "2.0B", coverage: "94%" },
              { name: "TikTok", icon: Video, users: "1.0B", coverage: "92%" },
              { name: "YouTube", icon: Play, users: "2.7B", coverage: "96%" },
              { name: "Telegram", icon: Send, users: "700M", coverage: "89%" },
              { name: "LinkedIn", icon: Users2, users: "900M", coverage: "91%" }
            ].map((platform, index) => (
              <Card key={index} className="p-6 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientPrimary }} />
                <div className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <platform.icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <h4 className="font-semibold mb-1" style={{ color: colors.text }}>{platform.name}</h4>
                  <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>{platform.users} users</p>
                  <div className="text-xs font-medium" style={{ color: colors.success }}>{platform.coverage} coverage</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Preview Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Flexible Plans for Every Organization
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              From small NGOs to government agencies, we have a plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$299",
                period: "/month",
                description: "Perfect for small organizations and NGOs",
                features: [
                  "Up to 100K content pieces/month",
                  "3 platform monitoring",
                  "Basic AI detection",
                  "Email alerts",
                  "Standard support"
                ],
                popular: false,
                color: colors.textSecondary
              },
              {
                name: "Professional",
                price: "$899",
                period: "/month",
                description: "Ideal for medium organizations and institutions",
                features: [
                  "Up to 1M content pieces/month",
                  "8 platform monitoring",
                  "Advanced AI detection",
                  "Real-time alerts",
                  "Priority support",
                  "Custom reporting"
                ],
                popular: true,
                color: colors.primary
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For government agencies and large organizations",
                features: [
                  "Unlimited content monitoring",
                  "All platform coverage",
                  "Custom AI training",
                  "Dedicated support",
                  "On-premise deployment",
                  "Advanced analytics"
                ],
                popular: false,
                color: colors.secondary
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden ${plan.popular ? 'ring-2' : ''}`}
                style={{ 
                  ringColor: plan.popular ? colors.primary : 'transparent',
                  background: plan.popular ? `linear-gradient(135deg, ${colors.primary}10, ${colors.primary}05)` : 'transparent'
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Most Popular
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-lg" style={{ color: colors.textSecondary }}>{plan.period}</span>
                  </div>
                  <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm" style={{ color: colors.textSecondary }}>
                        <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: colors.success }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? "primary" : "secondary"} 
                    size="lg" 
                    className="w-full"
                    onClick={() => onAuthClick('register')}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <Card className="p-12 relative overflow-hidden" glow>
            <div className="absolute inset-0 bg-gradient-to-r opacity-5" style={{ background: colors.gradientPrimary }} />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6" style={{ color: colors.text }}>
                Ready to Secure Your Digital Space?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Join the mission to protect African digital communities from misinformation and hate speech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={onDemoClick}
                  className="px-10 py-5 text-lg font-semibold"
                >
                  <Eye className="w-6 h-6 mr-3" />
                  Start Free Demo
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => onAuthClick('register')}
                  className="px-10 py-5 text-lg"
                >
                  <Mail className="w-6 h-6 mr-3" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
    </div>
  );
};

const AuthPage = ({ mode, onSubmit, onModeSwitch, onBack }) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      className="pt-16 min-h-screen flex items-center justify-center transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-md w-full mx-4">
        <Card className="p-8">
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={onBack} className="absolute top-6 left-6">
              ← Back
            </Button>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: colors.gradientPrimary }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: colors.textSecondary }}>
              {mode === 'login' ? 'Sign in to your Sui-Ru account' : 'Join the Sui-Ru monitoring platform'}
            </p>
          </div>

          <div className="space-y-6">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                    placeholder="Your organization"
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: colors.bgTertiary,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: colors.bgTertiary,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Enter your password"
              />
            </div>

            <Button onClick={onSubmit} variant="primary" size="lg" className="w-full">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <span style={{ color: colors.textSecondary }}>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => onModeSwitch(mode === 'login' ? 'register' : 'login')}
              className="font-medium transition-colors duration-200"
              style={{ color: colors.primary }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Executive Dashboard component
const ExecutiveDashboard = ({ user, onLogout, onAnalystClick }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({
    totalContent: 2480000,
    activeThreats: 23,
    accuracy: 94.2,
    platforms: 8,
    lastUpdate: new Date()
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock real-time data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalContent: prev.totalContent + Math.floor(Math.random() * 100),
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : -1)),
        accuracy: Math.min(100, Math.max(90, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        lastUpdate: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Mock chart data
  const threatTrendData = [
    { time: '00:00', threats: 15, misinformation: 8, hate_speech: 7 },
    { time: '04:00', threats: 12, misinformation: 6, hate_speech: 6 },
    { time: '08:00', threats: 18, misinformation: 11, hate_speech: 7 },
    { time: '12:00', threats: 25, misinformation: 15, hate_speech: 10 },
    { time: '16:00', threats: 31, misinformation: 18, hate_speech: 13 },
    { time: '20:00', threats: 23, misinformation: 12, hate_speech: 11 },
    { time: '24:00', threats: 23, misinformation: 13, hate_speech: 10 }
  ];

  const platformData = [
    { name: 'Facebook', threats: 35, color: '#1877F2' },
    { name: 'Twitter/X', threats: 28, color: '#000000' },
    { name: 'WhatsApp', threats: 22, color: '#25D366' },
    { name: 'TikTok', threats: 18, color: '#FE2C55' },
    { name: 'Instagram', threats: 15, color: '#E4405F' },
    { name: 'YouTube', threats: 12, color: '#FF0000' },
    { name: 'Telegram', threats: 8, color: '#0088CC' },
    { name: 'Others', threats: 5, color: '#666666' }
  ];

  const geographicData = [
    { region: 'Centre Region', threats: 45, population: 4.1, severity: 'high' },
    { region: 'Littoral Region', threats: 38, population: 3.2, severity: 'high' },
    { region: 'West Region', threats: 22, population: 1.9, severity: 'medium' },
    { region: 'Northwest Region', threats: 18, population: 2.0, severity: 'medium' },
    { region: 'Southwest Region', threats: 15, population: 1.5, severity: 'low' },
    { region: 'Far North Region', threats: 28, population: 4.0, severity: 'high' },
    { region: 'North Region', threats: 12, population: 2.4, severity: 'low' },
    { region: 'Adamawa Region', threats: 8, population: 1.1, severity: 'low' },
    { region: 'East Region', threats: 6, population: 0.8, severity: 'low' },
    { region: 'South Region', threats: 10, population: 0.7, severity: 'low' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'misinformation',
      severity: 'critical',
      title: 'False Election Information Spreading',
      platform: 'Facebook',
      location: 'Douala, Cameroon',
      time: '2 minutes ago',
      engagement: 1250,
      status: 'active'
    },
    {
      id: 2,
      type: 'hate_speech',
      severity: 'high',
      title: 'Ethnic Tension Content Detected',
      platform: 'WhatsApp',
      location: 'Yaoundé, Cameroon',
      time: '8 minutes ago',
      engagement: 890,
      status: 'investigating'
    },
    {
      id: 3,
      type: 'misinformation',
      severity: 'medium',
      title: 'Health Misinformation Campaign',
      platform: 'Twitter/X',
      location: 'Lagos, Nigeria',
      time: '15 minutes ago',
      engagement: 2100,
      status: 'resolved'
    }
  ];

  const ContentMonitoringFeed = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
          <Activity className="w-5 h-5" style={{ color: colors.primary }} />
          Live Content Monitoring
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'animate-pulse' : ''}`} style={{ backgroundColor: isLive ? colors.success : colors.textMuted }}></div>
          <span className="text-sm" style={{ color: colors.textSecondary }}>{isLive ? 'Live' : 'Paused'}</span>
          <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)}>
            {isLive ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentAlerts.map(alert => (
          <div 
            key={alert.id} 
            className="border rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              borderColor: colors.border,
              backgroundColor: colors.bgCard
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {alert.severity}
                  </Badge>
                  <Badge variant="default" size="sm">{alert.type.replace('_', ' ')}</Badge>
                  <span className="text-xs" style={{ color: colors.textMuted }}>{alert.platform}</span>
                </div>
                
                <h4 className="font-medium mb-1" style={{ color: colors.text }}>{alert.title}</h4>
                
                <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {alert.engagement.toLocaleString()} engaged
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {alert.time}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onAnalystClick}>
                  <Search size={14} />
                  Analyze
                </Button>
                <Badge 
                  variant={
                    alert.status === 'active' ? 'danger' : 
                    alert.status === 'investigating' ? 'warning' : 'success'
                  }
                  size="sm"
                >
                  {alert.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const GeographicIntelligence = () => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
        <Map className="w-5 h-5" style={{ color: colors.secondary }} />
        Regional Intelligence
      </h3>
      
      <div className="space-y-4">
        {geographicData.map((region, index) => (
          <div 
            key={region.region} 
            className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ backgroundColor: colors.bgTertiary }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: region.severity === 'high' ? colors.danger :
                                   region.severity === 'medium' ? colors.warning : colors.success
                }}
              ></div>
              <div>
                <div className="font-medium" style={{ color: colors.text }}>{region.region}</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{region.population}M population</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold" style={{ color: colors.text }}>{region.threats}</div>
              <div className="text-xs" style={{ color: colors.textMuted }}>active threats</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                  borderColor: `${colors.primary}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Total Content Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>
                      {(realTimeData.totalContent / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}>
                      +{Math.floor(Math.random() * 50 + 20)}K today
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Database className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.danger}20 0%, ${colors.danger}10 100%)`,
                  borderColor: `${colors.danger}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.danger }}>Active Threats</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.activeThreats}</p>
                    <p className="text-xs mt-1" style={{ color: colors.danger }}>
                      {Math.random() > 0.5 ? '+2' : '-1'} from yesterday
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.danger}20` }}
                  >
                    <AlertTriangle className="w-6 h-6" style={{ color: colors.danger }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.success}20 0%, ${colors.success}10 100%)`,
                  borderColor: `${colors.success}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.success }}>Detection Accuracy</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.accuracy.toFixed(1)}%</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>
                      +0.3% this week
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.success}20` }}
                  >
                    <Target className="w-6 h-6" style={{ color: colors.success }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondary}10 100%)`,
                  borderColor: `${colors.secondary}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.secondary }}>Platforms Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.platforms}</p>
                    <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                      All systems operational
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.secondary}20` }}
                  >
                    <Network className="w-6 h-6" style={{ color: colors.secondary }} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Threat Trends */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Threat Trends (24h)</h3>
                  <div className="flex gap-2">
                    {['6h', '24h', '7d', '30d'].map(period => (
                      <Button
                        key={period}
                        variant={selectedTimeframe === period ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedTimeframe(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Area type="monotone" dataKey="threats" stackId="1" stroke={colors.danger} fill={colors.danger} fillOpacity={0.2} />
                    <Line type="monotone" dataKey="misinformation" stroke={colors.warning} strokeWidth={2} />
                    <Line type="monotone" dataKey="hate_speech" stroke={colors.secondary} strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>

              {/* Platform Distribution */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Platform Distribution</h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="threats"
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Lower Section: Live Feed & Geographic Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {ContentMonitoringFeed()}
              </div>
              <div>
                <GeographicIntelligence />
              </div>
            </div>
          </>
        );
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Live Content Monitoring</h3>
              <p style={{ color: colors.textSecondary }}>Real-time content analysis and threat detection across all monitored platforms.</p>
            </Card>
            {ContentMonitoringFeed()}
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Advanced Analytics</h3>
              <p style={{ color: colors.textSecondary }}>Deep insights and trend analysis for strategic decision making.</p>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Threat Pattern Analysis</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`, 
                        borderRadius: '8px',
                        color: colors.text
                      }} 
                    />
                    <Area type="monotone" dataKey="threats" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Geographic Distribution</h4>
                <GeographicIntelligence />
              </Card>
            </div>
          </div>
        );
      
      case 'geographic':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Geographic Intelligence</h3>
              <p style={{ color: colors.textSecondary }}>Regional analysis and geospatial threat mapping.</p>
            </Card>
            <GeographicIntelligence />
          </div>
        );
      
      case 'platforms':
        return <PlatformAnalysisPage />;
      
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} onAnalystClick={onAnalystClick} />
      
      <div className="ml-64 pt-16">
        {/* Header */}
        <div 
          className="backdrop-blur-sm border-b px-6 py-4 transition-all duration-300"
          style={{ 
            backgroundColor: colors.navBg,
            borderColor: colors.navBorder 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.gradientPrimary }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                {activeTab === 'dashboard' ? 'Executive Dashboard' :
                 activeTab === 'monitoring' ? 'Live Monitoring' :
                 activeTab === 'analytics' ? 'Advanced Analytics' :
                 activeTab === 'geographic' ? 'Geographic Intelligence' :
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="mt-1" style={{ color: colors.textSecondary }}>
                Real-time misinformation and hate speech monitoring
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div 
                  className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: connectionStatus === 'connected' ? colors.success : colors.danger }}
                ></div>
                <span style={{ color: colors.textSecondary }}>
                  {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
                <Wifi size={16} style={{ color: colors.textSecondary }} />
              </div>
              
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Last updated: {realTimeData.lastUpdate.toLocaleTimeString()}
              </div>
              
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {renderTabContent()}

          {/* Quick Actions - Only show on dashboard */}
          {activeTab === 'dashboard' && (
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={Search} onClick={onAnalystClick}>
                  Open Analyst Workstation
                </Button>
                <Button variant="primary" icon={Download}>Export Report</Button>
                <Button variant="secondary" icon={Settings}>Configure Alerts</Button>
                <Button variant="secondary" icon={Calendar}>Schedule Analysis</Button>
                <Button variant="ghost" icon={FileText}>View Detailed Reports</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== NEW PAGE COMPONENTS ====================

// About Page Component
const AboutPage = () => {
  const { colors } = useTheme();
  
  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            About Sui-Ru MHSMS
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Advanced Misinformation and Hate Speech Monitoring System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 mr-3" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>Our Mission</h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Sui-Ru MHSMS is dedicated to protecting digital communities by providing real-time monitoring 
              and analysis of misinformation and hate speech across social media platforms. We leverage 
              advanced AI technology to detect, analyze, and respond to harmful content before it spreads.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 mr-3" style={{ color: colors.secondary }} />
              <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>AI Technology</h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Our system uses cutting-edge machine learning algorithms and natural language processing 
              to identify patterns, analyze sentiment, and classify content with high accuracy. 
              We continuously improve our models to stay ahead of evolving threats.
            </p>
          </Card>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Radar className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Real-time Monitoring</h3>
              <p style={{ color: colors.textSecondary }}>
                24/7 surveillance of social media platforms for immediate threat detection
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Advanced Analytics</h3>
              <p style={{ color: colors.textSecondary }}>
                Comprehensive data analysis and visualization for informed decision making
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Community Protection</h3>
              <p style={{ color: colors.textSecondary }}>
                Safeguarding online communities from harmful content and misinformation
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            Our Commitment
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: colors.textSecondary }}>
            We are committed to maintaining the highest standards of accuracy, privacy, and ethical AI practices. 
            Our team works closely with cybersecurity experts, social media platforms, and government agencies 
            to ensure effective and responsible content monitoring.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Badge variant="primary" size="lg">Privacy First</Badge>
            <Badge variant="success" size="lg">Ethical AI</Badge>
            <Badge variant="secondary" size="lg">24/7 Support</Badge>
            <Badge variant="outline" size="lg">Continuous Innovation</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

// FAQ Page Component
const FAQPage = () => {
  const { colors } = useTheme();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is Sui-Ru MHSMS?",
      answer: "Sui-Ru MHSMS (Misinformation and Hate Speech Monitoring System) is an advanced AI-powered platform that monitors social media platforms in real-time to detect, analyze, and respond to misinformation and hate speech content."
    },
    {
      question: "How does the AI detection work?",
      answer: "Our system uses advanced machine learning algorithms, natural language processing, and pattern recognition to analyze text, images, and video content. The AI models are trained on vast datasets and continuously updated to improve accuracy and detect new types of harmful content."
    },
    {
      question: "Which platforms does the system monitor?",
      answer: "We monitor major social media platforms including Facebook, Twitter, Instagram, WhatsApp, TikTok, and YouTube. Our coverage is continuously expanding to include new platforms and communication channels."
    },
    {
      question: "How accurate is the detection system?",
      answer: "Our AI models achieve over 95% accuracy in detecting misinformation and hate speech. However, all flagged content is reviewed by human analysts to ensure accuracy and reduce false positives."
    },
    {
      question: "What happens when harmful content is detected?",
      answer: "When harmful content is detected, it's immediately flagged in our system, analyzed by our AI for threat level assessment, and then reviewed by human analysts. Depending on the severity, we may alert relevant authorities or platform moderators."
    },
    {
      question: "Is user privacy protected?",
      answer: "Yes, we strictly adhere to privacy regulations and ethical guidelines. We only analyze publicly available content and do not access private messages or personal data. All data is processed securely and anonymized where possible."
    },
    {
      question: "How can I report suspicious content?",
      answer: "You can report suspicious content through our Report page, which provides a secure form for submitting URLs, screenshots, or descriptions of potentially harmful content. Our team will investigate all reports promptly."
    },
    {
      question: "Who has access to the monitoring data?",
      answer: "Access to monitoring data is strictly controlled and limited to authorized personnel including security analysts, researchers, and relevant government agencies. All access is logged and audited for security purposes."
    }
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Find answers to common questions about Sui-Ru MHSMS
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                style={{ backgroundColor: openFAQ === index ? colors.bgTertiary : 'transparent' }}
              >
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            Still have questions?
          </h2>
          <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
            Contact our support team for additional assistance
          </p>
          <Button variant="primary" icon={Mail}>
            Contact Support
          </Button>
        </Card>
      </div>
    </div>
  );
};

// Chatbot Page Component
const ChatbotPage = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m the Sui-Ru AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return 'I can help you with information about our monitoring system, explain how to report content, provide system status updates, and answer questions about our AI detection capabilities.';
    } else if (lowerMessage.includes('report')) {
      return 'To report suspicious content, you can use our Report page or provide me with the details here. I can guide you through the reporting process.';
    } else if (lowerMessage.includes('detection') || lowerMessage.includes('ai')) {
      return 'Our AI detection system uses advanced machine learning to identify misinformation and hate speech with over 95% accuracy. It analyzes text, images, and patterns in real-time across multiple platforms.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('emergency')) {
      return 'For emergencies, please contact the relevant authorities immediately. For system-related issues, you can reach our support team through the Contact page.';
    } else {
      return 'Thank you for your message. I\'m here to help with any questions about our monitoring system, reporting procedures, or general assistance. What would you like to know more about?';
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            AI Assistant
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Get instant help and information about our monitoring system
          </p>
        </div>

        <Card className="h-96 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'rounded-br-none' 
                      : 'rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                    color: message.type === 'user' ? '#ffffff' : colors.text
                  }}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg rounded-bl-none"
                  style={{ backgroundColor: colors.bgTertiary }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: colors.border }}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>AI Powered</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Advanced natural language processing
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: colors.secondary }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>24/7 Available</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Get help anytime, day or night
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: colors.success }} />
            <h3 className="font-semibold mb-1" style={{ color: colors.text }}>Secure</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Your conversations are private and secure
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Image Detection AI Page Component
const ImageDetectionPage = () => {
  const { colors } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        confidence: 87,
        classification: 'Safe Content',
        details: {
          misinformation_risk: 'Low',
          hate_speech_risk: 'None',
          manipulation_detected: false,
          content_type: 'Natural Image',
          objects_detected: ['person', 'building', 'text'],
          text_extracted: 'Sample text found in image'
        },
        recommendations: [
          'Content appears to be authentic',
          'No signs of digital manipulation detected',
          'Text content is factual and non-harmful'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Image Detection AI
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Advanced AI-powered image analysis for misinformation and harmful content detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Upload Image for Analysis
            </h2>
            
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors duration-200 hover:border-blue-500"
              style={{ borderColor: colors.border }}
            >
              <Camera className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textSecondary }} />
              <p className="text-lg mb-4" style={{ color: colors.text }}>
                {selectedFile ? selectedFile.name : 'Select an image to analyze'}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="primary" className="cursor-pointer">
                  <FileImage className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
              </label>
            </div>

            {selectedFile && (
              <div className="mb-6">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <Button 
              variant="primary" 
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Radar className="w-4 h-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Analysis Results
            </h2>
            
            {!analysisResult && !isAnalyzing && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
                <p style={{ color: colors.textMuted }}>
                  Upload an image to see analysis results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" style={{ color: colors.primary }} />
                <p style={{ color: colors.text }}>Analyzing image...</p>
                <p className="text-sm mt-2" style={{ color: colors.textMuted }}>
                  This may take a few moments
                </p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                    {analysisResult.classification}
                  </h3>
                  <Badge 
                    variant={analysisResult.confidence > 80 ? 'success' : 'warning'}
                    size="lg"
                  >
                    {analysisResult.confidence}% Confidence
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Misinformation Risk:</span>
                      <Badge variant={analysisResult.details.misinformation_risk === 'Low' ? 'success' : 'warning'}>
                        {analysisResult.details.misinformation_risk}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Hate Speech Risk:</span>
                      <Badge variant="success">
                        {analysisResult.details.hate_speech_risk}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Manipulation Detected:</span>
                      <Badge variant={analysisResult.details.manipulation_detected ? 'danger' : 'success'}>
                        {analysisResult.details.manipulation_detected ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Detected Objects</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.details.objects_detected.map((object, index) => (
                      <Badge key={index} variant="outline">
                        {object}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5" style={{ color: colors.success }} />
                        <span style={{ color: colors.textSecondary }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <FileImage className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Upload</h3>
              <p style={{ color: colors.textSecondary }}>
                Upload any image file for analysis
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Analyze</h3>
              <p style={{ color: colors.textSecondary }}>
                AI analyzes content, objects, and text
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Results</h3>
              <p style={{ color: colors.textSecondary }}>
                Get detailed analysis and recommendations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Report Page Component
const ReportPage = () => {
  const { colors } = useTheme();
  const [reportData, setReportData] = useState({
    type: '',
    platform: '',
    url: '',
    description: '',
    urgency: 'medium',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setReportData({
        type: '',
        platform: '',
        url: '',
        description: '',
        urgency: 'medium',
        contact: ''
      });
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Report Submitted Successfully
            </h1>
            <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
              Thank you for your report. Our team will review it and take appropriate action.
            </p>
            <div className="space-y-2 mb-6">
              <p style={{ color: colors.textSecondary }}>
                <strong>Report ID:</strong> #RPT-{Date.now().toString().slice(-6)}
              </p>
              <p style={{ color: colors.textSecondary }}>
                <strong>Status:</strong> Under Review
              </p>
            </div>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Submit Another Report
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Report Suspicious Content
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Help us identify and address harmful content on social media platforms
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Content Type *
              </label>
              <select
                value={reportData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option value="">Select content type</option>
                <option value="misinformation">Misinformation</option>
                <option value="hate_speech">Hate Speech</option>
                <option value="harassment">Harassment</option>
                <option value="spam">Spam</option>
                <option value="fake_news">Fake News</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Platform *
              </label>
              <select
                value={reportData.platform}
                onChange={(e) => handleInputChange('platform', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option value="">Select platform</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Content URL or Link
              </label>
              <input
                type="url"
                value={reportData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com/post"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Description *
              </label>
              <textarea
                value={reportData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={4}
                placeholder="Please provide details about the suspicious content..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Urgency Level
              </label>
              <div className="flex space-x-4">
                {['low', 'medium', 'high', 'critical'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      value={level}
                      checked={reportData.urgency === level}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="mr-2"
                    />
                    <span className="capitalize" style={{ color: colors.text }}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Contact Information (Optional)
              </label>
              <input
                type="email"
                value={reportData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
              <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                Optional: Provide your email if you want updates on this report
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Flag className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.primary }}>
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>Immediate Review</h3>
                <p style={{ color: colors.textSecondary }}>
                  Your report is immediately logged and assigned to our analysis team
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.secondary }}>
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>AI Analysis</h3>
                <p style={{ color: colors.textSecondary }}>
                  Our AI systems analyze the reported content for verification
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.success }}>
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>Action Taken</h3>
                <p style={{ color: colors.textSecondary }}>
                  Appropriate measures are taken based on the analysis results
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};


// Contact Page Component
const ContactPage = () => {
  const { colors } = useTheme();

  const emergencyContacts = [
    {
      organization: "ANTIC",
      fullName: "Agence Nationale des Technologies de l'Information et de la Communication",
      description: "National ICT regulatory authority",
      contacts: [
        { type: "Emergency Hotline", value: "+237 222 123 456", icon: Phone },
        { type: "Email", value: "emergency@antic.cm", icon: Mail },
        { type: "Website", value: "https://www.antic.cm", icon: Globe2 }
      ],
      color: colors.primary
    },
    {
      organization: "CIRT",
      fullName: "Computer Incident Response Team",
      description: "Cybersecurity incident response and coordination",
      contacts: [
        { type: "24/7 Incident Line", value: "+237 222 987 654", icon: Phone },
        { type: "Incident Email", value: "incident@cirt.cm", icon: Mail },
        { type: "Secure Portal", value: "https://secure.cirt.cm", icon: Shield }
      ],
      color: colors.danger
    },
    {
      organization: "ART",
      fullName: "Agence de Régulation des Télécommunications",
      description: "Telecommunications regulatory authority",
      contacts: [
        { type: "Regulatory Hotline", value: "+237 222 555 789", icon: Phone },
        { type: "Complaints Email", value: "complaints@art.cm", icon: Mail },
        { type: "Online Portal", value: "https://www.art.cm", icon: Globe2 }
      ],
      color: colors.secondary
    },
    {
      organization: "MINIPOSTEL",
      fullName: "Ministère des Postes et Télécommunications",
      description: "Ministry of Posts and Telecommunications",
      contacts: [
        { type: "Ministry Hotline", value: "+237 222 333 111", icon: Phone },
        { type: "Official Email", value: "contact@minipostel.gov.cm", icon: Mail },
        { type: "Government Portal", value: "https://www.minipostel.gov.cm", icon: Building }
      ],
      color: colors.success
    }
  ];

  const devTeamContacts = [
    { type: "Technical Support", value: "+237 222 DEV TEAM", icon: Phone },
    { type: "Development Team", value: "dev@sui-ru.com", icon: Mail },
    { type: "Bug Reports", value: "bugs@sui-ru.com", icon: AlertTriangle },
    { type: "Feature Requests", value: "features@sui-ru.com", icon: Zap },
    { type: "GitHub Repository", value: "https://github.com/sui-ru/mhsms", icon: Github }
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Emergency Contacts
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Important contact information for cybersecurity incidents and technical support
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <Card className="p-6 mb-8 border-l-4" style={{ borderLeftColor: colors.danger }}>
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 mt-1" style={{ color: colors.danger }} />
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                Emergency Situations
              </h2>
              <p className="text-lg" style={{ color: colors.textSecondary }}>
                For immediate cybersecurity threats, misinformation campaigns, or critical system incidents, 
                contact the appropriate emergency hotline below. For life-threatening emergencies, call local emergency services first.
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Organizations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((org, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${org.color}20` }}
                >
                  <Building className="w-6 h-6" style={{ color: org.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                    {org.organization}
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: org.color }}>
                    {org.fullName}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {org.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {org.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <contact.icon className="w-5 h-5 mr-3" style={{ color: org.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: colors.text }}>
                        {contact.type}
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {contact.value}
                      </p>
                    </div>
                    {contact.type.includes('Website') || contact.type.includes('Portal') ? (
                      <ExternalLink className="w-4 h-4" style={{ color: colors.textMuted }} />
                    ) : (
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Development Team Section */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: colors.gradientPrimary }}
            >
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Development Team Support
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Technical support and development team contacts for system issues and improvements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devTeamContacts.map((contact, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border 
                }}
              >
                <div className="flex items-center mb-2">
                  <contact.icon className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    {contact.type}
                  </h3>
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {contact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
              Support Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Emergency Support</h4>
                <p style={{ color: colors.textSecondary }}>24/7 for critical security incidents</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: colors.text }}>General Support</h4>
                <p style={{ color: colors.textSecondary }}>Monday - Friday, 8:00 AM - 6:00 PM WAT</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" icon={Flag}>
              Report Incident
            </Button>
            <Button variant="secondary" icon={MessageSquare}>
              Contact Support
            </Button>
            <Button variant="ghost" icon={Download}>
              Download Contact List
            </Button>
            <Button variant="ghost" icon={FileText}>
              Emergency Procedures
            </Button>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 mt-8 text-center" style={{ backgroundColor: `${colors.warning}10` }}>
          <AlertCircle className="w-8 h-8 mx-auto mb-4" style={{ color: colors.warning }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
            Important Notice
          </h3>
          <p style={{ color: colors.textSecondary }}>
            This contact information is for official cybersecurity and technical matters only. 
            For general inquiries, please use the appropriate channels. 
            Misuse of emergency contacts may result in legal action.
          </p>
        </Card>
      </div>
    </div>
  );
};

// ==================== PLATFORM ANALYSIS PAGE ====================

const PlatformAnalysisPage = () => {
  const { colors } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const platformData = [
    { name: 'Facebook', threats: 45, posts: 125000, accuracy: 96.2, color: '#1877F2' },
    { name: 'Twitter', threats: 32, posts: 89000, accuracy: 94.8, color: '#1DA1F2' },
    { name: 'Instagram', threats: 28, posts: 67000, accuracy: 95.1, color: '#E4405F' },
    { name: 'WhatsApp', threats: 19, posts: 45000, accuracy: 97.3, color: '#25D366' },
    { name: 'TikTok', threats: 23, posts: 78000, accuracy: 93.7, color: '#000000' },
    { name: 'YouTube', threats: 15, posts: 34000, accuracy: 96.8, color: '#FF0000' }
  ];

  const threatTrendData = [
    { date: '2024-06-04', Facebook: 42, Twitter: 35, Instagram: 25, WhatsApp: 18, TikTok: 28, YouTube: 12 },
    { date: '2024-06-05', Facebook: 38, Twitter: 29, Instagram: 31, WhatsApp: 22, TikTok: 25, YouTube: 15 },
    { date: '2024-06-06', Facebook: 51, Twitter: 41, Instagram: 28, WhatsApp: 19, TikTok: 32, YouTube: 18 },
    { date: '2024-06-07', Facebook: 47, Twitter: 33, Instagram: 26, WhatsApp: 21, TikTok: 29, YouTube: 14 },
    { date: '2024-06-08', Facebook: 43, Twitter: 37, Instagram: 29, WhatsApp: 17, TikTok: 26, YouTube: 16 },
    { date: '2024-06-09', Facebook: 49, Twitter: 31, Instagram: 32, WhatsApp: 20, TikTok: 24, YouTube: 13 },
    { date: '2024-06-10', Facebook: 45, Twitter: 32, Instagram: 28, WhatsApp: 19, TikTok: 23, YouTube: 15 }
  ];

  const contentTypeData = [
    { name: 'Misinformation', value: 45, color: '#ef4444' },
    { name: 'Hate Speech', value: 32, color: '#f97316' },
    { name: 'Spam', value: 15, color: '#eab308' },
    { name: 'Harassment', value: 8, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Platform Analysis</h2>
          <p style={{ color: colors.textSecondary }}>Comprehensive analysis across social media platforms</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformData.map((platform) => (
          <Card key={platform.name} className="p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: platform.color + '20' }}
                >
                  <Monitor className="w-5 h-5" style={{ color: platform.color }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.text }}>{platform.name}</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {platform.posts.toLocaleString()} posts monitored
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Active Threats</span>
                <span className="font-semibold text-lg" style={{ color: colors.danger }}>
                  {platform.threats}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Detection Accuracy</span>
                <span className="font-semibold" style={{ color: colors.success }}>
                  {platform.accuracy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${platform.accuracy}%`,
                    backgroundColor: colors.success 
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Threat Trends Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Threat Detection Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="date" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.bgCard, 
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} />
              <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" strokeWidth={2} />
              <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} />
              <Line type="monotone" dataKey="WhatsApp" stroke="#25D366" strokeWidth={2} />
              <Line type="monotone" dataKey="TikTok" stroke="#000000" strokeWidth={2} />
              <Line type="monotone" dataKey="YouTube" stroke="#FF0000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Content Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Content Type Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Platform Performance Metrics
          </h3>
          <div className="space-y-4">
            {platformData.slice(0, 4).map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-3 rounded-lg" 
                   style={{ backgroundColor: colors.bgSecondary }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span style={{ color: colors.text }}>{platform.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    {platform.threats} threats
                  </span>
                  <span className="font-semibold" style={{ color: colors.success }}>
                    {platform.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Real-time Monitoring Status */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Real-time Monitoring Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2" />
              <span style={{ color: colors.text }}>All Systems Operational</span>
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              6 platforms actively monitored
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              {platformData.reduce((sum, p) => sum + p.posts, 0).toLocaleString()}
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Total posts analyzed today
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.danger }}>
              {platformData.reduce((sum, p) => sum + p.threats, 0)}
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Active threats detected
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ==================== REPORTS PAGE ====================

const ReportsPage = () => {
  const { colors } = useTheme();
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('7d');
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTypes = [
    { id: 'summary', name: 'Executive Summary', description: 'High-level overview of threats and system performance' },
    { id: 'detailed', name: 'Detailed Analysis', description: 'Comprehensive breakdown of all detected threats' },
    { id: 'platform', name: 'Platform-specific', description: 'Individual reports for each monitored platform' },
    { id: 'geographic', name: 'Geographic Analysis', description: 'Regional threat distribution and patterns' },
    { id: 'trend', name: 'Trend Analysis', description: 'Historical trends and predictive insights' }
  ];

  const recentReports = [
    { id: 1, name: 'Weekly Threat Summary', type: 'Executive Summary', date: '2024-06-10', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Facebook Deep Dive', type: 'Platform Analysis', date: '2024-06-09', status: 'completed', size: '5.7 MB' },
    { id: 3, name: 'Regional Threat Map', type: 'Geographic Analysis', date: '2024-06-08', status: 'completed', size: '3.1 MB' },
    { id: 4, name: 'Monthly Trend Report', type: 'Trend Analysis', date: '2024-06-07', status: 'processing', size: '- MB' },
    { id: 5, name: 'Instagram Content Analysis', type: 'Platform Analysis', date: '2024-06-06', status: 'completed', size: '4.2 MB' }
  ];

  const reportMetrics = [
    { label: 'Total Reports Generated', value: '1,247', change: '+12%', color: colors.primary },
    { label: 'Average Processing Time', value: '3.2 min', change: '-8%', color: colors.success },
    { label: 'Reports Downloaded', value: '892', change: '+24%', color: colors.secondary },
    { label: 'Automated Reports', value: '156', change: '+45%', color: colors.warning }
  ];

  const generateReport = () => {
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} report for ${dateRange} in ${reportFormat.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Reports & Analytics</h2>
          <p style={{ color: colors.textSecondary }}>Generate and manage comprehensive threat analysis reports</p>
        </div>
        <Button variant="primary" icon={Download} onClick={generateReport}>
          Generate New Report
        </Button>
      </div>

      {/* Report Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: metric.color }}>{metric.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>{metric.value}</p>
                <p className="text-xs mt-1" style={{ color: metric.color }}>{metric.change} from last period</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <FileText className="w-6 h-6" style={{ color: metric.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Generate Custom Report</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Report Type</label>
            <select 
              value={selectedReport} 
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
              {reportTypes.find(r => r.id === selectedReport)?.description}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Date Range</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Format</label>
            <select 
              value={reportFormat} 
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="json">JSON Data</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Recent Reports</h3>
          <Button variant="ghost" icon={Calendar}>View All Reports</Button>
        </div>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border"
                 style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>{report.name}</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {report.type} • {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status === 'completed' ? 'Completed' : 'Processing'}
                </span>
                {report.status === 'completed' && (
                  <Button variant="ghost" size="sm" icon={Download}>Download</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Templates */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((template) => (
            <div key={template.id} className="p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                 style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
                 onClick={() => setSelectedReport(template.id)}>
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                </div>
                <h4 className="font-semibold" style={{ color: colors.text }}>{template.name}</h4>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>{template.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs" style={{ color: colors.textMuted }}>Template</span>
                <Button variant="ghost" size="sm">Use Template</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Scheduled Reports</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg"
               style={{ backgroundColor: colors.bgSecondary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.success + '20' }}
              >
                <Clock className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>Weekly Executive Summary</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Every Monday at 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg"
               style={{ backgroundColor: colors.bgSecondary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.warning + '20' }}
              >
                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>Monthly Trend Analysis</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>First day of each month at 8:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Paused</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ==================== ALERT MANAGEMENT PAGE ====================

const AlertManagementPage = () => {
  const { colors } = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const alerts = [
    {
      id: 1,
      title: 'High-Risk Misinformation Campaign Detected',
      description: 'Coordinated spread of false information about health policies across multiple platforms',
      severity: 'critical',
      status: 'active',
      platform: 'Facebook',
      timestamp: '2024-06-10 14:32:15',
      affectedUsers: 15420,
      confidence: 96.8,
      tags: ['misinformation', 'health', 'coordinated']
    },
    {
      id: 2,
      title: 'Hate Speech Targeting Minority Groups',
      description: 'Increased hate speech activity targeting specific ethnic communities',
      severity: 'high',
      status: 'investigating',
      platform: 'Twitter',
      timestamp: '2024-06-10 13:45:22',
      affectedUsers: 8750,
      confidence: 94.2,
      tags: ['hate-speech', 'ethnic', 'harassment']
    },
    {
      id: 3,
      title: 'Spam Bot Network Activity',
      description: 'Large-scale automated posting detected across multiple accounts',
      severity: 'medium',
      status: 'resolved',
      platform: 'Instagram',
      timestamp: '2024-06-10 12:18:45',
      affectedUsers: 3200,
      confidence: 89.5,
      tags: ['spam', 'bot-network', 'automation']
    },
    {
      id: 4,
      title: 'Suspicious Content Sharing Pattern',
      description: 'Unusual sharing patterns detected for potentially harmful content',
      severity: 'low',
      status: 'monitoring',
      platform: 'WhatsApp',
      timestamp: '2024-06-10 11:22:10',
      affectedUsers: 1850,
      confidence: 78.3,
      tags: ['suspicious', 'sharing-pattern', 'monitoring']
    },
    {
      id: 5,
      title: 'Deepfake Video Distribution',
      description: 'AI-generated fake video content spreading across social platforms',
      severity: 'critical',
      status: 'active',
      platform: 'TikTok',
      timestamp: '2024-06-10 10:55:33',
      affectedUsers: 22100,
      confidence: 98.1,
      tags: ['deepfake', 'video', 'ai-generated']
    }
  ];

  const alertStats = [
    { label: 'Active Alerts', value: '23', change: '+3', color: colors.danger },
    { label: 'Resolved Today', value: '47', change: '+12', color: colors.success },
    { label: 'Under Investigation', value: '8', change: '-2', color: colors.warning },
    { label: 'Average Response Time', value: '12 min', change: '-3 min', color: colors.primary }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return colors.danger;
      case 'high': return '#f97316';
      case 'medium': return colors.warning;
      case 'low': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return colors.danger;
      case 'investigating': return colors.warning;
      case 'monitoring': return colors.primary;
      case 'resolved': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    return severityMatch && statusMatch;
  });

  const handleAlertAction = (alertId, action) => {
    alert(`Performing ${action} on alert ${alertId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Alert Management</h2>
          <p style={{ color: colors.textSecondary }}>Monitor and manage security alerts and threat notifications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" icon={Bell}>Configure Alerts</Button>
          <Button variant="secondary" icon={Download}>Export Alerts</Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: stat.color }}>{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change} from yesterday</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Bell className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Severity</label>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="timestamp">Latest First</option>
                <option value="severity">Severity</option>
                <option value="confidence">Confidence</option>
                <option value="affected">Affected Users</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" icon={Filter}>Advanced Filters</Button>
            <Button variant="ghost" icon={RotateCcw}>Refresh</Button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="p-6 hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => setSelectedAlert(alert)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  />
                  <h3 className="font-semibold text-lg" style={{ color: colors.text }}>{alert.title}</h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getSeverityColor(alert.severity)}20`,
                      color: getSeverityColor(alert.severity)
                    }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(alert.status)}20`,
                      color: getStatusColor(alert.status)
                    }}
                  >
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="mb-3" style={{ color: colors.textSecondary }}>{alert.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.textMuted }}>
                  <span>📱 {alert.platform}</span>
                  <span>👥 {alert.affectedUsers.toLocaleString()} users</span>
                  <span>🎯 {alert.confidence}% confidence</span>
                  <span>⏰ {alert.timestamp}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {alert.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: colors.bgSecondary, color: colors.textSecondary }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <Button variant="primary" size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'investigate'); }}>
                  Investigate
                </Button>
                <Button variant="secondary" size="sm"
                        onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'escalate'); }}>
                  Escalate
                </Button>
                {alert.status !== 'resolved' && (
                  <Button variant="ghost" size="sm"
                          onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'resolve'); }}>
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{selectedAlert.title}</h2>
                  <p className="mt-2" style={{ color: colors.textSecondary }}>{selectedAlert.description}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedAlert(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Alert Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Severity:</span>
                      <span style={{ color: getSeverityColor(selectedAlert.severity) }}>
                        {selectedAlert.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Status:</span>
                      <span style={{ color: getStatusColor(selectedAlert.status) }}>
                        {selectedAlert.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Platform:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Confidence:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Affected Users:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.affectedUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Timestamp:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Actions</h3>
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full" icon={Search}>
                      Start Investigation
                    </Button>
                    <Button variant="secondary" className="w-full" icon={AlertTriangle}>
                      Escalate to Authorities
                    </Button>
                    <Button variant="ghost" className="w-full" icon={Flag}>
                      Flag for Review
                    </Button>
                    <Button variant="ghost" className="w-full" icon={CheckCircle}>
                      Mark as Resolved
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" icon={Bell} className="h-16">
            Create Custom Alert
          </Button>
          <Button variant="secondary" icon={Settings} className="h-16">
            Configure Thresholds
          </Button>
          <Button variant="ghost" icon={Download} className="h-16">
            Export Alert Data
          </Button>
        </div>
      </Card>
    </div>
  );
};

// ==================== SETTINGS PAGE ====================

const SettingsPage = () => {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [dataRetention, setDataRetention] = useState("90_days");

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Settings</h2>
          <p style={{ color: colors.textSecondary }}>Manage your account and application preferences</p>
        </div>
        <Button variant="primary" icon={Save} onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Theme</label>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Language</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: colors.text }}>Enable Notifications</label>
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="toggle toggle-primary"
            />
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Data & Privacy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Data Retention Period</label>
            <select 
              value={dataRetention} 
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="30_days">30 Days</option>
              <option value="90_days">90 Days</option>
              <option value="1_year">1 Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <Button variant="secondary" icon={Download}>Export My Data</Button>
          <Button variant="danger" icon={Trash2}>Delete My Account</Button>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Security</h3>
        <div className="space-y-4">
          <Button variant="secondary" icon={Key}>Change Password</Button>
          <Button variant="secondary" icon={Shield}>Two-Factor Authentication</Button>
          <Button variant="secondary" icon={Activity}>View Login Activity</Button>
        </div>
      </Card>
    </div>
  );
};


// ==================== CHATBOT OVERLAY COMPONENT ====================

const ChatbotOverlay = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getQuickBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getQuickBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help you navigate our monitoring system. What would you like to know?';
    } else if (lowerMessage.includes('help')) {
      return 'I can help you with reporting content, understanding our AI detection, or navigating the system. What do you need assistance with?';
    } else if (lowerMessage.includes('report')) {
      return 'To report suspicious content, click on the "Report" link in the navigation or tell me more about what you\'d like to report.';
    } else if (lowerMessage.includes('detection') || lowerMessage.includes('ai')) {
      return 'Our AI system monitors social media for misinformation and hate speech with 95%+ accuracy. Would you like to know more about how it works?';
    } else {
      return 'Thanks for your message! I\'m here to help with any questions about our monitoring system. Feel free to ask me anything!';
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{ 
            background: colors.gradientPrimary,
            boxShadow: `0 8px 32px ${colors.primary}40`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated AI Icon */}
            <div className="relative">
              <Brain 
                className={`w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                }`} 
              />
            </div>
            
            {/* Pulse Animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: colors.primary }}
            />
            
            {/* Notification Dot */}
            {!isOpen && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: colors.success }}
              >
                <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: colors.success }} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 w-auto sm:w-80 h-96 transition-all duration-300 transform">
          <div 
            className="w-full h-full rounded-xl shadow-2xl border backdrop-blur-md overflow-hidden"
            style={{ 
              backgroundColor: colors.bgCard,
              borderColor: colors.border,
              boxShadow: `0 20px 60px ${colors.primary}20`
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b"
              style={{ 
                background: colors.gradientPrimary,
                borderColor: colors.border 
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-white text-opacity-80">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-64 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'rounded-br-none' 
                        : 'rounded-bl-none'
                    }`}
                    style={{
                      backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                      color: message.type === 'user' ? '#ffffff' : colors.text
                    }}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="max-w-xs px-3 py-2 rounded-lg rounded-bl-none"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: colors.border }}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                  style={{ 
                    background: colors.gradientPrimary,
                    color: '#ffffff'
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

