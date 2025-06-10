import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublicLayout from '../layouts/PublicLayout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const faqs = [
  { q: 'What is Sui-Ru?', a: 'Sui-Ru is a platform dedicated to combating misinformation and promoting digital safety in Cameroon.' },
  { q: 'How can I report misinformation?', a: 'You can report misinformation through the dashboard or contact our team directly.' },
  { q: 'Who manages Sui-Ru?', a: 'Sui-Ru is managed by a team of digital safety experts and government partners.' },
  { q: 'Is my data safe?', a: 'Yes, we take privacy and security seriously. See our Privacy Policy for details.' },
];

const FAQ = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HelpOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>Frequently Asked Questions</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          {faqs.map((item, idx) => (
            <Accordion key={idx} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  </PublicLayout>
);

export default FAQ; 