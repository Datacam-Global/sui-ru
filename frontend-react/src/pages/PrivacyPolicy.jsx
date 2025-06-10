import { Container, Typography, Box } from '@mui/material';
import PublicLayout from '../layouts/PublicLayout';
import PolicyIcon from '@mui/icons-material/Policy';

const PrivacyPolicy = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PolicyIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>Privacy Policy</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography paragraph>
            This Privacy Policy explains how Sui-Ru collects, uses, and protects your information. We are committed to safeguarding your privacy and ensuring transparency in our practices.
          </Typography>
          <Typography paragraph>
            We do not share your personal data with third parties except as required by law or with your explicit consent. For more details, please contact us.
          </Typography>
        </Box>
      </Container>
    </Box>
  </PublicLayout>
);

export default PrivacyPolicy; 