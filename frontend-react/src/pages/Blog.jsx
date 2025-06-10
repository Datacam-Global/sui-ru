import { Box, Typography, Container, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import PublicLayout from '../layouts/PublicLayout';
import ArticleIcon from '@mui/icons-material/Article';

const articles = [
  { title: 'Fighting Misinformation in Cameroon', summary: 'How Sui-Ru is making a difference in digital safety.', date: '2024-06-01' },
  { title: 'Digital Literacy for All', summary: 'Empowering communities with the skills to spot fake news.', date: '2024-05-20' },
  { title: 'Government Partners with Sui-Ru', summary: 'A new era of public-private collaboration for online safety.', date: '2024-05-10' },
];

const Blog = () => (
  <PublicLayout>
    <Box sx={{ bgcolor: '#F4F6FB', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ArticleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>Blog & News</Typography>
        </Box>
        <Grid container spacing={4} mt={2}>
          {articles.map((a, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>{a.title}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>{a.date}</Typography>
                    <Typography>{a.summary}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </PublicLayout>
);

export default Blog; 