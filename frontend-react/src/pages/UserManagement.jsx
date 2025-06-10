import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, IconButton, Stack, Chip } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const initialUsers = [
  { id: 1, name: 'Soh', email: 'alice@gov.cm', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Muyah', email: 'bob@gov.cm', status: 'Inactive', role: 'Moderator' },
  { id: 3, name: 'Hilary', email: 'chidi@gov.cm', status: 'Active', role: 'Analyst' },
  { id: 4, name: 'Atanga Nji', email: 'fatima@gov.cm', status: 'Active', role: 'Moderator' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter ? user.role === roleFilter : true)
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>User Management</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Search users"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
        />
        <Select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Moderator">Moderator</MenuItem>
          <MenuItem value="Analyst">Analyst</MenuItem>
        </Select>
      </Stack>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.status} color={user.status === 'Active' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary"><EditIcon /></IconButton>
                  {user.status === 'Active' ? (
                    <IconButton color="error"><BlockIcon /></IconButton>
                  ) : (
                    <IconButton color="success"><CheckCircleIcon /></IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement; 