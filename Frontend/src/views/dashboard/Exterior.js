import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Typography } from '@mui/material';

const exteriorPrompts = [
  "Is there any rust, dents, or damage to the exterior?",
  "Is there any oil leak in the suspension?"
];

const exteriorResponseBoxIds = [
  'exteriorDamage',
  'oilLeakSuspension'
];

const Exterior = ({ formData, handleChange }) => {
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
    speakText(exteriorPrompts[0]);
  };

  const handleNextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < exteriorPrompts.length) {
      setCurrentPromptIndex(nextIndex);
      speakText(exteriorPrompts[nextIndex]);
    } else {
      setIsListening(false);
      console.log("Exterior inspection complete.");
    }
  };

  const updateCurrentField = (transcript) => {
    const currentFieldId = exteriorResponseBoxIds[currentPromptIndex];
    const textBox = document.getElementById(currentFieldId);
    if (textBox) {
      handleChange({ target: { name: currentFieldId, value: transcript } });
    }
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" color="primary" align="center">Exterior Inspection</Typography>
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
        Start Exterior Inspection
      </button>
      <Typography id="status" align="center" color="textSecondary">Status: {isListening ? 'Listening...' : 'Not Listening'}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Rust, Dent or Damage to Exterior"
            id="exteriorDamage"
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
            id="oilLeakSuspension"
            name="oilLeakSuspension"
            value={formData.oilLeakSuspension}
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

export default Exterior;
