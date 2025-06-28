import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamRecorder = ({ onRecorded }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const startRecording = () => {
    setRecording(true);
    const stream = webcamRef.current.stream;
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      onRecorded(blob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <Webcam audio={true} muted={true} ref={webcamRef} />
      {!recording ? (
        <button onClick={startRecording}>🎬 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>🛑 Stop Recording</button>
      )}
      {videoURL && (
        <video src={videoURL} controls width="400" style={{ marginTop: 20 }} />
      )}
    </div>
  );
};

export default WebcamRecorder;
