import { useState, useEffect, useRef } from 'react';

const useSpeechRecognition = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    const handleError = (error) => {
      console.error('Speech recognition error:', error);
      if (error === 'aborted') {
        console.log('Retrying after delay...');
        setTimeout(() => {
          stopListening();
          startListening();
        }, 5000); // Retry after 5 seconds
      }
    };

    recognitionInstance.onresult = (event) => {
      clearTimeout(inactivityTimerRef.current); // Reset the timer on each result
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      if (!isListening) {
        if (transcript === 'ok' || transcript === 'start') {
          console.log('Keyword detected. Starting to listen for form inputs...');
          setIsListening(true);
        }
      } else {
        console.log('Heard: ' + transcript);
        onResult(transcript); // Call the provided onResult callback
      }

      // Start a timer to stop listening after a period of inactivity (e.g., 10 seconds)
      inactivityTimerRef.current = setTimeout(() => {
        console.log('Inactivity detected. Stopping listening.');
        stopListening();
        setIsListening(false);
      }, 10000); // 10,000 ms = 10 seconds
    };

    recognitionInstance.onerror = (event) => {
      handleError(event.error);
    };

    recognitionRef.current = recognitionInstance;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, onResult]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { startListening, stopListening };
};

export default useSpeechRecognition;
