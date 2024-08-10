import React, { useState, useEffect } from 'react';

// Define prompts and corresponding text field IDs
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

const VehicleInfo = () => {
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
        }
    };

    const updateCurrentField = (transcript) => {
        const currentFieldId = vehicleInfoResponseBoxIds[currentPromptIndex];
        const textBox = document.getElementById(currentFieldId);
        if (textBox) {
            textBox.value = transcript;
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#007bff', textAlign: 'center' }}>Vehicle Information</h1>
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
                Start Vehicle Info
            </button>
            <div id="status" style={{ marginBottom: '20px', textAlign: 'center' }}>Status: {isListening ? 'Listening...' : 'Not Listening'}</div>

            {vehicleInfoResponseBoxIds.map((id, index) => (
                <div className="input-group" key={id} style={{ marginBottom: '15px' }}>
                    <label htmlFor={id} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {vehicleInfoPrompts[index]}
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

export default VehicleInfo;
