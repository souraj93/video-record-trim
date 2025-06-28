'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';
import Image from 'next/image';

interface RouteStop {
  id: string;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

interface RouteSliderProps {
  stops: RouteStop[];
  currentIndex: number;
  onStopChange: (index: number) => void;
  hideStop?: boolean;
}

const RouteSlider: React.FC<RouteSliderProps> = ({
  stops,
  currentIndex,
  onStopChange,
  hideStop,
  noText
}) => {
  const [[page, direction], setPage] = useState([currentIndex, 0]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (page !== currentIndex) {
      setPage([currentIndex, page < currentIndex ? 1 : -1]);
    }
  }, [currentIndex, page]);

  const stopIndex = wrap(0, stops.length, page);

  const variants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 5,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    left: {
      x: '-50%',
      scale: 0.85,
      zIndex: 3,
      opacity: 0.7,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    right: {
      x: '50%',
      scale: 0.85,
      zIndex: 3,
      opacity: 0.7,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    farLeft: {
      x: '-125%',
      scale: 0.85,
      zIndex: 2,
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    farRight: {
      x: '125%',
      scale: 0.85,
      zIndex: 2,
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const getVariant = (i: number) => {
    if (i === stopIndex) return 'center';
    if (i === wrap(0, stops.length, stopIndex - 1)) return 'left';
    if (i === wrap(0, stops.length, stopIndex + 1)) return 'right';
    if (i === wrap(0, stops.length, stopIndex - 2)) return 'farLeft';
    if (i === wrap(0, stops.length, stopIndex + 2)) return 'farRight';
    return 'farLeft';
  };

  const handlePageChange = (newPage: number, newDirection: number) => {
    setPage([newPage, newDirection]);
    onStopChange(wrap(0, stops.length, newPage));
  };

  return (
    <div className="h-48 w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center">
        <div ref={sliderRef} className="relative mx-auto h-full w-full">
          <AnimatePresence initial={false} custom={direction}>
            {stops.map((stop, i) => (
              <motion.div
                key={stop.id}
                custom={direction}
                variants={variants}
                initial={getVariant(i)}
                animate={getVariant(i)}
                exit={
                  i === stopIndex
                    ? direction > 0
                      ? 'left'
                      : 'right'
                    : 'farLeft'
                }
                className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute'
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  const swipe = Math.abs(offset.x) > 50;
                  if (swipe) {
                    const direction = offset.x < 0 ? 1 : -1;
                    handlePageChange(page + direction, direction);
                  }
                }}
              >
                <motion.div
                  className="relative h-4/5 overflow-hidden rounded-lg shadow-xl"
                  style={{
                    width: '50%',
                    borderRadius: '12px',
                    transform: i === stopIndex ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <div className="relative h-full">
                    {!stop.image ? 
                      <Image
                        alt={stop.title}
                        src="/roods-logo.png"
                        width={100}
                        height={100}
                        className="drop-shadow-md mx-auto"
                      /> :
                    <Image
                      src={stop.image}
                      alt={stop.title}
                      fill
                      className="object-cover"
                    />}
                    {!noText ?
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3"
                      style={{ opacity: i === stopIndex ? 1 : 0.5 }}
                    >
                      <h2 className="text-lg font-bold text-white">
                        {stop.title}
                      </h2>
                      {!hideStop ? (
                        <p className="mt-1 text-sm text-white/80">
                          Stop {i + 1}
                        </p>
                      ) : null}
                    </motion.div> : null}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RouteSlider;
