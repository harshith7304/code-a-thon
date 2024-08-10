import React, { useState, useEffect } from 'react';

// Define prompts and corresponding text field IDs
const prompts = [
  "Please report the tire pressure for the left front tire.",
  "Please report the tire pressure for the right front tire.",
  "What is the condition of the left front tire?",
  "What is the condition of the right front tire?",
  "Please report the tire pressure for the left rear tire.",
  "Please report the tire pressure for the right rear tire.",
  "What is the condition of the left rear tire?",
  "What is the condition of the right rear tire?"
];

const responseBoxIds = [
  'tirePressureLeftFront',
  'tirePressureRightFront',
  'tireConditionLeftFront',
  'tireConditionRightFront',
  'tirePressureLeftRear',
  'tirePressureRightRear',
  'tireConditionLeftRear',
  'tireConditionRightRear'
];

const InspectionApp = () => {
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
        speakText(prompts[0]);
    };

    const handleNextPrompt = () => {
        const nextIndex = currentPromptIndex + 1;

        if (nextIndex < prompts.length) {
            setCurrentPromptIndex(nextIndex);
            speakText(prompts[nextIndex]);
        } else {
            setIsListening(false);
            console.log("Inspection complete.");
        }
    };

    const updateCurrentField = (transcript) => {
        const currentFieldId = responseBoxIds[currentPromptIndex];
        const textBox = document.getElementById(currentFieldId);
        if (textBox) {
            textBox.value = transcript;
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#007bff', textAlign: 'center' }}>Tires Inspection</h1>
            <button 
                onClick={startListening}
                style={{
                    display: 'block',
                    margin: '0 auto 20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Start Inspection
            </button>
            <div id="status" style={{ marginBottom: '20px', textAlign: 'center' }}>Status: {isListening ? 'Listening...' : 'Not Listening'}</div>

            {responseBoxIds.map((id, index) => (
                <div className="input-group" key={id} style={{ marginBottom: '15px' }}>
                    <label htmlFor={id} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {prompts[index]}
                    </label>
                    <input 
                        type="text" 
                        id={id} 
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '2px solid #007bff',
                            borderRadius: '5px'
                        }} 
                    />
                </div>
            ))}
        </div>
    );
};

export default InspectionApp;
