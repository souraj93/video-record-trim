'use client';

import React, { useState, useEffect, use } from 'react';
import { Filter, Search, X } from 'lucide-react';
import ArticleCard from '../../../_components/article-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import MobileHeader from '@/app/home/_components/mobile-header';
import Image from 'next/image';
import { useStories } from '@/hooks/story/use-story';
import { useGetRouteList } from '@/hooks/route/use-route';
import { useCategories } from '@/hooks/category/use-category';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { s } from 'node_modules/framer-motion/dist/types.d-6pKw1mTI';
import { toast } from 'sonner';
import { getDistance } from '@/config/utilities';

export default function HomeExplorePage({ cityId }: { cityId: string }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [storiesCategories, setStoriesCategories] = useState([]);
  const [routesCategories, setRoutesCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState(false);
  const [selectedStoryCategoryIds, setSelectedStoryCategoryIds] = useState([]);
  const [selectedRouteCategoryIds, setSelectedRouteCategoryIds] = useState([]);

  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const [routeSkip, setRouteSkip] = useState(0);
  const [storySkip, setStorySkip] = useState(0);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });

  let initialized = true;

  const [stories, setStories] = useState([]);
  const [routes, setRoutes] = useState([]);

  const t = useTranslations();
  const router = useRouter();

  const storyFilters = {
    cityRef: cityId,
    ...(searchText.trim() !== '' && { searchText }),
    ...(selectedStoryCategoryIds.length > 0 && {
      categoryIds: selectedStoryCategoryIds
    }),
    coordinate: location.latitude ? [location.latitude, location.longitude] : null,
  };

  const routeFilters = {
    cityRef: cityId,
    ...(searchText.trim() !== '' && { searchText }),
    ...(selectedRouteCategoryIds.length > 0 && {
      categoryIds: selectedRouteCategoryIds
    }),
    // coordinate: location.latitude ? [location.latitude, location.longitude] : null,
  };

  const categoryFilters = {
    filters: {},
    skip: 0,
    limit: 0
  };

  const { data: categoryData, isPending: isCategoriesPending } =
    useCategories(categoryFilters);

  const {
    data: storyData,
    isLoading: isStoryLoading,
    refetch: refetchStories
  } = useStories({
    filters: storyFilters,
    skip: storySkip,
    limit: 10
  }, false, false);

  const {
    data: routeData,
    isLoading: isRouteLoading,
    refetch: refetchRoutes
  } = useGetRouteList({
    filters: routeFilters,
    skip: routeSkip,
    limit: 10
  });

  useEffect(() => {
    if (tab && tab === "routes") {
      setActiveTab('routes');
    }
  }, [tab]);

  useEffect(() => {
    if (categoryData?.data?.data) {
      const storyCategories = categoryData.data.data
        .filter((cat) => cat.categoryType === 2)
        .map((cat) => ({
          _id: cat._id,
          name: cat.name,
          colorCode: cat.colorCode,
          active: false
        }));

      const routeCategories = categoryData.data.data
        .filter((cat) => cat.categoryType === 3)
        .map((cat) => ({
          _id: cat._id,
          name: cat.name,
          colorCode: cat.colorCode,
          active: false
        }));

      setStoriesCategories(storyCategories);
      setRoutesCategories(routeCategories);
    }
  }, [categoryData]);

  const addDistanceToStory = async () => {
    if ((stories.length && stories[0]._id !== storyData?.data?.data[0]?._id) || !stories.length) {
      const storiesWithDistance = [...storyData?.data?.data];
      // storiesWithDistance.forEach(async (story) => {
      //   if (location.latitude && location.longitude) {
      //     const dist = await getDistance(
      //       [location.longitude, location.latitude],
      //       story.fullAddress.location.coordinates
      //     )
      //     story.dist = dist;

      //   } else {
      //     console.log("No location available for distance calculation");
      //     return story;
      //   }

      // });
      // console.log("stories---- ", stories, storiesWithDistance)
      setStories([
        ...stories,
        ...storiesWithDistance
      ]);
    }
  }

  useEffect(() => {
    if (storyData?.data?.data?.length && initialized) {
      addDistanceToStory();
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

  useEffect(() => {
    if (activeTab !== 'stories') {
      refetchRoutes();
    }
  }, [
    activeTab,
    selectedStoryCategoryIds,
    selectedRouteCategoryIds,
    searchText,
    refetchRoutes
  ]);

  useEffect(() => {
    if (activeTab === 'stories') {
      setStorySkip(0);
    } else {
      setRouteSkip(0);
    }
  }, [
    activeTab,
    selectedStoryCategoryIds,
    selectedRouteCategoryIds,
    searchText
  ]);

  useEffect(() => {
    if (activeTab === 'stories' && storySkip) {
      refetchStories();
    }
  }, [storySkip]);

  useEffect(() => {
    const hasActiveFilters =
      storiesCategories.some((cat) => cat.active) ||
      routesCategories.some((cat) => cat.active);

    setActiveFilters(hasActiveFilters);
  }, [storiesCategories, routesCategories]);

  const viewMoreHandleRoute = () => {
    if (routeData && routes?.length < routeData.data.total) {
      const newSkip = routeSkip + 10;
      setRouteSkip(newSkip);
    } else {
      toast.info('Hold tight – more routes coming soon!');
    }
  };

  const viewMoreHandleStory = () => {
    if (storyData && stories?.length < storyData?.data?.total) {
      const newSkip = storySkip + 10;
      setStorySkip(newSkip);
    } else {
      toast.info('Hold tight – more stories coming soon!');
    }
  };

  const handleSearch = () => {
    setSearchText(searchQuery);
  };

  useEffect(() => {
    fetchAndWatchLocation();
  }, []);

  const chooseCategory = (tag) => {
    if (activeTab === 'stories') {
      setStoriesCategories((prevTags) =>
        prevTags.map((t) =>
          t._id === tag._id ? { ...t, active: !t.active } : t
        )
      );

      if (tag.active) {
        setSelectedStoryCategoryIds((prev) =>
          prev.filter((id) => id !== tag._id)
        );
      } else {
        setSelectedStoryCategoryIds((prev) => [...prev, tag._id]);
      }
    } else {
      setRoutesCategories((prevTags) =>
        prevTags.map((t) =>
          t._id === tag._id ? { ...t, active: !t.active } : t
        )
      );

      if (tag.active) {
        setSelectedRouteCategoryIds((prev) =>
          prev.filter((id) => id !== tag._id)
        );
      } else {
        setSelectedRouteCategoryIds((prev) => [...prev, tag._id]);
      }
    }
  };

  const toggleFilterVisibility = () => {
    setShowFilters(!showFilters);
  };

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

          refetchStories(); // Refetch stories if location fails
          // setLocation(loc);
        }
      );
    } else {
      console.log('Geolocation not supported');

      refetchStories(); // Refetch stories if geolocation is not supported
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {

      refetchStories();
    }
  }, [location.latitude, location.longitude]);

  return (
    <PageContainer scrollable mobileNavPage={true}>
      <div className="flex flex-col">
        <div className="fixed top-0 z-20 w-full bg-white px-4 py-3 md:max-w-[414px]">
          <MobileHeader
            title={
              activeTab === 'stories'
                ? `${t('exploreStories')}`
                : `${t('exploreRoutes')}`
            }
            rightButton={
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFilterVisibility}
                className={`rounded-full ${activeFilters ? 'text-main' : ''}`}
              >
                <Image
                  alt="Filter Icon"
                  src="/icons/roods-filter-icon.svg"
                  width={100}
                  height={200}
                  className={`h-6 w-6`}
                />
              </Button>
            }
            backHref={`/home/cities/${cityId}`}
            useHref={true}
            variant="simple"
          />
          <div className="relative pt-4">
            <div className="flex w-full items-center space-x-2 rounded-md bg-white ring-1 ring-gray-200">
              <Input
                type="text"
                placeholder={
                  activeTab === 'stories'
                    ? `${t('searchForAStory')}`
                    : `${t('searchForARoute')}`
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button
                type="submit"
                onClick={handleSearch}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <div className="mt-6 w-full border-b border-gray-200 md:max-w-[414px]">
            <div className="flex w-full">
              <button
                onClick={() => setActiveTab('stories')}
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'stories'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {t('stories')}
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'routes'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
              >
                {t('routes')}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 w-full">
              <Carousel opts={{ align: 'start', loop: false }}>
                <CarouselContent className="-ml-2">
                  {(activeTab === 'stories'
                    ? storiesCategories ?? []
                    : routesCategories ?? []
                  ).map((tag) => (
                    <CarouselItem
                      key={tag._id || tag.name}
                      className="basis-auto pl-2"
                    >
                      <Button
                        variant="outline"
                        className="whitespace-nowrap bg-transparent shadow-none"
                        style={{
                          borderColor: `${tag.colorCode}`,
                          color: `${tag.active ? '#fff' : tag.colorCode}`,
                          backgroundColor: `${!tag.active ? '#fff' : tag.colorCode
                            }`
                        }}
                        onClick={() => chooseCategory(tag)}
                      >
                        {tag.name}
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col gap-3 p-4 ${showFilters ? 'mt-[210px]' : 'pt-[180px]'
            }`}
        >
          {activeTab === 'stories'
            ? (stories || []).map((story) => (
              <ArticleCard
                key={story._id}
                data={story}
                onClickFunc={() =>
                  router.push(
                    `/home/cities/${typeof story?.cityRef === 'string'
                      ? story?.cityRef
                      : story?.cityRef?._id
                    }/stories/${story._id}`
                  )
                }
              />
            ))
            : (routes || []).map((route) => (
              <ArticleCard
                key={route._id}
                data={route}
                onClickFunc={() => router.push(`/home/routes/${route._id}`)}
              />
            ))}

          {activeTab === 'stories' ? (
            <>
              {stories && stories.length > 0 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="flex w-full items-center border-primary bg-none font-medium capitalize text-green-800"
                    onClick={viewMoreHandleStory}
                    disabled={isStoryLoading}
                  >
                    {t('viewMore')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {routes && routes.length > 0 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="flex w-full items-center border-primary bg-none font-medium capitalize text-green-800"
                    onClick={viewMoreHandleRoute}
                    disabled={isRouteLoading}
                  >
                    {t('viewMore')}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {((activeTab === 'stories' &&
          (!stories || stories.length === 0) &&
          !isStoryLoading) ||
          (activeTab === 'routes' &&
            (!routes || routes.length === 0) &&
            !isRouteLoading)) && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <p className="text-lg font-medium">
                {activeTab === 'stories'
                  ? t('noStoriesFound')
                  : t('noRoutesFound')}
              </p>
            </div>
          )}
      </div>
    </PageContainer>
  );
}
