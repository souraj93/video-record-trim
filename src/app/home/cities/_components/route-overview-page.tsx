'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RouteSlider from '@/app/home/routes/_components/route-slider';
import { RouteMap } from '@/app/home/routes/_components/route-map';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import MobileHeader from '@/app/home/_components/mobile-header';
import ArticleCard from '@/app/home/cities/_components/article-card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StoryReference {
  _id: string;
  fullAddress: string;
  uniqueId: string;
  images: any[];
  languageDetails: any;
  status: string;
}

interface CreateRoutePreviewPageProps {
  cityId: string;
}

export default function CreateRoutePreviewDetailPage({
  cityId
}: CreateRoutePreviewPageProps) {
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isStoryHidden, hideStoryDetails] = useState(true);
  

  useEffect(() => {
    // Get storyRefs from localStorage (it was saved there during navigation)
    const storyRefsFromStorage = localStorage.getItem('storyRefs');

    if (storyRefsFromStorage) {
      try {
        const storyRefs = JSON.parse(storyRefsFromStorage) as StoryReference[];

        if (storyRefs.length) {
          setRouteStops(
            storyRefs.map((story: any, index: number) => ({
              _id: story._id,
              id: `stop-${index + 1}`,
              cityRef: story.cityRef,
              title: checkLanguageOrSetDefault(story.languageDetails)?.name,
              description: checkLanguageOrSetDefault(story.languageDetails)
                ?.description,
              languageDetails: story.languageDetails,
              image: story.images[0],
              lat: story.fullAddress.location.coordinates[1],
              lng: story.fullAddress.location.coordinates[0]
            }))
          );
        }
      } catch (error) {
        console.error('Error parsing storyRefs from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('routeStops', routeStops);
  }, [routeStops]);

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const currentStop = routeStops.length ? routeStops[currentStopIndex] : {};

  const handleStopChange = (index: number) => {
    setCurrentStopIndex(index);
  };

  const handleRemoveStop = (stopId: string) => {
    const updatedStops = routeStops.filter((stop) => stop.id !== stopId);
    setRouteStops(updatedStops);

    // Also update localStorage
    const storyRefsFromStorage = localStorage.getItem('storyRefs');
    if (storyRefsFromStorage) {
      try {
        const storyRefs = JSON.parse(storyRefsFromStorage) as StoryReference[];
        const updatedStoryRefs = storyRefs.filter(
          (story) => story._id !== stopId
        );
        localStorage.setItem('storyRefs', JSON.stringify(updatedStoryRefs));
      } catch (error) {
        console.error('Error updating storyRefs in localStorage:', error);
      }
    }

    // Reset current index if needed
    if (currentStopIndex >= updatedStops.length) {
      setCurrentStopIndex(Math.max(0, updatedStops.length - 1));
    }
  };

  const handleStartRoute = () => {
    // Save the route or navigate to the route navigation page
    // This would depend on your app's flow
    router.push(`/home/cities/${cityId}/routes/create/save`);
  };

  const handleSaveRoute = () => {
    router.push(`/home/cities/${cityId}/routes/create/save`);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="p-4">
        <MobileHeader
          title="Overview"
          backHref={`/home/cities/${cityId}/routes/create`}
          variant="simple"
          rightButton={
            <>
              <Button
                className="text-md font-bold text-main"
                variant="ghost"
                onClick={handleSaveRoute}
              >
                Save
              </Button>
            </>
          }
        />
      </div>
      <div className={`relative h-[100vh] w-full`}>
        {routeStops.length > 0 && (
          <RouteMap
            markers={routeStops.map((point, index) => ({
              id: point.id,
              coordinates: [point.lng, point.lat],
              label: `${index + 1}. ${point.title}`,
              index
            }))}
            currentStopIndex={currentStopIndex}
            setCurrentStopIndex={setCurrentStopIndex}
            hideDetails={hideStoryDetails}
            zoom={18}
          />
        )}
      </div>
      {!isStoryHidden ? routeStops.length > 0 ? (
        <>
          <div className="h-[50vh] overflow-auto absolute bg-white w-full" style={{
                  bottom: 0
                }}>
            <RouteSlider
              stops={routeStops}
              currentIndex={currentStopIndex}
              onStopChange={handleStopChange}
              noText={true}
            />
            <ScrollArea className="flex h-[30vh] flex-col gap-4 p-4">
          <div>
              <h2 className="flex justify-between text-lg font-bold text-main">
                <span>
                  Stop {currentStopIndex + 1}: {currentStop.title}
                </span>
                <Image
                  src="/cross.svg"
                  alt={'cross'}
                  width={10}
                  height={10}
                  className="cursor-pointer"
                  onClick={() => hideStoryDetails(true)}
                />
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {currentStop.description}
              </p>
            </div>
            {routeStops.map((story) => (
              <ArticleCard
                key={story._id}
                data={{
                  ...story,
                  images: Array.isArray(story.image)
                    ? story.image
                    : [story.image]
                }}
                onClickFunc={() =>
                  router.push(
                    `/home/cities/${
                      typeof story?.cityRef === 'string'
                        ? story?.cityRef
                        : story?.cityRef?._id
                    }/stories/${story._id}`
                  )
                }
              />
            ))}
          </ScrollArea>

          <div className="p-4">
            <Button
              className="w-full bg-[#134C37] py-3 text-lg font-medium text-white"
              onClick={handleStartRoute}
            >
              Save
            </Button>
          </div>
          </div>
          
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <p className="text-lg font-medium text-gray-700">
            No stories selected for this route
          </p>
          <Button
            className="mt-4 bg-[#134C37] py-4 text-white"
            onClick={() => router.push(`/home/cities/${cityId}/routes/create`)}
          >
            Add Stories
          </Button>
        </div>
       ) : null}
    </div>
  );
}
