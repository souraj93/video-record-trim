'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import MobileBottomNav from '@/components/layout/mobile-nav';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import RouteSlider from '../../_components/route-slider';
import StorySlider from '../../_components/story-slider';
import MobileHeader from '../../../_components/mobile-header';
import { useCategories } from '@/hooks/category/use-category';
import MapWithMarker from '@/app/home/_components/mapbox-map-page';
import { useStories } from '@/hooks/story/use-story';
import { checkLanguageOrSetDefault, fetchAndWatchLocation } from '@/config/utilities';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteRoute, useGetRouteList } from '@/hooks/route/use-route';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import Cookies from 'js-cookie';
import { AUTH_TOKEN, STORY_IDS } from '@/config/cookie-keys';
import FavouriteRoutes from '@/app/home/cities/_components/favourite-routes';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Stop {
  id: string;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  tags: string[];
}

interface Route {
  id: string;
  title: string;
  description: string;
  image: string;
  stops: Stop[];
  tags: string[];
}

type MarkerItem = Story | Route;

// Type guard to check if an item is a Route
const isRoute = (item: MarkerItem): item is Route => {
  return 'stops' in item;
};

export default function ExploreTabPage({ cityId }: { cityId: string }) {
  const [activeTab, setActiveTab] = useState('stories');
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const [currentStoryStopIndex, setCurrentStoryStopIndex] = useState(0);
  const [currentRouteStopIndex, setCurrentRouteStopIndex] = useState(0);

  const t = useTranslations();
  const userId = Cookies.get(AUTH_TOKEN);

  const categoryFilters = {
    filters: {},
    skip: 0,
    limit: 0
  };

  const { data: categoryData, isPending: isCategoriesPending } =
    useCategories(categoryFilters);
  

  const [stories, setStories] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [storyCenter, setStoryCenter] = useState({});
  const [routeCenter, setRouteCenter] = useState({});
  const [isStoryHidden, hideStoryDetails] = useState(true);
  const [isRouteHidden, hideRouteDetails] = useState(true);
  const [storiesCategories, setStoriesCategories] = useState([]);
  const [routesCategories, setRoutesCategories] = useState([]);
  const [isCreate, setCreate] = useState(false);
  const [storiesList, updateStoriesList] = useState([]);
  const [location, setLocation] = useState({
      latitude: null,
      longitude: null
    });
  const { mutate: removeRouteFunc } = useDeleteRoute();

  const storyFilters = {
    cityRef: cityId,
    coordinate: location.latitude ? [location.latitude, location.longitude] : null,
  };

  const { data: storyData, refetch } = useStories({
    filters: storyFilters,
    skip: 0,
    limit: 0,
  }, true, false);

  const from = searchParams.get('from') || '';

  const { data: routeData } = useGetRouteList({
    filters: { cityRef: cityId,
      userRef: from && from === 'create' && userId ? JSON.parse(userId).user._id : "",
     },
    skip: 0,
    limit: 0
  });
  
    useEffect(() => {
      if (from && from === 'create') {
        setCreate(true);
        hideStoryDetails(false);
      }
    }, [from]);

  useEffect(() => {
    if (tab && tab === "routes") {
      setActiveTab('routes');
    }
  }, [tab]);

  useEffect(() => {
    if (categoryData?.data?.data?.length) {
      setStoriesCategories(
        categoryData?.data.data
          .filter((category) => category.categoryType === 2)
          .map((each) => {
            return {
              ...each,
              active: false
            };
          })
      );
      setRoutesCategories(
        categoryData?.data.data
          .filter((category) => category.categoryType === 3)
          .map((each) => {
            return {
              ...each,
              active: false
            };
          })
      );
    }
  }, [categoryData]);

  useEffect(() => {
    if (storyData?.data) {
      setStories(
        storyData.data.data.map((story: any, index: number) =>
          getStoryData(story, index)
        )
      );
      if (storyData.data?.data?.length) {
        setStoryCenter({
          lat: storyData.data.data[0].fullAddress.location.coordinates[1],
          lng: storyData.data.data[0].fullAddress.location.coordinates[0]
        });
      }
    }
  }, [storyData]);

  useEffect(() => {
    if (routeData?.data) {
      if (routeData.data?.data?.length) {
        setRoutes(
          routeData.data.data.map((route: any, index: number) =>
            getRouteData(route, index)
          )
        );
        if (routeData.data.data[0].fullAddress.location.coordinates) {
          setRouteCenter({
            lat: routeData.data.data[0].fullAddress.location.coordinates[1],
            lng: routeData.data.data[0].fullAddress.location.coordinates[0]
          });
        }
        
      }
    }
  }, [routeData]);

  const currentStoryStop = stories.length ? stories[currentStoryStopIndex] : {};
  const currentRouteStop = routes.length ? routes[currentRouteStopIndex] : {};

  const getStoryData = (story: any, index: number) => {
    return {
      _id: story._id,
      id: `stop-${index + 1}`,
      title: checkLanguageOrSetDefault(story.languageDetails)?.name,
      description: checkLanguageOrSetDefault(story.languageDetails)
        ?.description,
      image: story.images[0],
      lat: story.fullAddress.location.coordinates[1],
      lng: story.fullAddress.location.coordinates[0],
      colorCode: story.categoryRefs[0]?.colorCode,
      cityRef: story.cityRef,
      categoryRefs: story.categoryRefs
    };
  };

  const getRouteData = (route: any, index: number) => {
    const obj = {
      _id: route._id,
      id: `stop-${index + 1}`,
      title: checkLanguageOrSetDefault(route.languageDetails)?.name,
      description: checkLanguageOrSetDefault(route.languageDetails)
        ?.introductoryText,
      image: route.images[0],
      colorCode: route.categoryRefs[0]?.colorCode,
      cityRef: route.cityRef
    }
    if (route?.fullAddress?.location?.coordinates) {
      obj.lat = route?.fullAddress?.location?.coordinates[1];
      obj.lng = route?.fullAddress?.location?.coordinates[0];
    }
    return obj;
  };

  const chooseCategory = (cat: any) => {
    if (cat.categoryType === 2) {
      hideStoryDetails(true);
      const localCats = [...storiesCategories];
      const activeCatIds = [];
      localCats.forEach((each) => {
        if (each._id === cat._id) {
          each.active = !each.active;
        }

        if (each.active) {
          activeCatIds.push(each._id);
        }
      });
      setStoriesCategories([...localCats]);

      if (activeCatIds.length) {
        setStories(
          storyData.data.data
            .map((story: any, index: number) => {
              if (activeCatIds.includes(story.categoryRefs[0]?._id)) {
                return getStoryData(story, index);
              }
            })
            .filter((each) => each)
        );
      } else {
        setStories(
          storyData.data.data.map((story: any, index: number) => {
            return getStoryData(story, index);
          })
        );
      }
    } else if (cat.categoryType === 3) {
      hideRouteDetails(true);

      const localCats = [...routesCategories];
      const activeCatIds = [];

      localCats.forEach((each) => {
        if (each._id === cat._id) {
          each.active = !each.active;
        }

        if (each.active) {
          activeCatIds.push(each._id);
        }
      });
      setRoutesCategories([...localCats]);

      if (activeCatIds.length) {
        setRoutes(
          routeData.data.data
            .map((route: any, index: number) => {
              if (activeCatIds.includes(route.categoryRefs[0]?._id)) {
                return getRouteData(route, index);
              }
            })
            .filter((each) => each)
        );
      } else {
        setRoutes(
          routeData.data.data.map((route: any, index: number) => {
            return getRouteData(route, index);
          })
        );
      }
    }
  };

  const addRemoveStoryToRoute = (story: any) => {
    const localStories = [...storiesList];
    if (localStories.includes(story._id)) {
      localStories.splice(localStories.indexOf(story._id), 1);
      toast.success(`Removed "${story.title}" from your route`);
    } else {
      localStories.push(story._id);
      toast.success(`Added "${story.title}" to your route`);
    }
    updateStoriesList(localStories);
    Cookies.set(STORY_IDS, JSON.stringify(localStories));
  };
  useEffect(() => {
    const storyIds = Cookies.get(STORY_IDS);
    if (storyIds) {
      updateStoriesList(JSON.parse(storyIds));
    }
    fetchAndWatchLocation();
    
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      refetch();
    }
  }, [location.latitude, location.longitude]);

  const fetchAndWatchLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User position:', { latitude, longitude });
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching location:', error);
          refetch();
          // setLocation(loc);
        }
      );
    } else {
      console.log('Geolocation not supported');
      refetch();
    }
  };

  const removeRoute = (id: string) => {
    removeRouteFunc(id);
  }

  return (
    <PageContainer mobileNavPage scrollable>
      <div className="flex h-screen flex-col">
        <div className="fixed top-0 z-20 w-full bg-white/80 p-4 backdrop-blur-md md:max-w-[414px]">
          <MobileHeader
            title={!isCreate ? activeTab === 'stories' ? t('exploreStories') : t('exploreRoutes') : t('mapView')}
            backHref={`/home/cities/${cityId}`}
            variant="simple"
            useHref={from !== 'create'}
          />
          <div className="mt-8 w-full border-b border-gray-200 md:max-w-[414px]">
            <div className="flex w-full">
              <button
                onClick={() => {
                  setActiveTab('stories');
                  !isCreate && window.history.replaceState({}, '', `${window.location.pathname}?tab=stories`);
                }}
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'stories'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {t('stories')}
              </button>
              <button
                onClick={() => {
                  setActiveTab('routes');
                  !isCreate && window.history.replaceState({}, '', `${window.location.pathname}?tab=routes`);
                }}
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'routes'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {!isCreate ? t('routes') : t('yourRoutes')}
              </button>
            </div>
          </div>

          {!isCreate ? (
            <div className="mt-4 w-full">
              {!isCategoriesPending ? (
                <Carousel opts={{ align: "start", loop: false }}>
                  <CarouselContent className="-ml-2">
                    {(activeTab === 'stories'
                      ? storiesCategories ?? []
                      : routesCategories ?? []
                    ).map((tag) => (
                      <CarouselItem key={tag.name} className="pl-2 basis-auto">
                        <Button
                          variant="outline"
                          className="bg-transparent shadow-none"
                          style={{
                            borderColor: `${tag.colorCode}`,
                            color: `${tag.active ? '#fff' : tag.colorCode}`,
                            backgroundColor: `${!tag.active ? '#fff' : tag.colorCode}`
                          }}
                          onClick={() => chooseCategory(tag)}
                        >
                          {tag.name}
                        </Button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <></>
              )}
            </div>
          ) : null}
        </div>
        {isCreate && activeTab === 'routes' ? null :
          <div className="relative h-[100vh] w-full pt-[156px]">
            <MapWithMarker
              // showCurrentLocation={true}
              removeNotNeeded={isCreate}
              containerId={activeTab}
              center={activeTab === 'stories' ? storyCenter : routeCenter}
              currentStopIndex={
                activeTab === 'stories'
                  ? currentStoryStopIndex
                  : currentRouteStopIndex
              }
              setCurrentStopIndex={
                activeTab === 'stories'
                  ? setCurrentStoryStopIndex
                  : setCurrentRouteStopIndex
              }
              locations={
                activeTab === 'stories'
                  ? stories?.length
                    ? stories.map((story) => {
                      return {
                        lat: story?.lat,
                        lng: story?.lng,
                        categoryColor: story?.colorCode
                      };
                    })
                    : []
                  : routes?.length
                    ? routes.map((route) => {
                      return {
                        lat: route?.lat,
                        lng: route?.lng,
                        categoryColor: route?.colorCode
                      };
                    })
                    : []
              }
              hideDetails={
                activeTab === 'stories' ? hideStoryDetails : hideRouteDetails
              }
              isCategoryChosen={
                activeTab === 'stories'
                  ? storiesCategories.filter((each) => each.active).length
                    ? true
                    : false
                  : routesCategories.filter((each) => each.active).length
                    ? true
                    : false
              }
            />
          </div>}
        {activeTab === 'stories' ? (
          <>
            {stories.length && !isStoryHidden ? (
              <>
                <div className="h-[40vh] overflow-auto absolute bg-white w-full" style={{
                  bottom: 50
                }}>
                  <RouteSlider
                    stops={stories}
                    hideStop={true}
                    currentIndex={currentStoryStopIndex}
                    onStopChange={setCurrentStoryStopIndex}
                    noText={isCreate}
                  />
                  <div className="flex-1 p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStoryStop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {isCreate ?
                        <div className="p-4">
                          <Button
                            className={`w-full bg-${storiesList.includes(currentStoryStop._id) ? 'red-600' : '[#134C37]'} py-6 text-lg font-medium text-white`}
                            onClick={() =>
                              addRemoveStoryToRoute(currentStoryStop)
                            }
                          >
                            {storiesList.includes(currentStoryStop._id) ? t('removeStory') : t('addStory')}
                          </Button>
                        </div> : null}
                      {!isCreate ? <div className='flex justify-between'>
                        <Badge className="rounded-full bg-primary text-sm mx-auto">{currentStoryStop?.categoryRefs && currentStoryStop?.categoryRefs[0]?.name}</Badge>
                      </div> : null}
                      <h2 className="flex justify-between text-lg font-semibold text-gray-900">

                        <span>{currentStoryStop.title}</span>
                        {!isCreate ?
                          <Image
                            src="/cross.svg"
                            alt={'cross'}
                            width={10}
                            height={10}
                            className="cursor-pointer"
                            onClick={() => hideStoryDetails(true)}
                          /> : null}
                      </h2>
                      <p
                        className="mt-2 text-sm text-gray-600"
                        style={{
                          maxHeight: '150px',
                          overflow: 'auto'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentStoryStop.description
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {!isCreate ?
                  <div className="p-4">
                    <Button
                      className="w-full bg-[#134C37] py-6 text-lg font-medium text-white"
                      onClick={() =>
                        router.push(
                          `/home/cities/${currentStoryStop.cityRef}/stories/${currentStoryStop._id}`
                        )
                      }
                    >
                      {t('viewCompleteStory')}
                    </Button>
                  </div> : null}
                </div>

                
              </>
            ) : null}
          </>
        ) : (
          <>
            {!isCreate && routes.length && !isRouteHidden ? (
              <>
                <div className="h-[40vh] overflow-auto absolute bg-white w-full" style={{
                  bottom: 50
                }}>
                  <RouteSlider
                    hideStop={true}
                    stops={routes}
                    currentIndex={currentRouteStopIndex}
                    onStopChange={setCurrentRouteStopIndex}
                    noText={true}
                  />
                  <div className="flex-1 p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentRouteStop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h2 className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>{currentRouteStop.title}</span>
                        <Image
                          src="/cross.svg"
                          alt={'cross'}
                          width={10}
                          height={10}
                          className="cursor-pointer"
                          onClick={() => hideRouteDetails(true)}
                        />
                      </h2>
                      {/* <p
                        className="mt-2 text-sm text-gray-600"
                        style={{
                          maxHeight: '150px',
                          overflow: 'auto'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentRouteStop.description
                        }}
                      /> */}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="p-4">
                  <Button
                    className="w-full bg-[#134C37] py-6 text-lg font-medium text-white"
                    onClick={() =>
                      router.push(`/home/routes/${currentRouteStop._id}`)
                    }
                  >
                    {t('viewRoute')}
                  </Button>
                </div>
                </div>

                
              </>
            ) : null}
            {isCreate ?
              <>
                {routeData?.data?.data?.length === 0 && (
                  <div className="flex flex-col items-center justify-center pb-12 text-center text-gray-500 pt-[156px]">
                    <p className="text-lg font-medium">
                      You haven&#39;t created any routes
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-3 pt-[156px]">
                  <FavouriteRoutes
                    classNames="mt-0"
                    showTitle={false}
                    routeData={routeData?.data?.data || []}
                    cityId={cityId}
                    showDeleteButton={true}
                    remove={removeRoute}
                  />
                </div>
              </>
              : null}
          </>
        )}
      </div>
    </PageContainer>
  );
}
