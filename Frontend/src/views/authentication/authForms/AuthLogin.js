import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { getTokenAsync } from '../../../store/services/ServiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginErrorToast from '../widgets/LoginErrorToast';

const AuthLogin = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.serviceReducer?.isLoading);
  const showToast = useSelector((state) => state.serviceReducer?.showToast);
  const errorMessage = useSelector((state) => state.serviceReducer?.errorMessage);

  console.log('isLoading:', isLoading);
  console.log('showToast:', showToast);
  console.log('errorMessage:', errorMessage);

  const handleAuthentication = (e) => {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
    };
    dispatch(getTokenAsync(userData))
      .then(() => {
        navigate('/dashboard/Addclients', { replace: true });
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
      });
  };

  return (
    <>
      <Box width={isMobile ? '80vw' : '500px'} mt={isMobile ? '100px' : '0px'}>
        <Typography fontWeight="700" variant="h3" mb={1}>
          CRM Login
        </Typography>

        <form onSubmit={handleAuthentication}>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="email" letterSpacing="0.5px">
                Email or Username
              </CustomFormLabel>
              <CustomTextField
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password" letterSpacing="0.5px">
                Password
              </CustomFormLabel>
              <CustomTextField
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Stack>

          <Box mt="45px">
            <Button color="primary" variant="contained" size="large" fullWidth type="submit">
              <Typography fontWeight={'bold'} letterSpacing={'0.5px'}>
                {isLoading ? 'LOADING...' : 'SIGN IN'}
              </Typography>
            </Button>
          </Box>
        </form>
      </Box>
      {showToast && <LoginErrorToast error={errorMessage} />}
    </>
  );
};

export default AuthLogin;
