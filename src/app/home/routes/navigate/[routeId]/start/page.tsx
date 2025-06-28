'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RouteMap } from '../../../_components/route-map';
import { useRoute } from '@/hooks/route/use-route';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import { useRouter } from 'next/navigation';

type Props = {
  params: {
    routeId: string;
  };
};

export default function NavigatePage({ params }: Props) {
  const { data: routeData } = useRoute(params?.routeId); // 67ff78e67eccc47006136567
  const routeDetails = routeData?.data || {};
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const [isHidden, hideDetails] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (routeDetails.storyRefs && routeDetails.storyRefs.length) {
      setRouteStops(
        routeDetails.storyRefs.map((story: any, index: number) => ({
          _id: story._id,
          id: `stop-${index + 1}`,
          title: checkLanguageOrSetDefault(story.languageDetails)?.name,
          description: checkLanguageOrSetDefault(story.languageDetails)
            ?.description,
          image: story.images[0],
          lat: story.fullAddress.location.coordinates[1],
          lng: story.fullAddress.location.coordinates[0],
          cityRef: routeDetails.cityRef?._id
        }))
      );
    }
  }, [routeDetails]);

  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const currentStop = routeStops.length ? routeStops[currentStopIndex] : {};

  const handleStopChange = (index: number) => {
    setCurrentStopIndex(index);
  };

  const swipeDownDetailsView = () => {
    hideDetails(true);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-16">
          <Button
            onClick={() => router.back()}
            className="rounded-full bg-gray-300 p-3"
          >
            <ChevronLeft size={30} color="#fff" />
          </Button>
          <h1 className="w-[calc(100%-50px)] text-center text-xl font-bold text-[#134C37]">
            {routeDetails?.languageDetails &&
              checkLanguageOrSetDefault(routeDetails?.languageDetails)?.name}
          </h1>
        </div>
      </div>

      <div className={`relative h-[100vh] w-full`}>
        <RouteMap
          markers={routeStops.map((point, index) => ({
            id: point.id,
            coordinates: [point.lng, point.lat],
            label: `${index + 1}. ${point.title}`,
            index
          }))}
          currentStopIndex={currentStopIndex}
          setCurrentStopIndex={setCurrentStopIndex}
          hideDetails={hideDetails}
          showCurrentLocation={true}
          zoom={18}
        />
      </div>

      <div className="h-[20vh] flex-1 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {isHidden ? (
              <h2 className="flex justify-between text-lg font-semibold text-gray-900">
                Please click on icon to view details.
              </h2>
            ) : (
              <h2 className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Stop {currentStopIndex + 1}: {currentStop.title}</span>
                <Button
                  onClick={() =>
                    router.push(
                      `/home/cities/${currentStop.cityRef}/stories/${currentStop._id}`
                    )
                  }
                  className="rounded-full bg-primary p-2 h-auto"
                >
                  <ChevronRight size={30} color="#fff" />
                </Button>
              </h2>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
