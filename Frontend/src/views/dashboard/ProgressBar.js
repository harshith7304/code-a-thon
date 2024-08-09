import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const ProgressBar = ({ steps, currentStep }) => (
  <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
    {steps.map((step, index) => (
      <Box key={index} display="flex" flexDirection="column" alignItems="center" sx={{ mr: 3 }}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 40, // Circle size
              height: 40, // Circle size
              borderRadius: '50%',
              backgroundColor: currentStep >= index ? '#4C9AFF' : '#B0BEC5', // Lighter blue for active, gray for inactive
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              position: 'relative',
            }}
          >
            {currentStep > index ? <CheckIcon /> : null} {/* Display tick mark */}
          </Box>
          {index < steps.length - 1 && (
            <Box
              sx={{
                height: 2,
                width: 50, // Length of the connecting line
                backgroundColor: currentStep > index ? '#4C9AFF' : '#B0BEC5', // Lighter blue for completed steps, gray otherwise
                ml: 1, // Adjust spacing between circle and line
              }}
            />
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: currentStep === index ? '#4C9AFF' : 'black' }}>
          {step}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default ProgressBar;
