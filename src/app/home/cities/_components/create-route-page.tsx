'use client';

import React, { use, useEffect, useState } from 'react';
import { ChevronLeft, Map, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import MobileBottomNav from '@/components/layout/mobile-nav';
import StorySelector from '@/app/home/routes/_components/StorySelector';
import RouteCard from '@/app/home/routes/_components/RouteCard';
import MobileHeader from '@/app/home/_components/mobile-header';
import { useStories } from '@/hooks/story/use-story';
import { useDeleteRoute, useGetRouteList } from '@/hooks/route/use-route';
import FavouriteRoutes from './favourite-routes';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AUTH_TOKEN, STORY_IDS } from '@/config/cookie-keys';

interface CreateRouteDetailPageProps {
  cityId: string;
}

// Define a type for the story references
interface StoryReference {
  _id: string;
  fullAddress: string;
  uniqueId: string;
  images: any[];
  languageDetails: any;
  status: string;
}

export default function CreateRouteDetailPage({
  cityId
}: CreateRouteDetailPageProps) {
  const [activeTab, setActiveTab] = useState('stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [storyRefs, setStoryRefs] = useState<StoryReference[]>([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });
  const router = useRouter();

  const storyFilters = {
    cityRef: cityId,
    // isNewStory: true,
    ...(searchText.trim() !== '' && { searchText }),
    coordinate: location.latitude ? [location.latitude, location.longitude] : null,
  };

  const userId = Cookies.get(AUTH_TOKEN);

  const routeFilters = {
    cityRef: cityId,
    userRef: userId && JSON.parse(userId).user._id,
    ...(searchText.trim() !== '' && { searchText })
  };

  const { data: storyData, isLoading: isStoryLoading, refetch } = useStories({
    filters: storyFilters,
    skip: 0,
    limit: 0
  }, false, false);

  const { data: routeData, isLoading: isRouteLoading } = useGetRouteList({
    filters: routeFilters,
    skip: 0,
    limit: 0
  });

  const { mutate: removeRouteFunc } = useDeleteRoute();
  

  const handleSearch = () => {
    setSearchText(searchQuery);
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
          refetch(); // Refetch stories if location fails
          // setLocation(loc);
        }
      );
    } else {
      console.log('Geolocation not supported');
      refetch(); // Refetch stories if geolocation is not supported
    }
  };

  useEffect(() => {
        if (location.latitude && location.longitude) {
          refetch();
        }
      }, [location.latitude, location.longitude]);

  const storyIds = Cookies.get(STORY_IDS);

  const handleAddStory = (storyId: string, storyIdsParam: any) => {
    if (storyId) {
      const storyToAdd = storyData?.data.data.find(
        (story) => story._id === storyId
      );
  
      if (storyToAdd && !storyRefs.some((story) => story._id === storyId)) {
        const storyReference: StoryReference = {
          _id: storyToAdd._id,
          cityRef: storyToAdd.cityRef,
          fullAddress: storyToAdd.fullAddress,
          uniqueId: storyToAdd.uniqueId,
          images: storyToAdd.images,
          languageDetails: storyToAdd.languageDetails,
          status: storyToAdd.status
        };
        // const storyIds = Cookies.get(STORY_IDS);
        if (storyIds) {
          const allIds = JSON.parse(storyIds);
          allIds.push(storyId);
          Cookies.set(STORY_IDS, JSON.stringify(allIds));
        } else {
          Cookies.set(STORY_IDS, JSON.stringify([storyId]));
        }
  
        setStoryRefs([...storyRefs, storyReference]);
      }
    } else {
      const storyReferences = [];
      storyIdsParam.forEach(each => {
        const storyToAdd = storyData?.data.data.find(
          (story) => story._id === each
        );
        if (storyToAdd && !storyRefs.some((story) => story._id === each)) {
          storyReferences.push({
            _id: storyToAdd._id,
            cityRef: storyToAdd.cityRef,
            fullAddress: storyToAdd.fullAddress,
            uniqueId: storyToAdd.uniqueId,
            images: storyToAdd.images,
            languageDetails: storyToAdd.languageDetails,
            status: storyToAdd.status
          });
      }});
      setStoryRefs([...storyRefs, ...storyReferences]);
    }
    
  };

  const handleRemoveStory = (storyId: string) => {
    setStoryRefs(storyRefs.filter((story) => story._id !== storyId));
    // const storyIds = Cookies.get(STORY_IDS);
    if (storyIds) {
      const allIds = JSON.parse(storyIds);
      allIds.splice(allIds.indexOf(storyId), 1);
      Cookies.set(STORY_IDS, JSON.stringify(allIds));
    }
  };

  const handleOverview = () => {
    // Handle overview click - navigate to a page with selected stories
    // Save the selected stories to localStorage
    localStorage.setItem('storyRefs', JSON.stringify(storyRefs));

    console.log('Stories selected for route:', storyRefs);
    router.push(`/home/cities/${cityId}/routes/create/overview`);
    // You would implement navigation or a modal here
  };

  useEffect(() => {
    
    if (storyIds) {
      handleAddStory(undefined, JSON.parse(storyIds));
    }
  }, [storyIds, storyData]);

  useEffect(() => {
    fetchAndWatchLocation();
  }, []);

  const removeRoute = (id: string) => {
    removeRouteFunc(id);
  }

  return (
    <PageContainer scrollable mobileNavPage>
      <div className="flex w-full flex-col space-y-5 p-4">
        <MobileHeader
          title={activeTab === 'stories' ? 'Add Stories' : 'Your Routes'}
          backHref="/home/cities"
          variant="simple"
          rightButton={
            <>
              {storyRefs.length > 0 && (
                <Button
                  className="text-md font-bold text-main"
                  variant="ghost"
                  onClick={handleOverview}
                >
                  Preview
                </Button>
              )}
            </>
          }
        />
        <section className="relative mt-4">
          <Input
            type="text"
            placeholder={
              activeTab === 'stories'
                ? 'Search for a story...'
                : 'Search for a route...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="w-full rounded-lg border-0 bg-gray-200 py-7 pl-4 pr-10 text-gray-600 shadow-xl focus-visible:ring-white/30"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-white/70">
            <Button
              type="submit"
              onClick={handleSearch}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <SearchIcon className="" size={16} color="#000000" />
            </Button>
          </div>
        </section>

        <div className="w-full border-b border-gray-200">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab('stories')}
              className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${
                activeTab === 'stories'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${
                activeTab === 'routes'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Your Routes
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {activeTab === 'stories' ? (
            <>
              <Button
                variant="outline"
                className="flex w-full items-center border-primary bg-none font-medium text-green-800"
                onClick={() => router.push(`/home/routes/explore/${cityId}?from=create`)}
              >
                <Map size={20}/> Map View
              </Button>
              <h3 className="text-lg font-medium text-main">Nearby Stories</h3>
              {storyRefs.length > 0 && (
                <>
                  <div className="">
                    <div className="flex flex-col gap-3">
                      {storyData?.data.data
                        .filter((story) =>
                          storyRefs.some((ref) => ref._id === story._id)
                        )
                        .map((story) => (
                          <StorySelector
                            key={`selected-${story._id}`}
                            data={story}
                            isAdded={true}
                            showDeleteButton={true}
                            onRemoveStory={handleRemoveStory}
                          />
                        ))}
                    </div>
                  </div>
                </>
              )}
              {storyData?.data.data
                .filter(
                  (story) => !storyRefs.some((ref) => ref._id === story._id)
                )
                .map((story) => (
                  <StorySelector
                    key={story._id}
                    data={story}
                    onAddStory={handleAddStory}
                    isAdded={false}
                  />
                ))}

              {storyData?.data.data.length === 0 && !isStoryLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <p className="text-lg font-medium">No results found</p>
                  <p className="mt-1">Try adjusting your search terms</p>
                </div>
              )}
            </>
          ) : (
            <>
              {routeData?.data.data.length === 0 && !isRouteLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <p className="text-lg font-medium">
                    You haven&#39;t created any routes
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-3">
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
          )}
        </div>
      </div>
    </PageContainer>
  );
}
