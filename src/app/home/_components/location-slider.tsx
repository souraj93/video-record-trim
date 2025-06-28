import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn'; // Used for looping functionality
import { Location } from './map-page'; // Import Location type from MapsPage
import Link from 'next/link';

interface InfiniteLocationSliderProps {
  locations: Location[];
  currentIndex: number;
  onLocationChange: (index: number) => void;
}

const InfiniteLocationSlider: React.FC<InfiniteLocationSliderProps> = ({
  locations,
  currentIndex,
  onLocationChange
}) => {
  const [[page, direction], setPage] = useState([currentIndex, 0]);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update page when currentIndex changes from parent
  useEffect(() => {
    if (page !== currentIndex) {
      setPage([currentIndex, page < currentIndex ? 1 : -1]);
    }
  }, [currentIndex, page]);

  // Make sure to get the wrapped index for the current page
  const locationIndex = wrap(0, locations.length, page);

  // Variants for the animation
  const variants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 5,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    left: {
      x: '-50%', // Show 50% of the card off-screen (leaving 50% visible)
      scale: 0.85,
      zIndex: 3,
      opacity: 0.7,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    right: {
      x: '50%', // Show 50% of the card off-screen (leaving 50% visible)
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

  // Function to determine which variant to use
  const getVariant = (i: number) => {
    if (i === locationIndex) return 'center';
    if (i === wrap(0, locations.length, locationIndex - 1)) return 'left';
    if (i === wrap(0, locations.length, locationIndex + 1)) return 'right';
    if (i === wrap(0, locations.length, locationIndex - 2)) return 'farLeft';
    if (i === wrap(0, locations.length, locationIndex + 2)) return 'farRight';
    return 'farLeft'; // Default positioning for other slides
  };

  // Handle page change and notify parent
  const handlePageChange = (newPage: number, newDirection: number) => {
    setPage([newPage, newDirection]);
    onLocationChange(wrap(0, locations.length, newPage));
  };

  return (
    <div className="fixed bottom-0 h-1/3 w-full overflow-hidden rounded-t-xl md:max-w-[375px]">
      <div className="flex h-full w-full items-center justify-center">
        <div ref={sliderRef} className="relative mx-auto h-full w-full">
          <AnimatePresence initial={false} custom={direction}>
            {locations.map((location, i) => (
              <motion.div
                key={location.id || i}
                custom={direction}
                variants={variants}
                initial={getVariant(i)}
                animate={getVariant(i)}
                exit={
                  i === locationIndex
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
                onDragEnd={(e, { offset, velocity }) => {
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
                    transform: i === locationIndex ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <Link href="/home/cities" className="block h-full">
                    <motion.img
                      src={location.image}
                      alt={location.name}
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3"
                      style={{ opacity: i === locationIndex ? 1 : 0.5 }}
                    >
                      <div className="flex flex-col items-center justify-center text-white">
                        <h2 className="text-lg font-bold">{location.name}</h2>
                        <p className="text-xs">{location.country}</p>
                        <div className="mt-1 flex items-center justify-center gap-2">
                          <p className="text-xs">{location.routes} routes</p>
                          <span className="">•</span>
                          <p className="text-xs ">{location.stories} stories</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InfiniteLocationSlider;
