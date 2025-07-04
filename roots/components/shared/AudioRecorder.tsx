
import React, { useState, useRef, useCallback } from 'react';
import { Mic, StopCircle, Play, AlertTriangle } from 'lucide-react';
import Button from './Button';

interface AudioRecorderProps {
  onRecordingComplete: (audioBase64: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [error, setError] = useState('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          onRecordingComplete(base64String);
        };

        audioChunks.current = [];
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError('Microphone access denied. Please enable it in your browser settings.');
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-sky-blue rounded-lg">
      <div className="flex items-center gap-4">
        {!isRecording ? (
          <Button onClick={startRecording} variant="secondary" size="md">
            <Mic className="mr-2" /> Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="primary" size="md" className="bg-red-500 hover:bg-red-600">
            <StopCircle className="mr-2" /> Stop Recording
          </Button>
        )}
        {audioURL && (
            <audio controls src={audioURL} className="h-10"></audio>
        )}
      </div>
      {error && (
        <p className="text-red-600 text-sm flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4"/>
            {error}
        </p>
        )}
    </div>
  );
};

export default AudioRecorder;
