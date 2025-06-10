import { Box, Typography, Container, TextField, Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Feedback = () => {
  const [form, setForm] = useState({ feedback: '' });
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
              <FeedbackIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight={700} gutterBottom>Feedback</Typography>
            </Box>
            <Typography align="center" sx={{ mb: 3 }}>
              We value your feedback! Please let us know how we can improve Sui-Ru.
            </Typography>
            {sent ? (
              <Typography color="success.main" align="center">Thank you for your feedback!</Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField label="Your Feedback" name="feedback" value={form.feedback} onChange={handleChange} required fullWidth multiline rows={4} />
                  <Button type="submit" variant="contained" size="large">Submit</Button>
                </Stack>
              </form>
            )}
          </Paper>
        </Container>
      </Box>
    </PublicLayout>
  );
};

export default Feedback; 