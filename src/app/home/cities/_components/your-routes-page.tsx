'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import MobileBottomNav from '@/components/layout/mobile-nav';
import RouteCard from '@/app/home/routes/_components/RouteCard';
import MobileHeader from '@/app/home/_components/mobile-header';
import { useStories, useStory } from '@/hooks/story/use-story';
import { useDeleteRoute, useGetRouteList } from '@/hooks/route/use-route';
import FavouriteRoutes from './favourite-routes';
import Cookies from 'js-cookie';
import { AUTH_TOKEN, STORY_IDS } from '@/config/cookie-keys';
import { useTranslations } from 'next-intl';
interface YourRoutesDetailsPageProps {
  cityId: string;
}

export default function YourRoutesDetailsPage({
  cityId
}: YourRoutesDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('create');
    const { mutate: removeRouteFunc } = useDeleteRoute();

  const storyFilters = {
    // isNewStory: true,
    cityRef: cityId
  };

  const t = useTranslations();

  const userId = Cookies.get(AUTH_TOKEN);

  const routeFilters = {
    cityRef: cityId,
    userRef: userId && JSON.parse(userId).user._id,
    skip: 0,
    limit: 0
  };

  const { data: routeData, isLoading: isRouteLoading } = useGetRouteList({
    filters: routeFilters
  });

  useEffect(() => {
    Cookies.remove(STORY_IDS);
  }, []);

  const removeRoute = (id: string) => {
    removeRouteFunc(id);
  }

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <div className="flex w-full flex-col space-y-4 p-4 pb-20">
        <MobileHeader
          title="Your Routes"
          backHref={`/home/cities/${cityId}`}
          variant="simple"
          useHref={true}
        />

        <div className="w-full border-b border-gray-200">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab('create')}
              className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'create'
                ? 'border-main text-main'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              {t('createRoute')}
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${activeTab === 'routes'
                ? 'border-main text-main'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              {t('yourRoutes')}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {activeTab === 'create' ? (
            <Link
              href={`/home/cities/${cityId}/routes/create`}
              className="w-full"
            >
              <div className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-200 px-4 py-6">
                <div className="rounded-full bg-[#134C37] p-2">
                  <Plus size={24} color="#fff" />
                </div>
                <span className="text-lg font-medium">{t('addNewRoute')}</span>
              </div>
            </Link>
          ) : (
            <>
              {routeData?.data.data.length === 0 && !isRouteLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <p className="text-lg font-medium">
                    {t('noRoutesFound')}
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
