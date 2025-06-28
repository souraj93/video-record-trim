'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { checkLanguageOrSetDefault, isLoggedIn } from '@/config/utilities';

const TrendingStories = ({ storyData, cityId, viewMoreHandleStory }: any) => {
  console.log('storyDatastoryData', storyData);
  const router = useRouter();
  const linkPush = (storiesId: string) => {
    isLoggedIn()
      ? router.push(`/home/cities/${cityId}/stories/${storiesId}`)
      : router.push(`/city/${cityId}/story/${storiesId}`);
  };
  const t = useTranslations();
  
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <motion.h2
          className="font-poppins text-lg font-semibold text-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {t('trendingStories')}
        </motion.h2>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: false
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {storyData?.map((story, index) => (
            <CarouselItem
              key={index}
              className="basis-2/5 pl-2 hover:cursor-pointer md:basis-1/3 md:pl-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="h-full"
                onClick={() => linkPush(story?._id)}
              >
                <Card className="h-full overflow-hidden rounded-lg border-none">
                  <div className="relative h-36 bg-gray-300">
                    <Image
                      src={story.images[0]}
                      alt={story.title}
                      fill
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-center font-poppins text-xs font-medium text-white">
                        {checkLanguageOrSetDefault(story.languageDetails).name}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
          {storyData && storyData.length && (
            <CarouselItem className="basis-2/5 pl-2 md:basis-1/3 md:pl-4 flex items-center">
              <div
                className="h-full w-full flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  className="flex items-center h-36 w-full capitalize border-primary bg-none font-medium text-green-800"
                  onClick={viewMoreHandleStory}
                  disabled={!storyData}
                >
                  {t('viewMore')}
                </Button>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TrendingStories;