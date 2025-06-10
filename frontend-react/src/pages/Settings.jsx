import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, FormControlLabel, Button } from '@mui/material';
import { useState } from 'react';

const initialRoles = [
  { id: 1, role: 'Admin', permissions: 'All Access' },
  { id: 2, role: 'Moderator', permissions: 'Review & Moderate' },
  { id: 3, role: 'Analyst', permissions: 'View Analytics' },
];

const Settings = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Platform Settings</Typography>
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <FormControlLabel
          control={<Switch checked={maintenance} onChange={e => setMaintenance(e.target.checked)} />}
          label="Enable Maintenance Mode"
        />
        <Button variant="outlined" size="small" sx={{ ml: 2 }} onClick={() => alert('Settings saved!')}>Save</Button>
      </Paper>
      <Typography variant="h6" fontWeight={600} mb={2}>User Roles & Permissions</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.role}</TableCell>
                <TableCell>{r.permissions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Settings; 