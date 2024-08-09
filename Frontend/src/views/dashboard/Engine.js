import React from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const Engine = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Rust, Dents or Damage in Engine"
        name="engineDamage"
        value={formData.engineDamage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Yes/No"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Engine Oil Condition"
        name="engineOilCondition"
        value={formData.engineOilCondition}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good/Bad"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Engine Oil Color"
        name="engineOilColor"
        value={formData.engineOilColor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Clean/Brown/Black"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Brake Fluid Condition"
        name="brakeFluidCondition"
        value={formData.brakeFluidCondition}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Good/Bad"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Brake Fluid Color"
        name="brakeFluidColor"
        value={formData.brakeFluidColor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        placeholder="Clean/Brown/Black"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Any Oil Leak in Engine"
        name="engineOilLeak"
        value={formData.engineOilLeak}
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

export default Engine;
