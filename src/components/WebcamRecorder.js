import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const reelTime = 15; // seconds

const WebcamRecorder = ({ onRecorded, clickTrim, displayTrim, displayMusic, clickMusic, getDuration }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [timer, setTimer] = useState(reelTime);
  let interval = null;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|mobile/i.test(userAgent));
  }, []);

  const videoConstraints = {
    facingMode: facingMode
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

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

    setTimer(reelTime);
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
          if (prev >= 0 && prev <= reelTime) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);
      setTimeout(() => {
        if (recording) {
          stopRecording();
          clearInterval(interval);
        }
      }, (reelTime + 1) * 1000); // Stop recording after 16 seconds
    }
    return () => clearInterval(interval);
  }, [recording]);

  return (
    <div className='relative'>
      {videoURL ? (
        <video src={videoURL} controls className='h-screen object-cover' />
      ) : <Webcam audio={true} muted={true} ref={webcamRef} videoConstraints={videoConstraints} className='h-screen object-cover' />}
      {recording ?
        <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
          <span>Timer: {timer}s</span>
        </div> : null}
      {/* {videoURL ? 
      <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
        <span>Time: {reelTime - timer}s</span>
      </div> : null} */}
      {!videoURL && !recording && isMobile ?
      <div className='absolute top-2 left-2'>
          <button className="bg-primary rounded-full p-2" onClick={() => toggleCamera()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M3 22v-6h6" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            </svg>



          </button>
      </div>: null}
      <div className='absolute py-2' style={{ left: '45%', bottom: 10 }}>
        {!videoURL ? !recording ? (
          <button className=" rounded-full p-2 border" onClick={startRecording}>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="red"
            >
              <circle cx="12" cy="12" r="8" />
            </svg>


          </button>
        ) : (
          <button className=" rounded-full p-2 border" onClick={stopRecording}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="red"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" ry="2" />
            </svg>
          </button>
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
