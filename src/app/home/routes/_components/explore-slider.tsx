'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExploreLocation {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ExploreSliderProps {
  item: ExploreLocation;
}

const ExploreSlider: React.FC<ExploreSliderProps> = ({ item }) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          className="relative mx-auto h-full w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative h-4/5 overflow-hidden rounded-lg shadow-xl">
            <div className="relative h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreSlider;
