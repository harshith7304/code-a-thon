import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

const vehicleInfoPrompts = [
  "Please enter the Truck Serial Number.",
  "Please enter the Truck Model.",
  "Please provide the Inspection ID.",
  "Please provide the Inspector Name.",
  "Please provide the Inspection Employee ID.",
  "Please provide the Date and Time of Inspection.",
  "Please provide the Location of Inspection.",
  "Please provide the Geo Coordinates of Inspection.",
  "Please provide the Service Meter Hours.",
  "Please provide the Inspector Signature.",
  "Please provide the Customer Name or Company Name.",
  "Please provide the CAT Customer ID."
];

const vehicleInfoResponseBoxIds = [
  'truckSerialNumber',
  'truckModel',
  'inspectionId',
  'inspectorName',
  'inspectionEmployeeId',
  'dateTimeOfInspection',
  'locationOfInspection',
  'geoCoordinates',
  'serviceMeterHours',
  'inspectorSignature',
  'customerName',
  'catCustomerId'
];

const VehicleInfo = ({ formData, handleChange, onComplete }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const synth = window.speechSynthesis;
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  useEffect(() => {
    if (isListening) {
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log('Heard:', transcript);

        if (transcript.toLowerCase() === 'next') {
          handleNextPrompt();
        } else {
          updateCurrentField(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        recognition.stop();
        recognition.start();
      };
    }

    return () => recognition.stop();
  }, [isListening, currentPromptIndex]);

  const speakText = (text) => {
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsListening(true);
    };
    synth.speak(utterance);
  };

  const startListening = () => {
    setCurrentPromptIndex(0);
    speakText(vehicleInfoPrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < vehicleInfoPrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(vehicleInfoPrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Vehicle information entry complete.");
      if (onComplete) {
        onComplete();
      }
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = vehicleInfoResponseBoxIds[currentPromptIndex];
    handleChange({ target: { name: currentFieldId, value: transcript } });
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Vehicle Information</Typography>
      <button 
        onClick={startListening}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Start Vehicle Info
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Truck Serial Number"
            id="truckSerialNumber"
            name="truckSerialNumber"
            value={formData.truckSerialNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Truck Model"
            id="truckModel"
            name="truckModel"
            value={formData.truckModel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Inspection ID"
            id="inspectionId"
            name="inspectionId"
            value={formData.inspectionId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Inspector Name"
            id="inspectorName"
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
            id="inspectionEmployeeId"
            name="inspectionEmployeeId"
            value={formData.inspectionEmployeeId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date and Time of Inspection"
            id="dateTimeOfInspection"
            name="dateTimeOfInspection"
            value={formData.dateTimeOfInspection}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Location of Inspection"
            id="locationOfInspection"
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
            id="geoCoordinates"
            name="geoCoordinates"
            value={formData.geoCoordinates}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Service Meter Hours"
            id="serviceMeterHours"
            name="serviceMeterHours"
            value={formData.serviceMeterHours}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Inspector Signature"
            id="inspectorSignature"
            name="inspectorSignature"
            value={formData.inspectorSignature}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Customer Name or Company Name"
            id="customerName"
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
            id="catCustomerId"
            name="catCustomerId"
            value={formData.catCustomerId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleInfo;