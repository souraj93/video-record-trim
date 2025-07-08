import React, { useState, useRef, useEffect } from 'react';
import { trimVideo, mergeMedia } from './ffmpegUtils';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const VideoTrimmer = ({ videoBlob, trimVideoState, displayMusic, clickMusic, clickTrim, displayTrim, mergeVideoState, finalDuration, setDuration }) => {
  const [start, setStart] = useState(0);
  const videoRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [range, setRange] = useState([0, finalDuration || 5]); // initial [start, end]

  const handleChange = (val) => {
    setRange(val);
  };

  console.log(range,finalDuration)

  useEffect(() => {
    setRange([start, finalDuration || 5]);
  }, [start, finalDuration]);

  const [preview, setPreview] = useState(null);

  const [finalVideo, setFinalVideo] = useState(null);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleTrim = async () => {
    
    const resultURL = await trimVideo(finalVideo ? finalVideo.blob : videoBlob, range[0], range[1]);
    setFinalVideo({
      url: URL.createObjectURL(finalVideo ? finalVideo.blob : videoBlob),
      blob: finalVideo ? finalVideo.blob : videoBlob
    });
    // captureThumbnail(resultURL.blob);

    setPreview(resultURL);
    trimVideoState(true);
  };

  const finalizeTrim = () => {
    setFinalVideo(preview);
    setPreview(null);
    if (displayTrim) {
      setStart(range[0]);
      setDuration(range[1]);
    }
    clickTrim(false);
    clickMusic(false);
  };

  // const captureThumbnail = (blob) => {
  //   const video = document.createElement('video');
  //   video.src = URL.createObjectURL(blob);
  //   video.currentTime = 0;

  //   video.onloadeddata = () => {
  //     const canvas = document.createElement('canvas');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.getContext('2d').drawImage(video, 0, 0);

  //     const thumbnail = canvas.toDataURL('image/png');
  //     setThumbnail(thumbnail);
  //   };
  // };

  const merge = async () => {
    if (!audioFile) {
      alert("Please select an audio file to merge with the video.");
      return;
    }
    
    const resultURL = await mergeMedia(finalVideo ? finalVideo.blob : videoBlob, audioFile);
    setFinalVideo({
      url: URL.createObjectURL(finalVideo ? finalVideo.blob : videoBlob),
      blob: finalVideo ? finalVideo.blob : videoBlob
    });
    mergeVideoState(true);
    setPreview(resultURL);
    setAudioFile(null);
    inputRef.current.value = "";
  };

  if (preview) {
    return (
      <div className='text-black relative'>
        <h2 className='text-center absolute top-0 left-0 w-full'>Preview</h2>
        <video src={preview.url} controls width="400" className='h-screen object-cover w-full' ref={videoRef} />
        <button onClick={() => {
          setPreview(null);
        }} className="ml-2 bg-white p-2 text-white rounded-full absolute left-4 top-2" style={{ marginTop: 10 }}>
          ❌
        </button>
        <button onClick={finalizeTrim} className="bg-white p-2 text-white rounded-full absolute right-4 top-2" style={{ marginTop: 10 }}>
          ✔️
        </button>
      </div>
    );
  }

  return (
    <div className='text-black'>
      <div className='relative'>

        {finalVideo &&
          <><h2 className='text-center absolute top-0 left-0 w-full'>Final</h2>
            <video src={finalVideo.url} controls className='h-screen object-cover' ref={videoRef}
            />
            {!displayTrim && !displayMusic ?
              <>
                <div className='absolute right-0 py-2 top-0' style={{ marginRight: "45px" }}>
                  <button className="bg-primary rounded-full p-2" onClick={() => clickMusic(true)}>🎬</button>
                </div>

                <div className='absolute right-0 py-2 top-0'>
                  <button className="bg-primary rounded-full p-2" onClick={() => clickTrim(true)}>✂️</button>
                </div>
              </> : null}
          </>}
      </div>


      {displayTrim ? <>
        <div className='absolute w-full' style={{ bottom: '15px', padding: '0 20px' }}>
          <Slider
            range
            min={start || 0}
            max={finalDuration || 5}
            value={range}
            onChange={handleChange}
            allowCross={false}
            trackStyle={[{ backgroundColor: '#0d6efd' }]}
            handleStyle={[
              { borderColor: '#0d6efd', backgroundColor: '#fff' },
              { borderColor: '#0d6efd', backgroundColor: '#fff' },
            ]}
          />

        </div>
        <div className='absolute w-full z-50' style={{ bottom: '40px', padding: '10px 20px', backgroundColor: '#000' }}>
          <span className='text-sm text-gray-500'>Trim from {range[0]}s to {range[1]}s</span>
        </div>
        <>
          
          <button onClick={handleTrim} className="bg-white p-2 text-white rounded-full absolute right-4 top-2" style={{ marginTop: 10 }}>
            ✔️
          </button>
          <button onClick={() => {
            clickTrim(false);
            // setPreview(null);
          }} className="ml-2 bg-white p-2 text-white rounded-full absolute left-4 top-2" style={{ marginTop: 10 }}>
            ❌
          </button>
        </>


      </> : null
      }
      {displayMusic ?
        <>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            style={{ display: 'none' }}
            ref={inputRef}
          />

          {/* Upload Icon Button */}
          {!audioFile ?
            <><button onClick={handleClick} className='absolute right-4 top-4 bg-primary rounded-full p-2'>
              {/* SVG Upload Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3l4 4h-3v7h-2V7H8l4-4zm-6 14h12v2H6v-2z" />
              </svg>
            </button>
              <button onClick={() => {
                clickMusic(false);
                // setPreview(null);
              }} className="ml-2 bg-white p-2 text-white rounded-full absolute left-4 top-2" style={{ marginTop: 10 }}>
                ❌
              </button>
            </> :
            <>
              <button onClick={merge} className="bg-white p-2 text-white rounded-full absolute right-4 top-2" style={{ marginTop: 10 }}>
                ✔️
              </button>
              <button onClick={() => {
                setAudioFile(null);
                inputRef.current.value = "";
              }} className="ml-2 bg-white p-2 text-white rounded-full absolute left-4 top-2" style={{ marginTop: 10 }}>
                ❌
              </button>
            </>
          }
        </> : null}
    </div>
  );
};

export default VideoTrimmer;
