import { Box, Typography, Container, Paper, Avatar, TextField, Button, Stack, Divider } from '@mui/material';
import { useState } from 'react';

const initialProfile = {
  name: 'Soh',
  email: 'soh@gov.cm',
  role: 'Admin',
};

const UserProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 72, height: 72, mb: 2 }}>{profile.name[0]}</Avatar>
          <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
          <Typography color="text.secondary">{profile.role}</Typography>
        </Box>
        <Stack spacing={2} mb={3}>
          <TextField label="Name" name="name" value={profile.name} onChange={handleChange} fullWidth />
          <TextField label="Email" name="email" value={profile.email} onChange={handleChange} fullWidth />
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Change Password</Typography>
        <Stack spacing={2}>
          <TextField label="New Password" type="password" value={password} onChange={handlePasswordChange} fullWidth />
          <Button variant="contained" color="primary">Update Password</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserProfile; 