import { Box, Typography, Container, TextField, Button, Stack, Paper, Link } from '@mui/material';
import { useState } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PublicLayout>
      <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <ContactMailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight={700} gutterBottom>Contact Us</Typography>
            </Box>
            <Typography align="center" sx={{ mb: 3 }}>
              Have a question, feedback, or want to partner? Reach out to the Sui-Ru team below.
            </Typography>
            {sent ? (
              <Typography color="success.main" align="center">Thank you for your message! We'll get back to you soon.</Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
                  <TextField label="Email" name="email" value={form.email} onChange={handleChange} required fullWidth type="email" />
                  <TextField label="Message" name="message" value={form.message} onChange={handleChange} required fullWidth multiline rows={4} />
                  <Button type="submit" variant="contained" size="large">Send Message</Button>
                </Stack>
              </form>
            )}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2">Or email us at <Link href="mailto:info@sui-ru.org">info@sui-ru.org</Link></Typography>
              <Typography variant="body2">Follow us on <Link href="#">Twitter</Link> | <Link href="#">Facebook</Link></Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </PublicLayout>
  );
};

export default Contact; 