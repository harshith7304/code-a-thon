import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const tirePrompts = [
  "Please report the tire pressure for the left front tire.",
  "Please report the tire pressure for the right front tire.",
  "What is the condition of the left front tire?",
  "What is the condition of the right front tire?",
  "Please report the tire pressure for the left rear tire.",
  "Please report the tire pressure for the right rear tire.",
  "What is the condition of the left rear tire?",
  "What is the condition of the right rear tire?"
];

const tireResponseBoxIds = [
  'tirePressureLeftFront',
  'tirePressureRightFront',
  'tireConditionLeftFront',
  'tireConditionRightFront',
  'tirePressureLeftRear',
  'tirePressureRightRear',
  'tireConditionLeftRear',
  'tireConditionRightRear'
];

const Tires = ({ formData, handleChange }) => {
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
    speakText(tirePrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < tirePrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(tirePrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Tires inspection complete.");
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = tireResponseBoxIds[currentPromptIndex];
    handleChange({ target: { name: currentFieldId, value: transcript } });
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Tires Inspection</Typography>
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
        Start Tires Inspection
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Tire Pressure Left Front"
            id="tirePressureLeftFront"
            name="tirePressureLeftFront"
            value={formData.tirePressureLeftFront}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="Example: 32 psi"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Pressure Right Front"
            id="tirePressureRightFront"
            name="tirePressureRightFront"
            value={formData.tirePressureRightFront}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="Example: 32 psi"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Condition Left Front"
            id="tireConditionLeftFront"
            name="tireConditionLeftFront"
            value={formData.tireConditionLeftFront}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Good, Fair, Poor"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Condition Right Front"
            id="tireConditionRightFront"
            name="tireConditionRightFront"
            value={formData.tireConditionRightFront}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Good, Fair, Poor"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Pressure Left Rear"
            id="tirePressureLeftRear"
            name="tirePressureLeftRear"
            value={formData.tirePressureLeftRear}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="Example: 32 psi"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Pressure Right Rear"
            id="tirePressureRightRear"
            name="tirePressureRightRear"
            value={formData.tirePressureRightRear}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="Example: 32 psi"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Condition Left Rear"
            id="tireConditionLeftRear"
            name="tireConditionLeftRear"
            value={formData.tireConditionLeftRear}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Good, Fair, Poor"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tire Condition Right Rear"
            id="tireConditionRightRear"
            name="tireConditionRightRear"
            value={formData.tireConditionRightRear}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Good, Fair, Poor"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tires;
