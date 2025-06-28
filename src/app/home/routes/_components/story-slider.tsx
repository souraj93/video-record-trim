'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  lat?: number;
  lng?: number;
}

interface StorySliderProps {
  story: Story;
  onClose: () => void;
}

const StorySlider: React.FC<StorySliderProps> = ({ story, onClose }) => {
  const [sliderState, setSliderState] = useState<'peek' | 'half' | 'full'>(
    'peek'
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);

  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  const positions = {
    peek: windowHeight - 150,
    half: windowHeight - windowHeight * 0.5,
    full: windowHeight - windowHeight * 0.85
  };

  const getCurrentPosition = () => {
    return positions[sliderState];
  };

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const currentY = info.point.y;
    const dragDistance = currentY - dragStartY.current;

    if (dragDistance > 50) {
      if (sliderState === 'full') setSliderState('half');
      else if (sliderState === 'half') setSliderState('peek');
      else if (sliderState === 'peek') onClose();
    } else if (dragDistance < -50) {
      if (sliderState === 'peek') setSliderState('half');
      else if (sliderState === 'half') setSliderState('full');
    } else {
    }
  };

  const onDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    dragStartY.current = info.point.y;
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={sliderRef}
        className="fixed inset-x-0 z-50 w-full overflow-hidden rounded-t-[20px] bg-white shadow-lg"
        initial={{ y: windowHeight }}
        animate={{ y: getCurrentPosition() }}
        exit={{ y: windowHeight }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        drag="y"
        dragConstraints={{ top: positions.full, bottom: windowHeight }}
        dragElastic={0.2}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={{ height: windowHeight }}
      >
        <div className="flex h-7 w-full items-center justify-center rounded-t-[20px] bg-white">
          <div className="h-1 w-16 rounded-full bg-gray-300"></div>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover "
                  fill
                />
              </div>
              <div>
                <h3 className="font-bold text-[#134C37]">{story.title}</h3>
                <div className="flex gap-2">
                  {story.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[#134C37]/10 px-2 py-0.5 text-xs text-[#134C37]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <Image
                src={story.image}
                alt={story.title}
                className="h-48 w-full object-cover"
                fill
              />
            </div>

            <div className="mb-4">
              <h2 className="mb-3 text-xl font-bold text-[#134C37]">
                {story.title}
              </h2>
              <p className="text-gray-700">{story.description}</p>
            </div>

            <Button className="mt-4 w-full bg-[#134C37] py-5 text-white">
              Listen to this story
            </Button>

            <motion.div
              className="mt-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{
                opacity: sliderState === 'full' ? 1 : 0,
                height: sliderState === 'full' ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-bold text-[#134C37]">
                  Location Details
                </h3>
                <p className="text-sm text-gray-700">
                  This story is located in the heart of Amsterdam, where history
                  and modernity intertwine.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-bold text-[#134C37]">
                  Related Stories
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 rounded-lg bg-white p-2 shadow-sm"
                    >
                      <div className="relative h-20 w-32 overflow-hidden rounded-lg">
                        <Image
                          src={story.image}
                          alt="Related story"
                          className="h-full w-full object-cover"
                          fill
                        />
                      </div>
                      <p className="mt-2 text-xs font-medium">
                        Related Story {i}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="h-16"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StorySlider;
