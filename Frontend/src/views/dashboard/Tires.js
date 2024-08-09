import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const Tires = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Tire Pressure for Left Front"
        name="tirePressureLeftFront"
        value={formData.tirePressureLeftFront}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Pressure for Right Front"
        name="tirePressureRightFront"
        value={formData.tirePressureRightFront}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Condition for Left Front"
        name="tireConditionLeftFront"
        value={formData.tireConditionLeftFront}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Condition for Right Front"
        name="tireConditionRightFront"
        value={formData.tireConditionRightFront}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Pressure for Left Rear"
        name="tirePressureLeftRear"
        value={formData.tirePressureLeftRear}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Pressure for Right Rear"
        name="tirePressureRightRear"
        value={formData.tirePressureRightRear}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Condition for Left Rear"
        name="tireConditionLeftRear"
        value={formData.tireConditionLeftRear}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tire Condition for Right Rear"
        name="tireConditionRightRear"
        value={formData.tireConditionRightRear}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Needs Replacement"
      />
    </Grid>
    <Grid item xs={12}>
      <Box>
        
      </Box>
    </Grid>
  </Grid>
);

export default Tires;
