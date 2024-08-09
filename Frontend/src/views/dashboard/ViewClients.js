import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { baseAPIURL } from '../../../constants';

const BCrumb = [
  {
    to: '/dashboard/Addclients',
    title: 'Add clients',
  },
  {
    to: '/dashboard/viewmedia',
    title: 'View Media Status',
  },
];

const ViewClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    halfScreenStatus: 'Unpaid',
    fullScreenStatus: 'Unpaid',
    halfScreenStartDate: '',
    halfScreenEndDate: '',
    fullScreenStartDate: '',
    fullScreenEndDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(baseAPIURL + '/clients/view-clients');
        setClients(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return ''; // Return empty string for null dates
    }
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const [message, setMessage] = useState(null);

  const handleClickOpen = async (client) => {
    setSelectedClient(client);
    try {
      const response = await axios.get(`${baseAPIURL}/clients/view-client/${client.client_id}`);
      const { data } = response;
      const {
        half_screen_payment,
        full_screen_payment,
        half_screen_start_date,
        half_screen_end_date,
        full_screen_start_date,
        full_screen_end_date,
      } = data;
      setFormData({
        halfScreenStatus: half_screen_payment === 'Paid' ? 'Paid' : 'Unpaid',
        fullScreenStatus: full_screen_payment === 'Paid' ? 'Paid' : 'Unpaid',
        halfScreenStartDate: formatDate(half_screen_start_date),
        halfScreenEndDate: formatDate(half_screen_end_date),
        fullScreenStartDate: formatDate(full_screen_start_date),
        fullScreenEndDate: formatDate(full_screen_end_date),
      });
    } catch (err) {
      setError(err);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.halfScreenStatus === 'Paid' && !formData.halfScreenStartDate) {
        setMessage({ type: 'error', text: 'Please provide the half screen start date.' });
        return;
      }
      if (formData.fullScreenStatus === 'Paid' && !formData.fullScreenStartDate) {
        setMessage({ type: 'error', text: 'Please provide the full screen start date.' });
        return;
      }

      const updatedClientData = {
        half_screen_payment: formData.halfScreenStatus === 'Paid' ? 'Paid' : 'Unpaid',
        full_screen_payment: formData.fullScreenStatus === 'Paid' ? 'Paid' : 'Unpaid',
        half_screen_start_date: formData.halfScreenStartDate || null,
        half_screen_end_date: formData.halfScreenEndDate || null,
        full_screen_start_date: formData.fullScreenStartDate || null,
        full_screen_end_date: formData.fullScreenEndDate || null,
      };

      await axios.put(`${baseAPIURL}/clients/update-client/${selectedClient.client_id}`, updatedClientData);

      setMessage({ type: 'success', text: 'Client payment status updated successfully!' });

      handleClose();
    } catch (err) {
      setError(err);
      setMessage({ type: 'error', text: 'Error updating client payment status. Please try again.' });
    }
  };

  const handleViewMedia = (clientId) => {
    navigate(`/dashboard/client-media/${clientId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error loading clients: {error.message}</Typography>
      </Box>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ width: '100%' }}>
      <PageContainer title="Clients" description="This is the clients page" sx={{ width: '100%', pt: 0, marginTop: 0 }}>
        <Breadcrumb title="Clients" items={BCrumb} />
        {message && (
          <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}
        <Typography variant="h3" sx={{ mb: 2 }}>
          Client Details
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Media</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.client_id}>
                <TableCell>{client.client_id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone_no}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleClickOpen(client)}>
                    Update Payment Status
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleViewMedia(client.client_id)}>
                    View Media
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Payment Status for {selectedClient?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the payment status and start/end dates for both half screen and full screen ads.
          </DialogContentText>
          {message && (
            <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
          <Typography variant="h6" sx={{ mt: 2 }}>Half Screen</Typography>
          <Select
            fullWidth
            name="halfScreenStatus"
            value={formData.halfScreenStatus}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
          </Select>
          <TextField
            margin="dense"
            name="halfScreenStartDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            value={formData.halfScreenStartDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="halfScreenEndDate"
            label="End Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            value={formData.halfScreenEndDate}
            onChange={handleChange}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>Full Screen</Typography>
          <Select
            fullWidth
            name="fullScreenStatus"
            value={formData.fullScreenStatus}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
          </Select>
          <TextField
            margin="dense"
            name="fullScreenStartDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            value={formData.fullScreenStartDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fullScreenEndDate"
            label="End Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            value={formData.fullScreenEndDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default (ViewClients);
