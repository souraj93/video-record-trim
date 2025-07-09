"use client";
import { useState } from 'react';
import WebcamRecorder from '../components/WebcamRecorder';
import VideoTrimmer from '../components/VideoTrimmer';
import ImageCropper from '../components/ImageCropper';

export default function Home() {
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [displayTrim, clickTrim] = useState(false);
  const [displayCrop, clickCrop] = useState(false);
  const [videoTrimmed, trimVideo] = useState(false);
  const [imageCropped, cropImage] = useState(false);
  const [videoMerged, mergeVideo] = useState(false);
  const [displayMusic, clickMusic] = useState(false);
  const [finalDuration, setDuration] = useState(0);

  return (
    <div className='relative'>
      {!videoTrimmed && !videoMerged && !imageCropped && !displayCrop?
        <WebcamRecorder
          onRecorded={setRecordedBlob}
          clickTrim={clickTrim}
          displayTrim={displayTrim}
          displayMusic={displayMusic}
          clickMusic={clickMusic}
          getDuration={setDuration}
          clickCrop={clickCrop}
          displayCrop={displayCrop}
          setCapturedImage={setCapturedImage}
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
      {capturedImage && displayCrop && <ImageCropper onCrop={(blob) => {cropImage(true);}} capturedImage={capturedImage} />}
    </div>
  );
}
