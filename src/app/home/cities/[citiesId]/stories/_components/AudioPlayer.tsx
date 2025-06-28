'use client';

import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { UndoDot, RedoDot, Play, Pause } from 'lucide-react';

interface CustomAudioPlayerProps {
  src: string;
}

export default function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  return (
    <div className="w-full px-2">
      <div className="rounded-lg bg-white/80 backdrop-blur-sm">
        <AudioPlayer
          src={src}
          showSkipControls={false}
          showJumpControls={true}
          showFilledVolume={false}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION
          ]}
          progressJumpSteps={{ backward: 10000, forward: 10000 }}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
          autoPlayAfterSrcChange={false}
          layout="stacked"
          customIcons={{
            play: <Play className="h-6 w-6" fill="#fff" />,
            pause: <Pause className="h-6 w-6" fill="#fff" />,
            forward: <RedoDot className="h-6 w-6" />,
            rewind: <UndoDot className="h-6 w-6" />
          }}
          className="custom-audio-player"
          style={{
            background: 'transparent',
            boxShadow: 'none',
            width: '100%'
          }}
        />
      </div>

      <style jsx global>{`
        .custom-audio-player {
          --rhap-theme-color: #134c37;
          --rhap-bar-color: #e5e7eb;
          --rhap-time-color: #6b7280;
          --rhap-main-controls-color: #134c37;
          --rhap-font-family: inherit;
        }

        .custom-audio-player .rhap_container {
          padding: 0;
          background: transparent;
          box-shadow: none;
          min-width: auto;
        }

        .custom-audio-player .rhap_progress-section {
          padding: 0;
          margin-bottom: 0.5rem;
        }

        .custom-audio-player .rhap_progress-bar {
          height: 3px;
          border-radius: 1.5px;
        }

        .custom-audio-player .rhap_progress-filled {
          border-radius: 1.5px;
          background-color: #134c37;
        }

        .custom-audio-player .rhap_progress-indicator {
          width: 12px;
          height: 12px;
          margin-left: -6px;
          top: -4.5px;
          background: #134c37;
          box-shadow: 0 1px 2px rgba(19, 76, 55, 0.2);
          transition: transform 0.2s;
        }

        .custom-audio-player .rhap_progress-indicator:hover,
        .custom-audio-player .rhap_progress-indicator:active {
          transform: scale(1.2);
        }

        .custom-audio-player .rhap_controls-section {
          margin-top: 0;
          padding: 0;
          flex-wrap: nowrap;
          gap: 8px;
          justify-content: center;
          align-items: center;
        }

        .custom-audio-player .rhap_main-controls {
          flex: none;
          display: flex;
          justify-content: center;
          width: 100%;
          align-items: center;
          gap: 4px;
        }

        .custom-audio-player .rhap_main-controls-button[aria-label='Previous'],
        .custom-audio-player .rhap_main-controls-button[aria-label='Skip'] {
          width: 24px;
          height: 24px;
          margin: 0 8px;
          background: transparent;
          box-shadow: none;
          color: #134c37;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-audio-player
          .rhap_main-controls-button[aria-label='Previous']:hover,
        .custom-audio-player
          .rhap_main-controls-button[aria-label='Skip']:hover {
          transform: scale(1.1);
          background: transparent;
        }

        .custom-audio-player
          .rhap_main-controls-button:not([aria-label='Previous']):not(
            [aria-label='Skip']
          ) {
          width: 48px;
          height: 48px;
          margin: 0 12px;
          padding: 0;
          color: white;
          background: linear-gradient(90deg, #134c37 0%, #3f866b 100%);
          border-radius: 9999px;
          box-shadow: 0 2px 4px rgba(19, 76, 55, 0.25);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-audio-player
          .rhap_main-controls-button:not([aria-label='Previous']):not(
            [aria-label='Skip']
          ):hover,
        .custom-audio-player
          .rhap_main-controls-button:not([aria-label='Previous']):not(
            [aria-label='Skip']
          ):active {
          background: linear-gradient(90deg, #0f3c2c 0%, #071812 100%);
          transform: scale(1.05);
        }

        .custom-audio-player .rhap_volume-controls {
          flex: none;
          justify-content: flex-end;
          min-width: auto;
        }

        .custom-audio-player .rhap_volume-button {
          color: #059669;
          width: 20px;
          height: 20px;
          margin: 0;
        }

        .custom-audio-player .rhap_volume-container {
          margin: 0;
        }

        .custom-audio-player .rhap_volume-bar-area {
          margin: 0 4px;
          width: 40px;
        }

        .custom-audio-player .rhap_volume-bar {
          height: 3px;
          background: #e5e7eb;
        }

        .custom-audio-player .rhap_time {
          font-size: 0.675rem;
          font-weight: 500;
          color: #6b7280;
        }

        .custom-audio-player .rhap_volume-indicator {
          width: 6px;
          height: 6px;
          top: -1.5px;
          background: #059669;
          opacity: 1;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 320px) {
          .custom-audio-player .rhap_volume-controls {
            display: none;
          }

          .custom-audio-player .rhap_main-controls-button {
            width: 28px;
            height: 28px;
            margin: 0 6px;
          }
        }
      `}</style>
    </div>
  );
}
