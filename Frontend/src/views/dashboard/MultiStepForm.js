import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import ProgressBar from './ProgressBar';
import VehicleInfo from './VehicleInfo';
import Tires from './Tires';
import Battery from './Battery';
import Exterior from './Exterior';
import Brakes from './Brakes';
import Engine from './Engine';
import axios from 'axios';
import useSpeechRecognition from './useSpeechRecognition'; // Import the custom hook

const steps = [
  'Vehicle Info',
  'Tires',
  'Battery',
  'Exterior',
  'Brakes',
  'Engine',
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
    tirePressureLeftFront: '',
    tirePressureRightFront: '',
    tireConditionLeftFront: '',
    tireConditionRightFront: '',
    tirePressureLeftRear: '',
    tirePressureRightRear: '',
    tireConditionLeftRear: '',
    tireConditionRightRear: '',
    batteryMake: '',
    batteryReplacementDate: '',
    batteryVoltage: '',
    batteryWaterLevel: '',
    batteryDamage: '',
    batteryLeakRust: '',
    engineDamage: '',
    engineOilCondition: '',
    engineOilColor: '',
    brakeFluidCondition: '',
    brakeFluidColor: '',
    engineOilLeak: '',
    exteriorDamage: '',
    oilLeakSuspension: '',
    brakeFluidLevel: '',
    brakeConditionFront: '',
    brakeConditionRear: '',
    emergencyBrake: '',
  });

  const { startListening, stopListening } = useSpeechRecognition((transcript) => {
    if (currentStep === 1) { // Tires page
      // Example: Map speech to form fields
      const fields = [
        'tirePressureLeftFront', 'tirePressureRightFront',
        'tireConditionLeftFront', 'tireConditionRightFront',
        'tirePressureLeftRear', 'tirePressureRightRear',
        'tireConditionLeftRear', 'tireConditionRightRear'
      ];

      // Simple mapping: If speech contains a known keyword, update the corresponding field
      fields.forEach(field => {
        if (transcript.toLowerCase().includes(field.replace(/([A-Z])/g, ' $1').toLowerCase())) {
          setFormData(prevFormData => ({
            ...prevFormData,
            [field]: transcript
          }));
        }
      });
    }
    // Add similar conditions for other steps if needed
  });

  useEffect(() => {
    if (currentStep === 1) { // Start listening when on 'Tires' step
      startListening();
    } else {
      stopListening();
    }
  }, [currentStep, startListening, stopListening]);

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

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/save-inspection', formData);
      alert('Inspection saved successfully');
    } catch (error) {
      console.error('Error saving the inspection:', error);
      alert('There was an error saving the inspection!');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <VehicleInfo formData={formData} handleChange={handleChange} />;
      case 1:
        return <Tires formData={formData} handleChange={handleChange} />;
      case 2:
        return <Battery formData={formData} handleChange={handleChange} />;
      case 3:
        return <Exterior formData={formData} handleChange={handleChange} />;
      case 4:
        return <Brakes formData={formData} handleChange={handleChange} />;
      case 5:
        return <Engine formData={formData} handleChange={handleChange} />;
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
      <ProgressBar steps={steps} currentStep={currentStep} />
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
