import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const UserManagement = lazy(() => import('./pages/UserManagement.jsx'));
const CaseManagement = lazy(() => import('./pages/CaseManagement.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const UserProfile = lazy(() => import('./pages/UserProfile.jsx'));
const PublicReports = lazy(() => import('./pages/PublicReports.jsx'));
const Feedback = lazy(() => import('./pages/Feedback.jsx'));

// Layout components
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// Wrap lazy-loaded components with error boundary
const LazyComponent = ({ Component }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LazyComponent Component={Landing} />} />
      <Route path="/about" element={<LazyComponent Component={About} />} />
      <Route path="/contact" element={<LazyComponent Component={Contact} />} />
      <Route path="/faq" element={<LazyComponent Component={FAQ} />} />
      <Route path="/privacy" element={<LazyComponent Component={PrivacyPolicy} />} />
      <Route path="/terms" element={<LazyComponent Component={TermsOfService} />} />
      <Route path="/blog" element={<LazyComponent Component={Blog} />} />
      <Route path="/feedback" element={<LazyComponent Component={Feedback} />} />
      <Route path="/reports" element={<LazyComponent Component={PublicReports} />} />
      <Route path="/profile" element={<LazyComponent Component={UserProfile} />} />
      
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LazyComponent Component={Login} />} />
        <Route path="/signup" element={<LazyComponent Component={Signup} />} />
      </Route>
      
      {/* Dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<LazyComponent Component={Dashboard} />} />
        <Route path="/dashboard/users" element={<LazyComponent Component={UserManagement} />} />
        <Route path="/dashboard/cases" element={<LazyComponent Component={CaseManagement} />} />
        <Route path="/dashboard/analytics" element={<LazyComponent Component={Analytics} />} />
        <Route path="/dashboard/notifications" element={<LazyComponent Component={Notifications} />} />
        <Route path="/dashboard/settings" element={<LazyComponent Component={Settings} />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<LazyComponent Component={NotFound} />} />
    </Routes>
  );
};

export default AppRoutes; 