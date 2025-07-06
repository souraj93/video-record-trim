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
  const [finalDuration, setDuration] = useState(0);

  return (
    <div className='relative'>
      {!videoTrimmed && !videoMerged ?
        <WebcamRecorder
          onRecorded={setRecordedBlob}
          clickTrim={clickTrim}
          displayTrim={displayTrim}
          displayMusic={displayMusic}
          clickMusic={clickMusic}
          getDuration={setDuration}
        /> : null}
      {recordedBlob && <VideoTrimmer
        finalDuration={finalDuration}
        videoBlob={recordedBlob}
        trimVideoState={trimVideo}
        mergeVideoState={mergeVideo}
        displayMusic={displayMusic}
        clickMusic={clickMusic}
        displayTrim={displayTrim}
        clickTrim={clickTrim}
        setDuration={setDuration}
      />}
    </div>
  );
}
