import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
      
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LazyComponent Component={Login} />} />
      </Route>
      
      {/* Dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard/*" element={<LazyComponent Component={Dashboard} />} />
        {/* Add more dashboard routes here */}
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<LazyComponent Component={NotFound} />} />
    </Routes>
  );
};

export default AppRoutes; 