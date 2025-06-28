'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RouteSlider from '../../_components/route-slider';
import { RouteMap } from '../../_components/route-map';
import { useRoute } from '@/hooks/route/use-route';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MobileHeader from '@/app/home/_components/mobile-header';

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

  console.log('routeDetails', routeDetails);

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
      <div className="p-4">
        <MobileHeader
            title={routeDetails?.languageDetails &&
              checkLanguageOrSetDefault(routeDetails?.languageDetails)?.name}
            variant="simple"
          />
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
          zoom={18}
          showCurrentLocation={true}
        />
      </div>
      {!isHidden ? (
        <>
          <div className="h-[40vh] overflow-auto absolute bg-white w-full" style={{
                  bottom: 0
                }}>
            <RouteSlider
              stops={routeStops}
              currentIndex={currentStopIndex}
              onStopChange={handleStopChange}
              noText={true}
            />

          <div className="flex-1 p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>
                    Stop {currentStopIndex + 1}: {currentStop.title}
                  </span>
                  <Image
                    src="/cross.svg"
                    alt={'cross'}
                    width={10}
                    height={10}
                    className="cursor-pointer"
                    onClick={swipeDownDetailsView}
                  />
                </h2>
                <p
                  className="mt-2 text-sm text-gray-600"
                  style={{
                    maxHeight: '150px',
                    overflow: 'auto'
                  }}
                  dangerouslySetInnerHTML={{ __html: currentStop.description }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4">
            <Button
              className="w-full bg-[#134C37] py-6 text-lg font-medium text-white"
              onClick={() =>
                router.push(`/home/cities/${currentStop.cityRef}/stories/${currentStop._id}`)
              }
            >
              View Complete Story
            </Button>
          </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
