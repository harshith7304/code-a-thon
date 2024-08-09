import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const LoginErrorToast = ({ error }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    // Update the document title using the browser API
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          // color="error"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default LoginErrorToast;
