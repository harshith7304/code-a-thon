import React from 'react';
import { Button, styled, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box mr={2}>
        <StyledButton color="inherit" variant="text" href="https://adminmart.com/support">
          Support
        </StyledButton>
      </Box>
      <Button color="primary" variant="contained" component={NavLink} to="/admin/login">
        Login
      </Button>
    </>
  );
};

export default Navigations;
