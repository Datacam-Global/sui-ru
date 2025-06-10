import { Box, Typography, Container, Grid, Avatar, Paper } from '@mui/material';
import PublicLayout from '../layouts/PublicLayout';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';

const team = [
  { name: 'Soh', role: 'Project Lead', avatar: '' },
  { name: 'Muyah', role: 'Tech Lead', avatar: '' },
  { name: 'Hilary', role: 'Community Manager', avatar: '' },
  { name: 'Atanga Nji', role: 'Policy Advisor', avatar: '' },
];

const About = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <InfoIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>About Sui-Ru</Typography>
          <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>Our Mission</Typography>
          <Typography sx={{ mb: 4 }}>
            Sui-Ru is dedicated to protecting Cameroon's digital space by combating misinformation, hate speech, and promoting digital literacy for all.
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>Our Vision</Typography>
          <Typography sx={{ mb: 6 }}>
            To create a safe, informed, and inclusive digital environment for every Cameroonian.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <GroupIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>Our Team</Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}>{member.name[0]}</Avatar>
                <Typography variant="subtitle1" fontWeight={700}>{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </PublicLayout>
);

export default About; 