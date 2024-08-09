import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const Brakes = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Brake Fluid Level"
        name="brakeFluidLevel"
        value={formData.brakeFluidLevel}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Low"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Brake Condition for Front"
        name="brakeConditionFront"
        value={formData.brakeConditionFront}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Brake Condition for Rear"
        name="brakeConditionRear"
        value={formData.brakeConditionRear}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Emergency Brake"
        name="emergencyBrake"
        value={formData.emergencyBrake}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Low"
      />
    </Grid>
    
    <Grid item xs={12}>
      <Box>
        
      </Box>
    </Grid>
  </Grid>
);

export default Brakes;
