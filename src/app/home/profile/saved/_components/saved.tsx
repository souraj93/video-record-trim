'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
// import ArticleCard from '../_components/article-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import MobileHeader from '@/app/home/_components/mobile-header';
import Image from 'next/image';
import { useUnFavouriteStory, useStories } from '@/hooks/story/use-story';
import { useGetRouteList, useUnFavouriteRoute } from '@/hooks/route/use-route';
import { useCategories } from '@/hooks/category/use-category';
import ArticleCard from '@/app/home/cities/_components/article-card';
import { AUTH_TOKEN } from '@/config/cookie-keys';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SavedPage({ cityId }: { cityId: string }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');

  const t = useTranslations();

  const storyFilters = {
    isSaved: true,
    ...(searchText.trim() !== '' && { searchText })
  };

  const routeFilters = {
    isSaved: true,
    ...(searchText.trim() !== '' && { searchText })
  };

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: markFavourite } = useUnFavouriteStory();
  const { mutate: markFavouriteRoute } = useUnFavouriteRoute();

  const { data: storyData, isLoading: isStoryLoading } = useStories({
    filters: storyFilters,
    skip: 0,
    limit: 0
  });
  const { data: routeData, isLoading: isRouteLoading } = useGetRouteList({
    filters: routeFilters,
    skip: 0,
    limit: 0
  });

  const handleSearch = () => {
    setSearchText(searchQuery);
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const authToken = Cookies.get(AUTH_TOKEN);
    if (authToken) {
      setCurrentUserId(JSON.parse(authToken).user._id);
    }
  }, []);

  const filteredData = React.useMemo(() => {
    if (activeTab === 'stories') {
      return storyData?.data?.data || [];
    } else {
      return routeData?.data?.data || [];
    }
  }, [activeTab, storyData, routeData]);

  const removeSavedStory = (data: any) => {
    markFavourite(data._id);
  };

  const removeSavedRoute = (data: any) => {
    // markFavourite()
    markFavouriteRoute(data._id);
  };

  return (
    <PageContainer scrollable mobileNavPage={true}>
      <div className="flex flex-col">
        <div className="fixed top-0 z-20 w-full bg-white px-4 py-3 md:max-w-[414px]">
          <MobileHeader
            title={
              activeTab === 'stories'
                ? `${t('savedStories')}`
                : `${t('savedRoutes')}`
            }
            backHref="/home/profile"
            variant="simple"
          />
          <div className="relative pt-4">
            <div className="flex w-full items-center space-x-2 rounded-md bg-white capitalize ring-1 ring-gray-200">
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
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${
                  activeTab === 'stories'
                    ? 'border-main text-main'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t('stories')}
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${
                  activeTab === 'routes'
                    ? 'border-main text-main'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t('routes')}
              </button>
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-3 p-4 pt-[180px]`}>
          {activeTab === 'stories'
            ? filteredData.map((story) => (
                <ArticleCard
                  key={story._id}
                  data={story}
                  showDeleteButton={true}
                  remove={removeSavedStory}
                  onClickFunc={() =>
                    router.push(
                      `/home/cities/${
                        typeof story?.cityRef === 'string'
                          ? story?.cityRef
                          : story?.cityRef?._id
                      }/stories/${story._id}`
                    )
                  }
                />
              ))
            : filteredData.map((route) => (
                <ArticleCard
                  key={route._id}
                  data={route}
                  showDeleteButton={true}
                  remove={removeSavedRoute}
                  onClickFunc={() => router.push(`/home/routes/${route._id}`)}
                />
              ))}
        </div>

        {filteredData.length === 0 && !isStoryLoading && !isRouteLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <p className="text-lg font-medium">
              {activeTab === 'stories'
                ? t('noStoriesFound')
                : t('noRoutesFound')}
            </p>
            {/* <p className="mt-1">Try adjusting your filters or search terms</p> */}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
