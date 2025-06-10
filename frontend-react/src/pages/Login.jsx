import { Box, Typography, TextField, Button, Link, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Simulate successful login
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} align="center">
            Login to Sui-Ru
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={3}>
            Welcome back! Please enter your details.
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                autoFocus
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }} fullWidth>
                Login
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" underline="hover" color="primary.main">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Login; 