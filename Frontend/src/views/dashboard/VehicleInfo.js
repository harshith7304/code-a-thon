import React from 'react';
import { Grid, TextField } from '@mui/material';

const VehicleInfo = ({ formData, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Truck Serial Number"
        name="truckSerialNumber"
        value={formData.truckSerialNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Example: 7301234, 730EJ73245, 73592849, 735EJBC9723"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Truck Model"
        name="truckModel"
        value={formData.truckModel}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Example: 730, 730 EJ, 735, 745"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Inspection ID"
        name="inspectionId"
        value={formData.inspectionId}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Auto-incremented unique number"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Inspector Name"
        name="inspectorName"
        value={formData.inspectorName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Inspection Employee ID"
        name="inspectionEmployeeId"
        value={formData.inspectionEmployeeId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Date & Time of Inspection"
        name="dateTimeOfInspection"
        value={formData.dateTimeOfInspection}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="datetime-local"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Location of Inspection"
        name="locationOfInspection"
        value={formData.locationOfInspection}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Geo Coordinates of Inspection"
        name="geoCoordinates"
        value={formData.geoCoordinates}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Optional, in case of remote location"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Service Meter Hours"
        name="serviceMeterHours"
        value={formData.serviceMeterHours}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText="Odometer reading"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Inspector Signature"
        name="inspectorSignature"
        value={formData.inspectorSignature}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Customer Name / Company Name"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="CAT Customer ID"
        name="catCustomerId"
        value={formData.catCustomerId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </Grid>
  </Grid>
);

export default VehicleInfo;
