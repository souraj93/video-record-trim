'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Route {
  id: string;
  title: string;
  distance: string;
  length: string;
  image: string;
}

interface RouteCardProps {
  route: Route;
  index: number;
}

const RouteCard = ({ route, index }: RouteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Link href={`/home/routes/navigate`}>
        <Card className="overflow-hidden rounded-lg border-0 shadow-md">
          <div className="relative h-48">
            <Image
              src={route.image}
              alt={route.title}
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-white">
                  {route.title}
                </h3>
                <p className="text-sm text-white/80">
                  {route.distance} • {route.length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default RouteCard;
