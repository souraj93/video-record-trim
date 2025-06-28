/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

// Mock API data
const cityData = {
  id: 'amsterdam-01',
  name: 'Amsterdam',
  categories: [
    { id: 'general', name: 'General', icon: 'Info' },
    { id: 'history', name: 'History', icon: 'ClipboardList' },
    { id: 'transport', name: 'Transport', icon: 'Car' },
    { id: 'eat', name: 'Eat', icon: 'Utensils' },
    { id: 'drink', name: 'Drink', icon: 'Coffee' },
    { id: 'stay', name: 'Stay', icon: 'Bed' },
    { id: 'photo', name: 'Photography', icon: 'Camera' },
    { id: 'landmarks', name: 'Landmarks', icon: 'MapPin' }
  ],
  trendingStories: [
    {
      id: 'story-01',
      title: '7 mei 1945',
      distance: '1.1 km away',
      image: '/api/placeholder/150/100',
      excerpt: 'The liberation of Amsterdam during WWII'
    },
    {
      id: 'story-02',
      title: 'Bijlmerramp',
      distance: '1.1 km away',
      image: '/api/placeholder/150/100',
      excerpt: 'The 1992 plane crash in Amsterdam-Zuidoost'
    },
    {
      id: 'story-03',
      title: 'Aletta Jacobs',
      distance: '1.1 km away',
      image: '/api/placeholder/150/100',
      excerpt: 'First Dutch woman to complete a university degree'
    },
    {
      id: 'story-04',
      title: 'Anne Frank',
      distance: '0.8 km away',
      image: '/api/placeholder/150/100',
      excerpt: 'The story of the famous diarist during WWII'
    },
    {
      id: 'story-05',
      title: 'Canal Belt',
      distance: '0.3 km away',
      image: '/api/placeholder/150/100',
      excerpt: "History of Amsterdam's UNESCO heritage canals"
    }
  ],
  favoriteRoutes: [
    {
      id: 'route-01',
      title: 'Canal District Walk',
      distance: '1.1 km away',
      length: '7.5km long',
      image: '/api/placeholder/400/160',
      excerpt:
        "Explore Amsterdam's iconic 17th-century canal ring, a UNESCO World Heritage site featuring elegant merchant houses and picturesque bridges."
    },
    {
      id: 'route-02',
      title: 'Museum Quarter Tour',
      distance: '2.3 km away',
      length: '5.2km long',
      image: '/api/placeholder/400/160',
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

const AmsterdamMobileGuide = () => {
  // State for card expansion
  const [expandedRoutes, setExpandedRoutes] = useState({});

  // Toggle route expansion
  const toggleRouteExpansion = (routeId) => {
    setExpandedRoutes((prev) => ({
      ...prev,
      [routeId]: !prev[routeId]
    }));
  };

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Info':
        return (
          <Image
            alt=""
            src="/icons/general_icon.svg"
            width={100}
            height={100}
          />
        );
      case 'ClipboardList':
        return <ClipboardList className="h-6 w-6" />;
      case 'Car':
        return <Car className="h-6 w-6" />;
      case 'Utensils':
        return <Utensils className="h-6 w-6" />;
      case 'Coffee':
        return <Coffee className="h-6 w-6" />;
      case 'Bed':
        return <Bed className="h-6 w-6" />;
      case 'Camera':
        return <Camera className="h-6 w-6" />;
      case 'MapPin':
        return <MapPin className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-slate-50">
      <div className="rounded-b-lg bg-gradient-to-r from-green-800 to-green-700 p-4 text-white shadow-md">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 rounded-full text-white hover:bg-white/20"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold"
          >
            {cityData.name}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a story"
              className="w-full rounded-lg border-0 bg-white/10 py-2 pl-4 pr-10 text-white placeholder:text-white/70 focus-visible:ring-white/30"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-white/70">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 px-4 pb-6">
        <div className="my-6">
          <Carousel
            opts={{
              align: 'start',
              loop: false
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {cityData.categories.map((category, index) => (
                <CarouselItem
                  key={category.id}
                  className="basis-1/4 pl-2 md:basis-1/6 md:pl-4"
                >
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="h-16 w-16 rounded-full bg-green-800 shadow-md transition-all hover:bg-green-700">
                      {getIconComponent(category.icon)}
                    </Button>
                    <span className="mt-2 text-xs font-medium">
                      {category.name}
                    </span>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <motion.h2
              className="text-lg font-semibold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Trending stories
            </motion.h2>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 font-medium text-green-800"
            >
              See all
            </Button>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: false
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {cityData.trendingStories.map((story, index) => (
                <CarouselItem
                  key={story.id}
                  className="basis-2/5 pl-2 md:basis-1/3 md:pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
                      <div className="relative h-28 bg-gray-300">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="font-medium text-white">
                            {story.title}
                          </p>
                          <p className="text-xs text-white/80">
                            {story.distance}
                          </p>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="line-clamp-2 text-xs text-gray-700">
                          {story.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/90" />
            <CarouselNext className="right-0 bg-white/90" />
          </Carousel>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <motion.h2
              className="text-lg font-semibold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Favorite routes
            </motion.h2>
          </div>

          <div className="space-y-5">
            {cityData.favoriteRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="w-full"
              >
                <Card className="overflow-hidden rounded-lg border-0 shadow-md">
                  <div className="relative h-36 bg-gray-300">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-lg font-medium text-white">
                        {route.title}
                      </p>
                      <p className="text-xs text-white/80">
                        {route.distance} • {route.length}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <motion.div
                      animate={{
                        height: expandedRoutes[route.id] ? 'auto' : '2.5rem'
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-700">{route.excerpt}</p>
                    </motion.div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-8 p-0 font-medium text-green-800"
                      onClick={() => toggleRouteExpansion(route.id)}
                    >
                      {expandedRoutes[route.id] ? 'Show less' : 'Read more'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              className="mx-auto flex items-center font-medium text-green-800"
            >
              View all routes
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AmsterdamMobileGuide;
