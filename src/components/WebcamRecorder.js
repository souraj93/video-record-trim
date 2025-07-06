import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamRecorder = ({ onRecorded, clickTrim, displayTrim, displayMusic, clickMusic, getDuration }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [timer, setTimer] = useState(0);
  let interval = null;

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

    setTimer(0);
     // Stop recording after 60 seconds

    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    clearInterval(interval);
    setRecording(false);
  };

  useEffect(() => {
    if (recording) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 60) {
            clearInterval(interval);
            return 60;
          }
          getDuration(prev + 1);
          return prev + 1;
        });
      }, 1000);
      setTimeout(() => {
        if (recording) {
          stopRecording();
          clearInterval(interval);
        }
      }, 60000); // Stop recording after 60 seconds
    }
    return () => clearInterval(interval);
  }, [recording]);

  return (
    <div className='relative'>
      {videoURL ? (
        <video src={videoURL} controls className='h-screen object-cover' />
      ) : <Webcam audio={true} muted={true} ref={webcamRef} className='h-screen object-cover' />}
      {recording ? 
      <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
        <span>Timer: {timer}s</span>
      </div> : null}
      {videoURL ? 
      <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
        <span>Time: {timer}s</span>
      </div> : null}
      <div className='absolute py-2' style={{left: '45%', bottom: 10}}>
        {!videoURL ? !recording ? (
          <button className=" rounded-full p-2 w-12 h-12" style={{ backgroundColor: 'red' }} onClick={startRecording}></button>
        ) : (
          <button className=" p-2 w-12 h-12" style={{ backgroundColor: 'red' }} onClick={stopRecording}></button>
        ) : null}
      </div>
      <div className='absolute top-2 right-2 p-2'>
        {videoURL ?
          <>
            {!displayTrim && !displayMusic ? <button className="bg-primary rounded-full p-2 mr-2 web" onClick={() => clickTrim(true)}>✂️</button>
              : null}
            {!displayMusic && !displayTrim ? <button className="bg-primary rounded-full p-2 web" onClick={() => clickMusic(true)}>🎬</button>
              : null}
          </> : null
        }
      </div>
    </div>
  );
};

export default WebcamRecorder;
