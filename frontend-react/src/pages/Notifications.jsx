import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const notifications = [
  { id: 1, type: 'urgent', message: 'New misinformation case reported in North region', time: '2 min ago' },
  { id: 2, type: 'flag', message: 'Content flagged for hate speech', time: '10 min ago' },
  { id: 3, type: 'system', message: 'System update scheduled for tonight', time: '1 hr ago' },
];

const iconMap = {
  urgent: <WarningIcon color="error" />,
  flag: <ErrorIcon color="warning" />,
  system: <NotificationsActiveIcon color="info" />,
};

const Notifications = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>Notifications & Alerts</Typography>
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <List>
        {notifications.map(n => (
          <ListItem key={n.id} alignItems="flex-start">
            <ListItemIcon>{iconMap[n.type]}</ListItemIcon>
            <ListItemText
              primary={n.message}
              secondary={<Chip label={n.time} size="small" sx={{ mt: 0.5 }} />}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Box>
);

export default Notifications; 