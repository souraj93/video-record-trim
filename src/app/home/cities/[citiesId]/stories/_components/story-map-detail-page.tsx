'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense, useEffect, useState } from 'react';

import StoriesCarousel from '../_components/StoriesCarousel';
import AudioPlayer from '../_components/AudioPlayer';
import StoryDetails from '../_components/StoryDetails';
import Link from 'next/link';
import { ChevronLeft, Heart } from 'lucide-react';
import { useMarkFavouriteStory, useStory } from '@/hooks/story/use-story';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@/config/cookie-keys';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import MapWithMarker from '@/app/home/_components/mapbox-map-page';
import { AnimatePresence, motion } from 'framer-motion';

interface StoryDetailsPageProps {
  storyId: string;
  cityId: string;
}

export default function StoryDetailMapPage({
  storyId,
  cityId
}: StoryDetailsPageProps) {
  const { data: storyData } = useStory(storyId);
  const [center, setCenter] = useState({});

  useEffect(() => {
    if (storyData?.data && Object.keys(storyData?.data).length) {
      setCenter({
        lat: storyData.data.fullAddress.location.coordinates[1],
        lng: storyData.data.fullAddress.location.coordinates[0]
      });
    }
  }, [storyData]);

  return (
    <PageContainer scrollable>
      {/* {storyData?.data && Object.keys(storyData?.data).length ? */}
      <>
        <div className="relative h-[93vh] w-full">
          <MapWithMarker
            isBack={true}
            containerId={'map-story'}
            center={center}
            markerNotClickable={true}
            locations={[center]}
            currentStopIndex={0}
            zoom={12}
            showCurrentLocation={true}
          />
        </div>
        <div className="h-[7vh] flex-1 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={storyData?.data?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="flex justify-center text-lg font-semibold text-gray-900">
                <span>
                  {storyData?.data?.languageDetails &&
                    checkLanguageOrSetDefault(storyData?.data?.languageDetails)
                      ?.name}
                </span>
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </>
      {/* : null} */}
    </PageContainer>
  );
}
