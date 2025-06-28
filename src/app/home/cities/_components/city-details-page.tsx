'use client';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import TrendingStories from './trending-stories';
import FavouriteRoutes from './favourite-routes';
import MobileBottomNav from '@/components/layout/mobile-nav';
import Link from 'next/link';

import MobileHeader from '../../_components/mobile-header';
import { useCity } from '@/hooks/city/use-city';
import { AUTH_TOKEN, CITY_ID } from '@/config/cookie-keys';
import Cookies from 'js-cookie';
import { useCityStore } from '@/lib/store/useCityStore';
import { useStories, useStory } from '@/hooks/story/use-story';
import { useGetRouteList } from '@/hooks/route/use-route';
import { isLoggedIn } from '@/config/utilities';
import { useTranslations } from 'next-intl';

const categories = [
  { id: 'general', name: 'General', iconPath: '/icons/generalIcon.png' },
  { id: 'donate', name: 'Donate', iconPath: '/icons/donateIconWhite.png' },
  { id: 'history', name: 'History', iconPath: '/icons/historyIcon.png' },
  {
    id: 'transport',
    name: 'Transport',
    iconPath: '/icons/transportIcon.png'
  },
  { id: 'eat', name: 'Eat', iconPath: '/icons/dinnerIcon.png' },
  { id: 'activities', name: 'Activities', iconPath: '/icons/sleepIcon.png' }
];

interface CityDetailsPageProps {
  cityId: string;
}

export default function CityDetailsPage({ cityId }: CityDetailsPageProps) {
  const [routeSkip, setRouteSkip] = useState(0);
  const [storySkip, setStorySkip] = useState(0);
  const router = useRouter();

  const [userName, setUserName] = useState('');

  const { data: cityData, isLoading: isCityLoading } = useCity(cityId);

  const t = useTranslations();

  const storyFilters = {
    isNewStory: true,
    cityRef: cityId
  };

  const routeFilters = {
    isRecommended: true,
    cityRef: cityId
  };

  const { data: storyData, isLoading: isStoryLoading } = useStories({
    filters: storyFilters, skip: storySkip,
    limit: 10
  });
  const { data: routeData, isLoading: isRouteLoading } = useGetRouteList({
    filters: routeFilters,
    skip: routeSkip,
    limit: 10
  });

  const [stories, setStories] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (cityData?.data._id) {
      Cookies.set(CITY_ID, cityData.data._id);
    }
  }, [cityData?.data._id]);

  useEffect(() => {
    const authToken = Cookies.get(AUTH_TOKEN);
    if (authToken) {
      setUserName(JSON.parse(authToken).user.personalInfo.firstName);
    }
  }, []);

  useEffect(() => {
    if (storyData?.data?.data) {
      setStories([
        ...stories,
        ...storyData.data.data
      ]);
    }
  }, [storyData]);

  useEffect(() => {
    if (routeData?.data?.data) {
      setRoutes([
        ...routes,
        ...routeData.data.data
      ]);
    }
  }, [routeData]);

  const linkPush = (categoryId: string) => {
    isLoggedIn()
      ? router.push(`/home/cities/${cityId}/category/${categoryId}`)
      : router.push(`/city/${cityId}/category/${categoryId}`);
  };

  const viewMoreHandleRoute = () => {
    if (routeData && routes?.length < routeData.data.total) {
      const newSkip = routeSkip + 10;
      setRouteSkip(newSkip);
    } else {
      router.push(`/home/cities/${cityId}/explore?tab=routes`);
    }
  };
  const viewMoreHandleStory = () => {
    if (storyData && stories?.length < storyData?.data?.total) {
      const newSkip = storySkip + 10;
      setStorySkip(newSkip);
    } else {
      router.push(`/home/cities/${cityId}/explore`);
    }
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <div className="flex w-full flex-col p-4">
        <MobileHeader
          title={cityData?.data.city}
          backHref="/home"
          variant="simple"
          useHref={true}
        />

        <section className="relative mt-8">
          <h1 className="text-2xl font-bold text-main">
            {t('hello')}, {userName}
          </h1>
        </section>

        <section className="mt-8">
          <div className="w-full overflow-hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
                dragFree: false
              }}
            >
              <CarouselContent className="flex-nowrap">
                {categories.map((category, index) => (
                  <CarouselItem
                    key={category.id}
                    className="shrink-0 grow-0 basis-1/4 md:pl-4"
                    onClick={() => linkPush(category.id)}
                  >
                    <motion.div
                      className="flex max-w-full flex-col items-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex w-full items-center justify-center">
                        <Button className="h-16 rounded-full bg-main shadow-md">
                          <Image
                            alt={category.name}
                            src={category.iconPath}
                            width={35}
                            height={35}
                            className="object-contain"
                          />
                        </Button>
                      </div>
                      <span className="mt-2 max-w-full truncate text-xs font-semibold text-primary">
                        {t(category.id)}
                      </span>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <TrendingStories storyData={stories} cityId={cityId} viewMoreHandleStory={viewMoreHandleStory} />

        <FavouriteRoutes routeData={routes} cityId={cityId} />
          {routes.length ? <>
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="flex w-full items-center capitalize border-primary bg-none font-medium text-green-800"
                onClick={viewMoreHandleRoute}
                disabled={isRouteLoading}
              >
                {t('viewMore')}
              </Button>
            </motion.div>
          </> : null}
        
      </div>
    </PageContainer>
  );
}
