import React from 'react';
import { Grid, Box } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';

import AuthRegister from '../authForms/AuthRegister';

const Register = () => (
  <PageContainer title="Register" description="this is Register page">
    <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={12} lg={5} xl={4}>
        <Box p={4} textAlign="center">
          <AuthRegister
            title="Your Admin Dashboard"
            subtext="You can add Client's here."
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Register;
