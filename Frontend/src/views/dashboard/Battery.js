import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const Battery = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Battery Make"
        name="batteryMake"
        value={formData.batteryMake}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Example: CAT, ABC, XYZ"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Battery Replacement Date"
        name="batteryReplacementDate"
        value={formData.batteryReplacementDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Battery Voltage"
        name="batteryVoltage"
        value={formData.batteryVoltage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Example: 12V / 13V"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Battery Water Level"
        name="batteryWaterLevel"
        value={formData.batteryWaterLevel}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good, Ok, Low"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Condition of Battery (Any damage)"
        name="batteryDamage"
        value={formData.batteryDamage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Yes/No"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Any Leak / Rust in Battery"
        name="batteryLeakRust"
        value={formData.batteryLeakRust}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Yes/No"
      />
    </Grid>
    
    <Grid item xs={12}>
      <Box>
        
      </Box>
    </Grid>
  </Grid>
);

export default Battery;
