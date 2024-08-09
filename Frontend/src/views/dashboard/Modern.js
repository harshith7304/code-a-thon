import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const steps = [
  'Vehicle Info',
  'Tires',
  'Battery',
  'Exterior',
  'Brakes',
  'Engine',
  'Voice of Customer',
];

const BCrumb = [
  {
    to: '/dashboard/service',
    title: 'View Service History',
  }
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    truckSerialNumber: '',
    truckModel: '',
    inspectionId: '',
    inspectorName: '',
    inspectionEmployeeId: '',
    dateTimeOfInspection: '',
    locationOfInspection: '',
    geoCoordinates: '',
    serviceMeterHours: '',
    inspectorSignature: '',
    customerName: '',
    catCustomerId: '',
    tirePressureLeftFront: '',
    tirePressureRightFront: '',
    tireConditionLeftFront: '',
    tireConditionRightFront: '',
    // Initialize other fields similarly...
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  const ProgressBar = () => (
    <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
      {steps.map((step, index) => (
        <Box key={index} display="flex" flexDirection="column" alignItems="center" sx={{ mr: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: currentStep >= index ? 'blue' : 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Typography variant="body2" sx={{ mt: 1, color: currentStep === index ? 'blue' : 'black' }}>
            {step}
          </Typography>
          {index < steps.length - 1 && (
            <Box
              sx={{
                height: 2,
                width: 40,
                backgroundColor: currentStep > index ? 'blue' : 'lightgray',
                mt: 2,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Truck Serial Number"
                name="truckSerialNumber"
                value={formData.truckSerialNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Truck Model"
                name="truckModel"
                value={formData.truckModel}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Vehicle Info */}
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Tire Pressure for Left Front"
                name="tirePressureLeftFront"
                value={formData.tirePressureLeftFront}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tire Pressure for Right Front"
                name="tirePressureRightFront"
                value={formData.tirePressureRightFront}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Tires */}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Battery Make"
                name="batteryMake"
                value={formData.batteryMake}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Battery Voltage"
                name="batteryVoltage"
                value={formData.batteryVoltage}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Battery */}
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Rust, Dent or Damage to Exterior"
                name="exteriorDamage"
                value={formData.exteriorDamage}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Exterior */}
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Brake Fluid Level"
                name="brakeFluidLevel"
                value={formData.brakeFluidLevel}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Brakes */}
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Rust, Dents or Damage in Engine"
                name="engineDamage"
                value={formData.engineDamage}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Engine */}
          </Grid>
        );
      case 6:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Any feedback from Customer"
                name="customerFeedback"
                value={formData.customerFeedback}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            {/* Add other fields for Voice of Customer */}
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Breadcrumb title="Service" items={BCrumb} />
      <Typography variant="h4" gutterBottom>
        Inspection Form
      </Typography>
      <ProgressBar />
      {renderStepContent()}
      <Box sx={{ mt: 2 }}>
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext} sx={{ ml: 2 }}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} sx={{ ml: 2 }}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;