import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const brakesPrompts = [
  "What is the brake fluid level?",
  "What is the brake condition for the front?",
  "What is the brake condition for the rear?",
  "What is the condition of the emergency brake?"
];

const brakesResponseBoxIds = [
  'brakeFluidLevel',
  'brakeConditionFront',
  'brakeConditionRear',
  'emergencyBrake'
];

const Brakes = ({ formData, handleChange }) => {
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
    speakText(brakesPrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < brakesPrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(brakesPrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Brakes inspection complete.");
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = brakesResponseBoxIds[currentPromptIndex];
    const textBox = document.getElementById(currentFieldId);
    if (textBox) {
      handleChange({ target: { name: currentFieldId, value: transcript } });
    }
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Brakes Inspection</Typography>
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
        Start Brakes Inspection
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Brake Fluid Level"
            id="brakeFluidLevel"
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
            id="brakeConditionFront"
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
            id="brakeConditionRear"
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
            id="emergencyBrake"
            name="emergencyBrake"
            value={formData.emergencyBrake}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Good, Ok, Low"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Brakes;
