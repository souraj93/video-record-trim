'use client';

import Image from 'next/image';
import { ChevronLeft, Heart, SearchIcon } from 'lucide-react';

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
import {
  Info,
  ClipboardList,
  Car,
  Utensils,
  Coffee,
  Bed,
  Camera,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';

import MobileBottomNav from '@/components/layout/mobile-nav';
import Link from 'next/link';
import StoriesCarousel from '../../cities/[citiesId]/stories/_components/StoriesCarousel';
import { buttonVariants } from '@/components/ui/button';
import { useMarkFavouriteRoute, useRoute } from '@/hooks/route/use-route';
import { checkLanguageOrSetDefault, isLoggedIn } from '@/config/utilities';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@/config/cookie-keys';
import MobileHeader from '../../_components/mobile-header';

type Props = {
  params: {
    routeId: string;
  };
};

export default function RoutesDetailPage({ params }: Props) {
  const { data: routeData } = useRoute(params?.routeId); // params.routeId
  const router = useRouter();

  const routeDetails = routeData?.data || {
    images: []
  };

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { mutate: markFavourite } = useMarkFavouriteRoute(
    params?.routeId,
    routeData,
    currentUserId
  );
  const [isButtonDisplayed, showButton] = useState(false);

  const isCurrentlyFavorited =
    routeData?.data?.savedByRefs?.includes(currentUserId);

  useEffect(() => {
    const authToken = Cookies.get(AUTH_TOKEN);
    if (authToken) {
      setCurrentUserId(JSON.parse(authToken).user._id);
    }
    isLoggedIn() ? showButton(true) : showButton(false);
  }, []);

  const handleFavouriteClick = () => {
    markFavourite({ isSaved: !isCurrentlyFavorited });
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      {routeDetails?.languageDetails ? (
        <div className="flex w-full flex-col">
          <div className="p-4">
            <MobileHeader
              title={
                routeDetails?.languageDetails &&
                checkLanguageOrSetDefault(routeDetails?.languageDetails)?.name
              }
              variant="simple"
              rightButton={
                <button
                  className="flex items-center justify-center rounded-full bg-white p-2"
                  onClick={handleFavouriteClick}
                >
                  <Heart
                    size={16}
                    color={isCurrentlyFavorited ? '#AD5C44' : '#AD5C44'}
                    fill={isCurrentlyFavorited ? '#AD5C44' : 'transparent'}
                  />
                </button>
              }
            />
          </div>
          <div className="relative">
            {routeDetails.images.length ? (
              <StoriesCarousel
                backButtonShow={false}
                storiesData={{
                  images: routeDetails.images.map((img, ind) => {
                    return {
                      image: img,
                      title: `Route Image ${ind + 1}`,
                      alt: `Route Image ${ind + 1} - Description`
                    };
                  })
                }}
              />
            ) : null}
            {/* {isButtonDisplayed ? (
              <div className="absolute -bottom-2 left-0 right-0 z-50 flex justify-center">
                <button
                  className="flex items-center justify-center rounded-full bg-white p-2"
                  onClick={handleFavouriteClick}
                >
                  <Heart
                    size={16}
                    color={isCurrentlyFavorited ? '#AD5C44' : '#AD5C44'}
                    fill={isCurrentlyFavorited ? '#AD5C44' : 'transparent'}
                  />
                </button>
              </div>
            ) : null} */}
          </div>
          <section className="mt-4 p-4">
            <h3 className="text-lg font-bold text-main">About this Route</h3>
            <p className="mt-2">
              {routeDetails?.languageDetails &&
                checkLanguageOrSetDefault(routeDetails?.languageDetails)
                  ?.introductoryText}
            </p>
          </section>

          <motion.div
            className="mt-6 p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // transition={{ duration: 0.3, delay: 0.5 }}
            // whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="default"
              className="flex w-full items-center border-primary bg-main bg-none font-medium text-white"
            >
              <Link href={`/home/routes/navigate/${params.routeId}`}>
                Start Route
              </Link>
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          Loading route details...
        </div>
      )}
    </PageContainer>
  );
}
