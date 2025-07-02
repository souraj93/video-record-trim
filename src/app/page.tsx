"use client";
import { useState } from 'react';
import WebcamRecorder from '../components/WebcamRecorder';
import VideoTrimmer from '../components/VideoTrimmer';

export default function Home() {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [displayTrim, clickTrim] = useState(false);
  const [videoTrimmed, trimVideo] = useState(false);
  const [videoMerged, mergeVideo] = useState(false);
  const [displayMusic, clickMusic] = useState(false);

  return (
    <div>
      {!videoTrimmed && !videoMerged ?
      <WebcamRecorder 
      onRecorded={setRecordedBlob} 
      clickTrim={clickTrim} 
      displayTrim={displayTrim} 
      displayMusic={displayMusic}
      clickMusic={clickMusic}
      /> : null}
      {recordedBlob && (displayTrim || displayMusic) && <VideoTrimmer 
        videoBlob={recordedBlob} 
        trimVideoState={trimVideo} 
        mergeVideoState={mergeVideo}
        displayMusic={displayMusic}
        clickMusic={clickMusic} 
        displayTrim={displayTrim}
        clickTrim={clickTrim}
      />}
    </div>
  );
}
