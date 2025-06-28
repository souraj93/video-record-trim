'use client';

import { ChevronLeft } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageContainer from '@/components/layout/page-container';

import Link from 'next/link';
// import StoriesCarousel from '../../cities/[citiesId]/stories/_components/StoriesCarousel';
import { useRoute } from '@/hooks/route/use-route';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import StoriesCarousel from '@/app/home/cities/[citiesId]/stories/_components/StoriesCarousel';

type Props = {
  params: {
    routeId: string;
  };
};

export default function RoutesPage({ params }: Props) {
  const { data: routeData } = useRoute(params?.routeId); // params.routeId
  const router = useRouter();

  const routeDetails = routeData?.data || {
    images: []
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      {routeDetails?.languageDetails ? (
        <div className="flex w-full flex-col">
          <section className="flex p-4">
            <Button
              onClick={() => router.back()}
              className="rounded-full bg-gray-300 p-3"
            >
              <ChevronLeft size={30} color="#fff" />
            </Button>
            <p className="w-[calc(100%-50px)] text-center text-xl font-bold text-[#134C37]">
              {routeDetails?.languageDetails &&
                checkLanguageOrSetDefault(routeDetails?.languageDetails)?.name}
            </p>
          </section>

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
                View Route
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
