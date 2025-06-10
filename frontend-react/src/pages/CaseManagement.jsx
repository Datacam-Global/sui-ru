import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, IconButton, Stack, Chip, TextField } from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';

const initialCases = [
  { id: 1, reporter: 'Nfon', type: 'Misinformation', status: 'Open', date: '2024-06-01' },
  { id: 2, reporter: 'Wilson', type: 'Hate Speech', status: 'Closed', date: '2024-06-02' },
  { id: 3, reporter: 'Nicho', type: 'Fake News', status: 'In Review', date: '2024-06-03' },
  { id: 4, reporter: 'Soh', type: 'Misinformation', status: 'Open', date: '2024-06-04' },
];

const CaseManagement = () => {
  const [cases, setCases] = useState(initialCases);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredCases = cases.filter(c =>
    (statusFilter ? c.status === statusFilter : true) &&
    (typeFilter ? c.type === typeFilter : true) &&
    (c.reporter.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Case/Report Management</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Search cases"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
        />
        <Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Review">In Review</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
        <Select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Misinformation">Misinformation</MenuItem>
          <MenuItem value="Hate Speech">Hate Speech</MenuItem>
          <MenuItem value="Fake News">Fake News</MenuItem>
        </Select>
      </Stack>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reporter</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCases.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.reporter}</TableCell>
                <TableCell>{c.type}</TableCell>
                <TableCell>
                  <Chip label={c.status} color={c.status === 'Open' ? 'warning' : c.status === 'Closed' ? 'success' : 'info'} size="small" />
                </TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary"><VisibilityIcon /></IconButton>
                  {c.status !== 'Closed' && <IconButton color="success"><DoneIcon /></IconButton>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseManagement; 