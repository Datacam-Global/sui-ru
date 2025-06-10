import { Box, Typography, Grid, Paper, Avatar, Stack, Divider, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import BarChartIcon from '@mui/icons-material/BarChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Active Users', value: 1240, icon: <PeopleIcon />, color: 'primary.main', trend: 12 },
  { label: 'Reports', value: 320, icon: <WarningIcon />, color: 'error.main', trend: -5 },
  { label: 'Platform Reach', value: '50+', icon: <BarChartIcon />, color: 'info.main' },
  { label: 'Avg. Response', value: '< 5min', icon: <TrendingUpIcon />, color: 'success.main', trend: -15 },
];

const chartData = [
  { name: 'Mon', users: 400, reports: 24 },
  { name: 'Tue', users: 300, reports: 13 },
  { name: 'Wed', users: 200, reports: 98 },
  { name: 'Thu', users: 278, reports: 39 },
  { name: 'Fri', users: 189, reports: 48 },
  { name: 'Sat', users: 239, reports: 38 },
  { name: 'Sun', users: 349, reports: 43 },
];

const recentActivity = [
  { user: 'Soh', action: 'Reported misinformation', time: '2 min ago' },
  { user: 'Maffo', action: 'Resolved a case', time: '10 min ago' },
  { user: 'Nyuydine', action: 'Joined platform', time: '30 min ago' },
  { user: 'Nicho', action: 'Flagged suspicious content', time: '1 hr ago' },
];

const tableData = [
  { id: 1, name: 'Biya', status: 'Active', reports: 5 },
  { id: 2, name: 'Chantal', status: 'Inactive', reports: 2 },
  { id: 3, name: 'Burinyuy', status: 'Active', reports: 7 },
  { id: 4, name: 'Fatima', status: 'Active', reports: 3 },
];

const StatWidget = ({ label, value, icon, color, trend }) => (
  <Paper sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
    <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
    <Box>
      <Typography variant="h6" fontWeight={700}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      {trend !== undefined && (
        <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
          {trend > 0 ? <TrendingUpIcon color="success" fontSize="small" /> : <TrendingDownIcon color="error" fontSize="small" />}
          <Typography variant="caption" color={trend > 0 ? 'success.main' : 'error.main'}>
            {trend > 0 ? '+' : ''}{trend}%
          </Typography>
        </Stack>
      )}
    </Box>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Welcome to Sui-Ru Dashboard
      </Typography>
      {/* Stat Widgets */}
      <Grid container spacing={3} mb={2}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <StatWidget {...stat} />
          </Grid>
        ))}
      </Grid>
      {/* Chart and Recent Activity */}
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 320 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Weekly User & Report Trends</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="reports" stroke="#CE1126" strokeWidth={2} name="Reports" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 320, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Recent Activity</Typography>
            <Box sx={{ flexGrow: 1 }}>
              {recentActivity.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>{item.user}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.action}</Typography>
                  <Typography variant="caption" color="text.disabled">{item.time}</Typography>
                  {idx < recentActivity.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </Box>
            <Button variant="outlined" size="small" sx={{ mt: 2 }} fullWidth>View All</Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Table Section */}
      <Paper sx={{ p: 3, borderRadius: 3, mt: 2 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>User Overview</Typography>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, color: 'text.secondary', fontWeight: 700 }}>Name</Box>
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, color: 'text.secondary', fontWeight: 700 }}>Status</Box>
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, color: 'text.secondary', fontWeight: 700 }}>Reports</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {tableData.map((row) => (
              <Box component="tr" key={row.id} sx={{ borderBottom: '1px solid #eee' }}>
                <Box component="td" sx={{ py: 1, px: 2 }}>{row.name}</Box>
                <Box component="td" sx={{ py: 1, px: 2 }}>{row.status}</Box>
                <Box component="td" sx={{ py: 1, px: 2 }}>{row.reports}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 