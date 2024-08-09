import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { baseAPIURL } from '../../../../constants';

const BCrumb = [
  {
    to: '/dashboard/viewclients',
    title: 'View Clients',
  },
  {
    to: '/dashboard/viewmedia',
    title: 'View Media Status',
  },
];

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [formData, setFormData] = useState({
    name: '',
    client_id: '',
    email: '',
    phone_no: '',
    password: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post( baseAPIURL+  `/clients/register`, formData);
      console.log(response);
      setMessage({ type: 'success', text: 'Client registered successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error registering client. Please try again.' });
    }
  };

  return (
    <Box sx={{ width: '100%', paddingTop: 0}}>
      <PageContainer title="Add Client" description="This is the client adding page" sx={{ width: '100%', pt: 0, marginTop: 0 }}>
        <Breadcrumb title="Add Client" items={BCrumb} />      
        {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleSubmit}>
        {message && (
          <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <Typography
            color={'primary'}
            fontWeight={600}
            fontSize={'16px'}
            letterSpacing={'0.5px'}
            pt={3}
          >
            Registration Details
          </Typography>
        </Box>
        <Box
          sx={{
            border: '1.5px solid #f2f5f7',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '16px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box mt={'0px'} marginBottom={'5px'}>
                <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Enter Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={'0px'} marginBottom={'5px'}>
                <CustomFormLabel htmlFor="client_id">Client Id</CustomFormLabel>
                <CustomTextField
                  id="client_id"
                  name="client_id"
                  variant="outlined"
                  placeholder="Enter client Id"
                  fullWidth
                  value={formData.client_id}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={'0px'} marginBottom={'5px'}>
                <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  variant="outlined"
                  placeholder="@gmail.com"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={'0px'} marginBottom={'5px'}>
                <CustomFormLabel htmlFor="phone_no">Phone Number</CustomFormLabel>
                <CustomTextField
                  id="phone_no"
                  name="phone_no"
                  variant="outlined"
                  fullWidth
                  placeholder="+91XXXXXXXXXX"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                  value={formData.phone_no}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={'0px'} marginBottom={'5px'}>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  variant="outlined"
                  placeholder="Enter password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Box mt={'15px'} pt={3} display="flex" justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ width: 150 }}
              type="submit"
              onClick={handleSubmit}
            >
              Add Client
            </Button>
          </Box>
        </Box>
      </Box>
      {subtitle}
    </PageContainer>
    </Box>
  );
};

export default AuthRegister;
