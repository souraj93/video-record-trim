'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import TrendingStories from './_components/trending-stories';
import FavouriteRoutes from './_components/favourite-routes';
import MobileHeader from '../_components/mobile-header';

// export const metadata: Metadata = {
//   title: 'Cities',
//   description: 'Data'
// };

const cityData = {
  id: 'amsterdam-01',
  name: 'Amsterdam',
  categories: [
    { id: 'general', name: 'General', iconPath: '/icons/general_icon.svg' },
    { id: 'donate', name: 'Donate', iconPath: '/icons/general_icon.svg' },
    { id: 'history', name: 'History', iconPath: '/icons/history_icon.svg' },
    {
      id: 'transport',
      name: 'Transport',
      iconPath: '/icons/transport_icon.svg'
    },
    { id: 'eat', name: 'Eat', iconPath: '/icons/eat_icon.svg' },
    { id: 'sleep', name: 'Sleep', iconPath: '/icons/sleep_icon.svg' }
  ],
  trendingStories: [
    {
      id: 'story-01',
      title: '7 mei 1945',
      distance: '1.1 km away',
      image: '/bg-auth.jpg',
      excerpt: 'The liberation of Amsterdam during WWII'
    },
    {
      id: 'story-02',
      title: 'Bijlmerramp',
      distance: '1.1 km away',
      image: '/bg-02.jpg',
      excerpt: 'The 1992 plane crash in Amsterdam-Zuidoost'
    },
    {
      id: 'story-03',
      title: 'Aletta Jacobs',
      distance: '1.1 km away',
      image: '/bg-03.jpg',
      excerpt: 'First Dutch woman to complete a university degree'
    },
    {
      id: 'story-04',
      title: 'Anne Frank',
      distance: '0.8 km away',
      image: '/bg-04.jpg',
      excerpt: 'The story of the famous diarist during WWII'
    },
    {
      id: 'story-05',
      title: 'Canal Belt',
      distance: '0.3 km away',
      image:
        'https://www.pexels.com/photo/colorful-bangkok-canal-boats-in-daylight-30965283/',
      excerpt: "History of Amsterdam's UNESCO heritage canals"
    }
  ],
  favoriteRoutes: [
    {
      id: 'route-01',
      title: 'Canal District Walk',
      distance: '1.1 km away',
      length: '7.5km long',
      image: '/bg-auth.jpg',
      excerpt:
        "Explore Amsterdam's iconic 17th-century canal ring, a UNESCO World Heritage site featuring elegant merchant houses and picturesque bridges."
    },
    {
      id: 'route-02',
      title: 'Museum Quarter Tour',
      distance: '2.3 km away',
      length: '5.2km long',
      image: '/bg-auth.jpg',
      excerpt:
        "Visit Amsterdam's cultural heart with the Rijksmuseum, Van Gogh Museum, and Stedelijk Museum of Modern Art."
    },
    {
      id: 'route-03',
      title: 'De Pijp Neighborhood',
      distance: '3.5 km away',
      length: '4.1km long',
      image: '/api/placeholder/400/160',
      excerpt:
        'Discover the vibrant multicultural area with Albert Cuyp Market, trendy cafés, and diverse restaurants.'
    }
  ]
};

export default function CitiesPage() {
  const router = useRouter();
  const linkPush = () => {
    router.push('/home/tabs/1');
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <div className="flex w-full flex-col p-4">
        <MobileHeader title="Amsterdam" backHref="/home" variant="simple" />

        <section className="relative mt-8">
          <h1 className="text-2xl font-bold text-main">Hello, Paul</h1>
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
                {cityData.categories.map((category, index) => (
                  <CarouselItem
                    key={category.id}
                    className="shrink-0 grow-0 basis-1/4 md:pl-4"
                    onClick={linkPush}
                  >
                    <motion.div
                      className="flex max-w-full flex-col items-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex w-full items-center justify-center">
                        <Button className="h-[4rem] rounded-full bg-main shadow-md">
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
                        {category.name}
                      </span>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <TrendingStories cityData={cityData} />

        <FavouriteRoutes cityData={cityData} />

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
            className="flex w-full items-center border-primary bg-none font-medium text-green-800"
          >
            View all
          </Button>
        </motion.div>
      </div>
    </PageContainer>
  );
}
