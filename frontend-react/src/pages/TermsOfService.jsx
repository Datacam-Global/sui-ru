import { Container, Typography, Box } from '@mui/material';
import PublicLayout from '../layouts/PublicLayout';
import GavelIcon from '@mui/icons-material/Gavel';

const TermsOfService = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <GavelIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>Terms of Service</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography paragraph>
            By using Sui-Ru, you agree to our terms and conditions. Please read these terms carefully before using the platform.
          </Typography>
          <Typography paragraph>
            We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the latest terms.
          </Typography>
        </Box>
      </Container>
    </Box>
  </PublicLayout>
);

export default TermsOfService; 