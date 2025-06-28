import React, { useState, useRef } from 'react';
import { trimVideo, mergeMedia } from './ffmpegUtils';

const VideoTrimmer = ({ videoBlob }) => {
  const [start, setStart] = useState(0);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [duration, setDuration] = useState(5);
  const [outputURL, setOutputURL] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [trimmedVideo, setTrimmedVideo] = useState(null);
  const [outputMergedURL, setOutputMergedURL] = useState(null);


  const handleTrim = async () => {
    const resultURL = await trimVideo(videoBlob, start, duration);
    captureThumbnail(resultURL.blob);
    console.log("resultURL ", resultURL)
    setTrimmedVideo(resultURL.blob);
    setOutputURL(resultURL.url);
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
    const resultURL = await mergeMedia(trimmedVideo, audioFile);
    setOutputMergedURL(resultURL.url);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <label>Start time (s):</label>
      <input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
      <label>Duration (s):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      <br />
      <button onClick={handleTrim} style={{ marginTop: 10 }}>✂️ Trim Video</button>

      {outputURL && (
        <div>
          <h4>Trimmed Video</h4>
          <video src={outputURL} controls width="400" ref={videoRef} onLoadedMetadata={() => {
            const duration = videoRef.current.duration;
            setVideoDuration(duration);
          }} />
          <a href={outputURL} download="trimmed.mp4">📥 Download</a>
        </div>
      )}
      <p>Video Duration: {videoDuration} seconds</p>

      {/* {thumbnail && <img src={thumbnail} alt="Thumbnail" />} */}
      <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />

      <button onClick={merge} style={{ marginTop: 10 }}>✂️ Merge Media</button>

      {outputMergedURL && (
        <div>
          <h4>Merged Video</h4>
          <video src={outputMergedURL} controls width="400" />
          <a href={outputMergedURL} download="merged.mp4">📥 Download</a>
        </div>
      )}

    </div>
  );
};

export default VideoTrimmer;
