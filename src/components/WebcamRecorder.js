import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamRecorder = ({ onRecorded, clickTrim, displayTrim, displayMusic, clickMusic }) => {
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
    <div className='relative'>
      {videoURL ? (
        <video src={videoURL} controls width="400" style={{ marginTop: 20 }} />
      ) : <Webcam audio={true} muted={true} ref={webcamRef} />}
      <div className='absolute right-0 py-2 top-0'>
        {!videoURL ? !recording ? (
          <button className="bg-primary rounded-full p-2" onClick={startRecording}>🛑</button>
        ) : (
          <button className="bg-primary rounded-full p-2" onClick={stopRecording}>⏹️</button>
        ) : <>
        {!displayTrim && !displayMusic ? <button className="bg-primary rounded-full p-2" onClick={() => clickTrim(true)}>✂️</button>
       : null}
       {!displayMusic && !displayTrim ? <button className="bg-primary rounded-full p-2" onClick={() => clickMusic(true)}>🎬</button>
       : null}
        </>
        }
      </div>
      
      
    </div>
  );
};

export default WebcamRecorder;
