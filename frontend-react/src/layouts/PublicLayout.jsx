import { AppBar, Toolbar, Box, Button, Typography, Avatar, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/') }>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, mr: 1 }}>SR</Avatar>
            <Typography variant="h6" fontWeight={700} color="primary.main">Sui-Ru</Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={() => navigate('/about')} sx={{ mr: 1 }}>About</Button>
            <Button color="inherit" onClick={() => navigate('/contact')} sx={{ mr: 1 }}>Contact</Button>
            <Button color="inherit" onClick={() => navigate('/faq')} sx={{ mr: 1 }}>FAQ</Button>
            <Button color="inherit" onClick={() => navigate('/blog')} sx={{ mr: 1 }}>Blog</Button>
            <Button color="inherit" onClick={() => navigate('/feedback')} sx={{ mr: 2 }}>Feedback</Button>
            <Button color="primary" onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>Login</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
      <Box component="footer" sx={{ bgcolor: '#F4F6FB', py: 3, mt: 6, borderTop: '1px solid #eee', textAlign: 'center' }}>
        <Container>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Sui-Ru. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout; 