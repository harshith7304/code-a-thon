import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const enginePrompts = [
  "Is there any rust, dents, or damage to the engine?",
  "What is the condition of the engine oil?",
  "What is the color of the engine oil?",
  "What is the condition of the brake fluid?",
  "What is the color of the brake fluid?",
  "Is there any oil leak in the engine?"
];

const engineResponseBoxIds = [
  'engineDamage',
  'engineOilCondition',
  'engineOilColor',
  'brakeFluidCondition',
  'brakeFluidColor',
  'engineOilLeak'
];

const Engine = ({ formData, handleChange }) => {
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
    speakText(enginePrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < enginePrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(enginePrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Engine inspection complete.");
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = engineResponseBoxIds[currentPromptIndex];
    const textBox = document.getElementById(currentFieldId);
    if (textBox) {
      handleChange({ target: { name: currentFieldId, value: transcript } });
    }
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Engine Inspection</Typography>
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
        Start Engine Inspection
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Rust, Dents or Damage in Engine"
            id="engineDamage"
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
            id="engineOilCondition"
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
            id="engineOilColor"
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
            id="brakeFluidCondition"
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
            id="brakeFluidColor"
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
            id="engineOilLeak"
            name="engineOilLeak"
            value={formData.engineOilLeak}
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

export default Engine;
