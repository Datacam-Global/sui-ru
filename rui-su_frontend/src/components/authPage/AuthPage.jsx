import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Mail, Lock, UserPlus, LogIn, ArrowLeft } from 'lucide-react';

const AuthPage = ({ mode, onSubmit, onModeSwitch, onBack }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: colors.bgSecondary }}
    >
      <Card className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} style={{ color: colors.text }} />
          </Button>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
            {mode === 'login' ? 'Welcome Back!' : 'Join Sui-ru'}
          </h2>
          <div></div> {/* Spacer to balance header */}
        </div>
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
                color: colors.text,
                '::placeholder': { color: colors.textMuted }
              }}
            />
          </div>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
                color: colors.text,
                '::placeholder': { color: colors.textMuted }
              }}
            />
          </div>
          {mode === 'signup' && (
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.borderColor,
                  color: colors.text,
                  '::placeholder': { color: colors.textMuted }
                }}
              />
            </div>
          )}
          <Button type="submit" variant="primary" className="w-full">
            {mode === 'login' ? (
              <><LogIn size={20} className="mr-2" /> Sign In</>
            ) : (
              <><UserPlus size={20} className="mr-2" /> Sign Up</>
            )}
          </Button>
        </form>

        <p className="text-sm" style={{ color: colors.textSecondary }}>
          {mode === 'login' ? (
            <>Don't have an account? <a href="#" onClick={() => onModeSwitch('signup')} className="font-medium" style={{ color: colors.primary }}>Sign Up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={() => onModeSwitch('login')} className="font-medium" style={{ color: colors.primary }}>Sign In</a></>
          )}
        </p>
      </Card>
    </div>
  );
};

export default AuthPage;

