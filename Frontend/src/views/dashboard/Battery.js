import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const batteryPrompts = [
  "Please provide the Battery Make.",
  "Please provide the Battery Replacement Date.",
  "Please provide the Battery Voltage.",
  "What is the Battery Water Level?",
  "Is there any damage to the Battery?",
  "Is there any Leak or Rust in the Battery?"
];

const batteryResponseBoxIds = [
  'batteryMake',
  'batteryReplacementDate',
  'batteryVoltage',
  'batteryWaterLevel',
  'batteryDamage',
  'batteryLeakRust'
];

const Battery = ({ formData, handleChange }) => {
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
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Heard:', transcript);

        if (transcript === 'next') {
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
    speakText(batteryPrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < batteryPrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(batteryPrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Battery information entry complete.");
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = batteryResponseBoxIds[currentPromptIndex];
    const textBox = document.getElementById(currentFieldId);
    if (textBox) {
      handleChange({ target: { name: currentFieldId, value: transcript } });
    }
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Battery Information</Typography>
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
        Start Battery Info
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Battery Make"
            id="batteryMake"
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
            id="batteryReplacementDate"
            name="batteryReplacementDate"
            value={formData.batteryReplacementDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="dd - mm - yyyy"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Battery Voltage"
            id="batteryVoltage"
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
            id="batteryWaterLevel"
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
            id="batteryDamage"
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
            id="batteryLeakRust"
            name="batteryLeakRust"
            value={formData.batteryLeakRust}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Yes/No"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Battery;
