import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import ActionButton from '../components/ActionButton';
import Waveform from '../components/Waveform';

function RecordPage({ onPageChange, pageParams }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveform, setWaveform] = useState(Array(20).fill().map(() => Math.random() * 50 + 10));
  const [audioChunks, setAudioChunks] = useState([]); // To store audio data
  const mediaRecorder = useRef(null); // For MediaRecorder instance

  useEffect(() => {
    // Initialize MediaRecorder
    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks(prev => [...prev, event.data]);
          }
        };

        mediaRecorder.current.onstop = () => {
          //  Process audio chunks here (e.g., send to server)
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Or other format
          sendAudioToServer(audioBlob);  //  Function to send audio
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initRecorder();

    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setWaveform(Array(20).fill().map(() => Math.random() * 50 + 10));
      }, 1000);
      if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
        mediaRecorder.current.resume();
      }
    } else {
      clearInterval(interval);
      if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
        mediaRecorder.current.pause();
      }
    }
    return () => {
      clearInterval(interval);
      if (mediaRecorder.current) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  const startRecording = () => {
    setAudioChunks([]);
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current.stop();
  };


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav'); // Or other filename
    try {
      const response = await fetch('/api/process-audio', {  //  Your server endpoint
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        onPageChange("summary", { mode: pageParams.mode, summary: result.summary });
      } else {
        console.error("Error sending audio:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      // Handle error
    }
  };


  return (
      <div className="container mx-auto p-4 max-w-md">
        {/* ... (rest of your UI) */}
        <ActionButton
            onClick={isRecording ? stopRecording : startRecording}
            color={isRecording ? "yellow" : "green"}
        >
          {isRecording ? 'Pause' : 'Record'}
        </ActionButton>
        <ActionButton
            onClick={stopRecording}
            color="red"
        >
          Stop
        </ActionButton>
        <ActionButton
            onClick={() => onPageChange("home")}
            color="gray"
        >
          Cancel
        </ActionButton>
      </div>
  );
}

export default RecordPage;