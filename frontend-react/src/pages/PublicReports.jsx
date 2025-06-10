import { Box, Typography, Container, Paper } from '@mui/material';
import CameroonMap from '../components/CameroonMap';
import PublicLayout from '../layouts/PublicLayout';
import PublicIcon from '@mui/icons-material/Public';

const PublicReports = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PublicIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>Public Reports & Statistics</Typography>
        </Box>
        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Misinformation Cases by Region</Typography>
          <CameroonMap setHoveredRegion={() => {}} />
        </Paper>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Key Statistics</Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="h4" color="primary" fontWeight={700}>1,240</Typography>
              <Typography color="text.secondary">Active Cases</Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary" fontWeight={700}>8,560</Typography>
              <Typography color="text.secondary">Resolved Cases</Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary" fontWeight={700}>50+</Typography>
              <Typography color="text.secondary">Platforms Monitored</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  </PublicLayout>
);

export default PublicReports; 