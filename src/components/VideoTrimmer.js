import React, { useState, useRef } from 'react';
import { trimVideo, mergeMedia } from './ffmpegUtils';

const VideoTrimmer = ({ videoBlob, trimVideoState, displayMusic, clickMusic, clickTrim, displayTrim, mergeVideoState }) => {
  const [start, setStart] = useState(0);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [duration, setDuration] = useState(5);
  const [outputURL, setOutputURL] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [trimmedVideo, setTrimmedVideo] = useState(null);
  const [mergedVideo, setMergedVideo] = useState(null);
  const [outputMergedURL, setOutputMergedURL] = useState(null);


  const handleTrim = async () => {
    const resultURL = await trimVideo(mergedVideo || videoBlob, start, duration);
    captureThumbnail(resultURL.blob);
    setTrimmedVideo(resultURL.blob);
    trimVideoState(true);
    setOutputURL(resultURL.url);
    setOutputMergedURL("");
    clickMusic(false);
  };

  const captureThumbnail = (blob) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(blob);
    video.currentTime = 0;

    video.onloadeddata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      const thumbnail = canvas.toDataURL('image/png');
      setThumbnail(thumbnail);
    };
  };

  const merge = async () => {
    if(!audioFile) {
      alert("Please select an audio file to merge with the video.");
      return;
    }
    const resultURL = await mergeMedia(trimmedVideo || videoBlob, audioFile);
    setOutputURL("");
    clickTrim(false);
    setMergedVideo(resultURL.blob);
    setOutputMergedURL(resultURL.url);
    mergeVideoState(true);
  };

  return (
    <div className='px-4 text-black'>
      {displayTrim ?
      outputURL && !outputMergedURL ? (
        <div className='relative'>
          <h4>Trimmed Video</h4>
          <video src={outputURL} controls width="400" className='h-screen object-cover' ref={videoRef} onLoadedMetadata={() => {
            const duration = videoRef.current.duration;
            setVideoDuration(duration);
          }} />
          {!displayMusic ? <div className='absolute right-0 py-2 top-0'>
            <button className="bg-primary rounded-full p-2" onClick={() => clickMusic(true)}>🎬</button>
          </div>
       : null}
          {/* <a href={outputURL} download="trimmed.mp4">📥 Download</a> */}
        </div>
      ) : 
      <>
        <label>Start time (s):</label>
        <input type="number" value={start} className='border p-1 bg-white' onChange={(e) => setStart(Number(e.target.value))} />
        <label>Duration (s):</label>
        <input type="number" value={duration} className='border p-1 bg-white' onChange={(e) => setDuration(Number(e.target.value))} />
        <br />
        <button onClick={handleTrim} className="bg-primary p-2 text-white rounded-lg" style={{ marginTop: 10 }}>✂️ Trim Video</button>
        <button onClick={() => clickTrim(false)} className=" p-2 text-white rounded-lg ml-2" style={{ marginTop: 10, backgroundColor: "red" }}> Cancel</button>

      </> : null
      }
      {/* <p>Video Duration: {videoDuration} seconds</p> */}

      {displayMusic ?
      <>
      {/* {thumbnail && <img src={thumbnail} alt="Thumbnail" />} */}
      
      {outputMergedURL && !outputURL ? (
        <div className='relative'>
          <h4>Merged Video</h4>
          <video src={outputMergedURL} controls width="400" className='h-screen object-cover' />
          {!displayTrim ? <div className='absolute right-0 py-2 top-0'>
            <button className="bg-primary rounded-full p-2" onClick={() => clickTrim(true)}>✂️</button>
          </div>
       : null}
          {/* <a href={outputMergedURL} download="merged.mp4">📥 Download</a> */}
        </div>
      ) : <>
        <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />

      <button onClick={merge} className="bg-primary p-2 text-white rounded-lg" style={{ marginTop: 10 }}>✂️ Merge Media</button>
      <button onClick={() => clickMusic(false)} className=" p-2 text-white rounded-lg ml-2" style={{ marginTop: 10, backgroundColor: "red" }}> Cancel</button>
      </>}
      </> : null}

    </div>
  );
};

export default VideoTrimmer;
