import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Button,
  Modal,
  IconButton,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ClientMedia = () => {
  const { clientId } = useParams();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [campaignName, setCampaignName] = useState('');

  useEffect(() => {
    const fetchClientMedia = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/media/view-media/${clientId}`);
        setMedia(response.data);
        if (response.data.length > 0) {
          setCampaignName(response.data[0].campaign_name);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientMedia();
  }, [clientId]);

  const handleOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleToggle = async (campaignId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await axios.put(`http://localhost:3000/api/media/update-status/${campaignId}`, { activity_status: newStatus });
      setMedia((prevMedia) =>
        prevMedia.map((item) =>
          item.campaign_id === campaignId ? { ...item, activity_status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error updating activity status:', error);
    }
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
        <Typography color="error">Error loading client media: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Details of {campaignName} Campaign
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Campaign ID</TableCell>
            <TableCell>Media Type</TableCell>
            <TableCell>Campaign Name</TableCell>
            <TableCell>Activity Status</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Media</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {media.map((item) => (
            <TableRow key={item.campaign_id}>
              <TableCell>{item.campaign_id}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.campaign_name}</TableCell>
              <TableCell>
                <Switch
                  checked={item.activity_status === 1}
                  onChange={() => handleToggle(item.campaign_id, item.activity_status)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{item.views}</TableCell>
              <TableCell>{item.clicks}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleOpen(item.media)}>
                  View Media
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" position="relative">
          <IconButton 
            onClick={handleClose}
            sx={{ position: 'absolute', top: '20px', right: '20px', color: 'rgba(0, 0, 0, 0.9)' }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && <img src={selectedImage} alt="Media" style={{ maxHeight: '90%', maxWidth: '90%' }} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default (ClientMedia);
