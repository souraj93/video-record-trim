import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function ImageCropper({ onCrop, capturedImage }) {
  const cropperRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);

  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setCroppedImageURL(url);
        onCrop && onCrop(blob); // Pass blob to parent if needed
      }, 'image/jpeg');
    }
  };

  return (
    <div className='h-screen'>
      {/* <input type="file" accept="image/*" onChange={onImageChange} /> */}
      {capturedImage && !croppedImageURL && (
        <>
          <Cropper
            src={capturedImage}
            // style={{ height: 400, width: '100%' }}
            // initialAspectRatio={1}
            guides={true}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
            background={false}
            responsive={true}
            initialAspectRatio={NaN}
            autoCropArea={1}
            checkOrientation={false}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            // aspectRatio={1}
          />
          <button onClick={cropImage} className="absolute right-2 top-2 z-50 bg-white p-2 text-black rounded-lg" style={{ top: 10, right: 10 }}>
            ✂️
          </button>
        </>
      )}
      {croppedImageURL && (
        <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <h2 className='text-center mb-4 absolute top-0 left-1/3'>Cropped Image</h2>
          <img
            src={croppedImageURL}
            alt="Cropped"
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
