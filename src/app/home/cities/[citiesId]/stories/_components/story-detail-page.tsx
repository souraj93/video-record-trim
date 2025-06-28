'use client';

import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense, useEffect, useState } from 'react';

import StoriesCarousel from '../_components/StoriesCarousel';
import AudioPlayer from '../_components/AudioPlayer';
import StoryDetails from '../_components/StoryDetails';
import Link from 'next/link';
import { ChevronLeft, CircleAlert, Heart } from 'lucide-react';
import { useMarkFavouriteStory, useStory } from '@/hooks/story/use-story';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@/config/cookie-keys';
import { checkLanguageOrSetDefault, isLoggedIn } from '@/config/utilities';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StoryDetailsPageProps {
  storyId: string;
  cityId: string;
}

export default function StoryDetailPage({
  storyId,
  cityId
}: StoryDetailsPageProps) {
  const [isButtonDisplayed, setButtonDisplay] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { data: storyData, isPending } = useStory(storyId);

  const { mutate: markFavourite, isPending: isMarkFavouritePending } =
    useMarkFavouriteStory(storyId, storyData, currentUserId);

  useEffect(() => {
    const authToken = Cookies.get(AUTH_TOKEN);
    if (authToken) {
      setCurrentUserId(JSON.parse(authToken).user._id);
    }
    isLoggedIn() ? setButtonDisplay(true) : setButtonDisplay(false);
  }, []);

  const isCurrentlyFavorited =
    storyData?.data?.savedByRefs?.includes(currentUserId);

  const handleFavouriteClick = () => {
    markFavourite({ isSaved: !isCurrentlyFavorited });
  };

  return (
    <PageContainer scrollable>
      <div className="">
        <div className="relative w-full">
          {storyData?.data.images.length ? (
            <StoriesCarousel
              backButtonShow={true}
              backButtonHref={
                isButtonDisplayed ? `/home/cities/${cityId}` : `/city/${cityId}`
              }
              storiesData={{
                images: storyData?.data.images.map((img, ind) => {
                  return {
                    image: img,
                    title: `Route Image ${ind + 1}`,
                    alt: `Route Image ${ind + 1} - Description`
                  };
                })
              }}
            />
          ) : null}
          {isButtonDisplayed ? (
            <div className="absolute -bottom-2 left-0 right-0 z-50 flex justify-center">
              <button
                className="flex items-center justify-center rounded-full bg-white p-2"
                onClick={handleFavouriteClick}
                disabled={isPending}
              >
                <Heart
                  size={16}
                  color={isCurrentlyFavorited ? '#AD5C44' : '#AD5C44'}
                  fill={isCurrentlyFavorited ? '#AD5C44' : 'transparent'}
                />
              </button>
            </div>
          ) : null}
        </div>
        <div>
          <h1 className="relative mb-2 mt-6 text-center text-3xl font-extrabold text-main">
            {checkLanguageOrSetDefault(storyData?.data.languageDetails).name}
            {storyData?.data?.storySource?.source ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="absolute flex items-center justify-center"
                    style={{
                      right: '20px',
                      bottom: '5px'
                    }}
                  >
                    <CircleAlert className={cn('size-4')} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{storyData?.data?.storySource?.source}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </h1>
        </div>
        <div className="">
          {checkLanguageOrSetDefault(storyData?.data.languageDetails)
            .audioSegment ? (
            <AudioPlayer
              src={
                checkLanguageOrSetDefault(storyData?.data.languageDetails)
                  .audioSegment || ''
              }
            />
          ) : null}
          <div className="px-4 md:px-6">
            <StoryDetails
              // title={storiesData.title}
              // category={storiesData.category}
              description={
                checkLanguageOrSetDefault(storyData?.data.languageDetails)
                  .fullDescription
              }
              storyId={storyId}
              cityId={cityId}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
