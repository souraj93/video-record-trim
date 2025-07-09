"use client";
// import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import RecordRTC from 'recordrtc';

// const reelTime = 15; // seconds
// let RecordRTC = null; // Initialize RecordRTC as null

const WebcamRecorder = ({ onRecorded, clickTrim, displayTrim, displayMusic, clickMusic, getDuration, clickCrop, displayCrop,setCapturedImage }) => {
  // new
  // const streamRef = useRef(null);
  // const recorderRef = useRef(null);
  // // end new
  // const webcamRef = useRef(null);
  // const [facingMode, setFacingMode] = useState("user");
  // const mediaRecorderRef = useRef(null);
  // const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  // const [timer, setTimer] = useState(reelTime);
  // let interval = null;
  const canvasRef = useRef();
  // const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const originalVideoRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // new
  // const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // setIsMobile(/android|iphone|ipad|mobile/i.test(userAgent));
    // if (typeof navigator.mediaDevices === 'undefined' || typeof RecordRTC === 'undefined') {
    //   setIsSupported(false);
    // }
    // if (typeof window !== 'undefined') {
    //   import('recordrtc').then((mod) => {
    //     RecordRTC = mod.default || mod;
    //   });
    // }
  }, []);

  // const videoConstraints = {
  //   facingMode: facingMode
  // };

  // const toggleCamera = () => {
  //   setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  // };

  // const startRecording = async () => {
  //   try {
  //     const stream = webcamRef.current.stream;
  //     streamRef.current = stream;

  //     const recorder = new RecordRTC(stream, {
  //       type: 'video',
  //       mimeType: 'video/mp4',
  //       disableLogs: true,
  //     });

  //     recorder.startRecording();
  //     recorderRef.current = recorder;
  //     setRecording(true);
  //   } catch (err) {
  //     console.error('Error starting recording:', err);
  //     alert('Recording failed. Make sure you have granted camera and microphone access.');
  //   }
  // };

  // const stopRecording = async () => {
  //   const recorder = recorderRef.current;

  //   if (!recorder) return;

  //   await recorder.stopRecording(() => {
  //     const blob = recorder.getBlob();
  //     const url = URL.createObjectURL(blob);
  //     setVideoURL(url);
  //     onRecorded(blob);
  //   });

  //   // Stop webcam stream tracks to release camera
  //   streamRef.current?.getTracks().forEach((track) => track.stop());
  //   setRecording(false);
  //   clearInterval(interval);
  // };

  // const startRecording = () => {
  //   setRecording(true);
  //   const stream = webcamRef.current.stream;
  //   const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  //   const chunks = [];
  //   recorder.ondataavailable = (e) => chunks.push(e.data);
  //   recorder.onstop = () => {
  //     const blob = new Blob(chunks, { type: 'video/webm' });
  //     const url = URL.createObjectURL(blob);
  //     setVideoURL(url);
  //     onRecorded(blob);
  //   };

  //   recorder.start();

  //   setTimer(reelTime);
  //   // Stop recording after 60 seconds

  //   mediaRecorderRef.current = recorder;
  // };

  // const stopRecording = () => {
  //   mediaRecorderRef.current.stop();
  //   clearInterval(interval);
  //   setRecording(false);
  // };

  // useEffect(() => {
  //   if (recording) {
  //     interval = setInterval(() => {
  //       setTimer((prev) => {
  //         if (prev >= 0 && prev <= reelTime) {
  //           getDuration(reelTime - prev + 1);
  //           return prev - 1;
  //         } else {
  //           clearInterval(interval);
  //           return prev;
  //         }
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       if (recording) {
  //         stopRecording();
  //         clearInterval(interval);
  //       }
  //     }, (reelTime + 1) * 1000); // Stop recording after 16 seconds
  //   }
  //   return () => clearInterval(interval);
  // }, [recording]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const video = videoRef.current;
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    setVideoURL(videoURL);
    onRecorded(file);
    video.load();

    video.onloadedmetadata = () => {
      // video.currentTime = 0.5;
      getDuration(video.duration);
      // URL.revokeObjectURL(videoURL); // clean up
    };

    // video.onseeked = () => {
    //   // draw frame to canvas
    //   const canvas = canvasRef.current;
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
    //   const ctx = canvas.getContext("2d");
    //   try {
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //         const fallback = canvas.toDataURL("image/jpeg");
    //         setThumbnail(fallback);
    //         setShowVideo(false);
    //       } catch (err) {
    //         console.error("Fallback drawing failed", err);
    //       }
    //   URL.revokeObjectURL(video.src);
    // };
    

  };

  const handleImgFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setCapturedImage(reader.result); // Set the captured image for further processing
    };
    reader.readAsDataURL(file); // Read file as base64 URL
  };

  // if (!isSupported) {
  //   return <p>❌ Your browser does not support video recording.</p>;
  // }

  return (
    <div className='relative h-screen'>
      <video ref={videoRef} style={{ display: "none" }} />

      {/* <canvas ref={canvasRef} style={{ display: "none" }} /> */}
      {/* {thumbnail && !showVideo && (
        <div onClick={() => {setShowVideo(true)

          setTimeout(() => {
            originalVideoRef.current?.play();
          }, 100);
        }} style={{ cursor: "pointer" }}>
          <img
            src={thumbnail}
            alt="Thumbnail"
            style={{ width: "100%", height: "100vh", borderRadius: 8, zIndex: 50, objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "10px 14px",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "24px",
            }}
          >
            ▶
          </div>
        </div>
      )} */}
      {videoURL ? (

        <video ref={originalVideoRef} src={videoURL} controls className='h-screen object-cover' />
      ) :
        !showVideo && !previewUrl ? <>
          <button
            className="bg-primary rounded-full p-2 absolute top-2 left-2"
            onClick={() => document.getElementById('video-upload').click()}
          >
            📹 Upload Video
          </button>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </> : null
        // <Webcam audio={true} muted={true} ref={webcamRef} videoConstraints={videoConstraints} className='h-screen object-cover' />
      }
      {!displayCrop ? previewUrl ? (
        <div style={{ marginTop: 20 }}>
          <p>📸 Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
        </div>
      ) : !videoURL && <>
          <button
            className="bg-primary rounded-full p-2 absolute top-2 right-2"
            onClick={() => document.getElementById('img-upload').click()}
          >
            📸 Upload Image
          </button>
          <input
            id="img-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImgFileChange}
          />
        </> : null
        // <Webcam audio={true} muted={true} ref={webcamRef} videoConstraints={videoConstraints} className='h-screen object-cover' />
      }
      {/* {recording ?
        <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
          <span>Timer: {timer}s</span>
        </div> : null} */}
      {/* {videoURL ? 
      <div className='absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center'>
        <span>Time: {reelTime - timer}s</span>
      </div> : null} */}
      {/* {!videoURL && !recording && isMobile ?
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
      </div>: null} */}
      {/* <div className='absolute py-2' style={{ left: '45%', bottom: 10 }}>
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
      </div> */}
      <div className='absolute top-2 right-2 p-2'>
        {videoURL ?
          <>
            {!displayTrim && !displayMusic ? <button className="bg-primary rounded-full p-2 mr-2 web" onClick={() => clickTrim(true)}>✂️</button>
              : null}
            {!displayMusic && !displayTrim ? <button className="bg-primary rounded-full p-2 web" onClick={() => clickMusic(true)}>🎬</button>
              : null}
          </> : null
        }
        {previewUrl ?
          <>
            {!displayCrop ? <button className="bg-primary rounded-full p-2 mr-2 web" onClick={() => clickCrop(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2v14a2 2 0 0 0 2 2h14" />
                <path d="M18 22V8a2 2 0 0 0-2-2H2" />
              </svg>
            </button>
              : null}
          </> : null
        }
      </div>
    </div>
  );
};

export default WebcamRecorder;

