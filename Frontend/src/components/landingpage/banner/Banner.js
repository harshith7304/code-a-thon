import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import BannerContent from './BannerContent';
import Adminlogin from './admin-login';

const Banner = () => {
  return (
    <Box mb={10} sx={{ overflow: 'hidden', height: '80vh', display: 'flex', alignItems: 'center'}}>
      <Container maxWidth="sm">
        <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Adminlogin />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
