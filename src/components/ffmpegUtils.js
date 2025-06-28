import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export const ffmpeg = createFFmpeg({ log: true });

export const trimVideo = async (file, start, duration) => {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  ffmpeg.FS('writeFile', 'input.webm', await fetchFile(file));

  await ffmpeg.run(
    '-ss', `${start}`,
    '-t', `${duration}`,
    '-i', 'input.webm',
    '-c', 'copy',
    'output.mp4'
  );

  const data = ffmpeg.FS('readFile', 'output.mp4');
  return {
    blob: new Blob([data.buffer], { type: 'video/mp4' }),
    url: URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })),
  };
};

export const mergeMedia = async (videoFile, audioFile) => {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  console.log(videoFile, audioFile)

  ffmpeg.FS('writeFile', 'input.webm', await fetchFile(videoFile));
  ffmpeg.FS('writeFile', 'music.mp3', await fetchFile(audioFile));

  // await ffmpeg.run(
  //   '-i', 'input.webm',     // input video
  //   '-i', 'music.mp3',      // background music
  //   '-c:v', 'copy',         // copy video codec
  //   '-c:a', 'aac',          // re-encode audio
  //   '-map', '0:v:0',        // use video from input 0
  //   '-map', '1:a:0',        // use audio from input 1
  //   'merged.mp4'
  // );

  await ffmpeg.run(
    '-i', 'input.webm',
    '-i', 'music.mp3',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-shortest',
    '-map', '0:v:0',
    '-map', '1:a:0',
    'output.mp4'
  );

  const data = ffmpeg.FS('readFile', 'output.mp4');
  return {
    blob: new Blob([data.buffer], { type: 'video/mp4' }),
    url: URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })),
  };
};
