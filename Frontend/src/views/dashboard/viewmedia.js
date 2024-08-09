import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Link, CircularProgress } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer'; 
import { baseAPIURL } from '../../../constants';


const BCrumb = [
  {
    to: '/dashboard/Addclients',
    title: 'Home',
  },
  {
    to: '/dashboard/viewclients',
    title: 'View Clients',
  },
  {
    title: 'View Media Status',
  },
];

const ViewMedia = () => {
  const [mediaLinks, setMediaLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaLinks = async () => {
      try {
        const response = await axios.get( baseAPIURL +  '/medias');
        setMediaLinks(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch media links.');
        setIsLoading(false);
      }
    };

    fetchMediaLinks();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <PageContainer title="Client Media" description="This is the client media page" sx={{ width: '100%', pt: 0, marginTop: 0 }}>
        <Breadcrumb title="Client Media" items={BCrumb} />
      
      <Box display="flex" flexDirection="column" gap={2}>
        {mediaLinks.map((link, index) => (
          <Link
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '1.2rem', color: 'blue', textDecoration: 'underline' }}
          >
            View Media
          </Link>
        ))}
      </Box>
    </PageContainer>
    </Box>
  );
};

export default (ViewMedia);
