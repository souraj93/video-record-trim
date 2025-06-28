"use client";
import { useState } from 'react';
import WebcamRecorder from '../components/WebcamRecorder';
import VideoTrimmer from '../components/VideoTrimmer';

export default function Home() {
  const [recordedBlob, setRecordedBlob] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎥 Record & ✂️ Trim Video</h1>
      <WebcamRecorder onRecorded={setRecordedBlob} />
      {recordedBlob && <VideoTrimmer videoBlob={recordedBlob} />}
    </div>
  );
}
