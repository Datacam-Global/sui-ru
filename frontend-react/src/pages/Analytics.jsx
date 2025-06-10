import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const regionData = [
  { name: 'Centre', value: 400 },
  { name: 'Littoral', value: 300 },
  { name: 'North', value: 200 },
  { name: 'South-West', value: 100 },
];
const COLORS = ['#2563EB', '#7C3AED', '#059669', '#CE1126'];

const platformData = [
  { platform: 'Facebook', cases: 240 },
  { platform: 'WhatsApp', cases: 456 },
  { platform: 'Twitter', cases: 139 },
  { platform: 'YouTube', cases: 98 },
];

const trendData = [
  { date: 'Jan', cases: 120 },
  { date: 'Feb', cases: 150 },
  { date: 'Mar', cases: 180 },
  { date: 'Apr', cases: 160 },
  { date: 'May', cases: 200 },
  { date: 'Jun', cases: 250 },
];

const Analytics = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Advanced Analytics</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Cases by Region</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={regionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Cases by Platform</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={platformData}>
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Cases Over Time</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cases" stroke="#7C3AED" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default Analytics; 