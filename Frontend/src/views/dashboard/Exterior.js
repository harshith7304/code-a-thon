import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const Exterior = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Rust, Dent or Damage to Exterior"
        name="exteriorDamage"
        value={formData.exteriorDamage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Yes/No"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Oil Leak in Suspension"
        name="oilLeakSuspension"
        value={formData.oilLeakSuspension}
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

export default Exterior;
