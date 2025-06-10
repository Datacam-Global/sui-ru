import { Box, Typography, TextField, Button, Link, Paper, Stack, Checkbox, FormControlLabel, LinearProgress } from '@mui/material';
import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('You must agree to the terms and privacy policy.');
      return;
    }
    setError('');
    // Add signup logic here
    alert('Account created!');
  };

  return (
    <AuthLayout>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} align="center">
            Create your Sui-Ru Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={3}>
            Join Sui-Ru and help make Cameroon's digital space safer.
          </Typography>
          <form onSubmit={handleSignup}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                required
                autoFocus
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
                helperText={
                  password && (
                    passwordStrength < 2
                      ? 'Weak password'
                      : passwordStrength < 4
                      ? 'Medium strength'
                      : 'Strong password'
                  )
                }
              />
              {password && (
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength * 25}
                  sx={{ height: 8, borderRadius: 2, mb: 1, bgcolor: '#eee' }}
                  color={
                    passwordStrength < 2
                      ? 'error'
                      : passwordStrength < 4
                      ? 'warning'
                      : 'success'
                  }
                />
              )}
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                required
              />
              <FormControlLabel
                control={<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} />}
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="#" underline="hover" color="primary.main">
                      Terms & Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }} fullWidth>
                Sign Up
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link href="/login" underline="hover" color="primary.main">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Signup; 