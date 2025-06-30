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
    const resultURL = await mergeMedia(trimmedVideo || videoBlob, audioFile);
    setOutputURL("");
    clickTrim(false);
    setMergedVideo(resultURL.blob);
    setOutputMergedURL(resultURL.url);
    mergeVideoState(true);
  };

  return (
    <div style={{ marginTop: 20 }}>
      {displayTrim ?
      outputURL && !outputMergedURL ? (
        <div className='relative'>
          <h4>Trimmed Video</h4>
          <video src={outputURL} controls width="400" ref={videoRef} onLoadedMetadata={() => {
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
        <input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
        <label>Duration (s):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        <br />
        <button onClick={handleTrim} style={{ marginTop: 10 }}>✂️ Trim Video</button>

      </> : null
      }
      {/* <p>Video Duration: {videoDuration} seconds</p> */}

      {displayMusic ?
      <>
      {/* {thumbnail && <img src={thumbnail} alt="Thumbnail" />} */}
      
      {outputMergedURL && !outputURL ? (
        <div className='relative'>
          <h4>Merged Video</h4>
          <video src={outputMergedURL} controls width="400" />
          {!displayTrim ? <div className='absolute right-0 py-2 top-0'>
            <button className="bg-primary rounded-full p-2" onClick={() => clickTrim(true)}>✂️</button>
          </div>
       : null}
          {/* <a href={outputMergedURL} download="merged.mp4">📥 Download</a> */}
        </div>
      ) : <>
        <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />

      <button onClick={merge} style={{ marginTop: 10 }}>✂️ Merge Media</button>
      </>}
      </> : null}

    </div>
  );
};

export default VideoTrimmer;
