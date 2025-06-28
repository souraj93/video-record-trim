'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import MobileBottomNav from '@/components/layout/mobile-nav';
import RouteCard from './_components/RouteCard';
import MobileHeader from '../_components/mobile-header';

// Dummy routes data
const dummyRoutes = [
  {
    id: 'route-01',
    title: 'Canal District Walk',
    distance: '1.1 km away',
    length: '7.5km long',
    image: '/bg-auth.jpg'
  },
  {
    id: 'route-02',
    title: 'Museum Quarter Tour',
    distance: '2.3 km away',
    length: '5.2km long',
    image: '/bg-auth.jpg'
  },
  {
    id: 'route-03',
    title: 'De Pijp Neighborhood',
    distance: '3.5 km away',
    length: '4.1km long',
    image: '/bg-auth.jpg'
  }
];

export default function RoutesPage() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <PageContainer scrollable mobileNavPage={true}>
      <div className="flex w-full flex-col space-y-4 p-4 pb-20">
        <MobileHeader
          title="Your Routes"
          backHref="/home/cities"
          variant="simple"
        />

        <div className="w-full border-b border-gray-200">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab('create')}
              className={`w-1/2 border-b-4 px-1 pb-4 text-sm font-medium ${
                activeTab === 'create'
                  ? 'border-main text-main'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Create Route
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
          {activeTab === 'create' ? (
            <Link href="/home/routes/create" className="w-full">
              <div className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-400/80 px-4 py-6">
                <div className="rounded-full bg-[#134C37] p-2">
                  <Plus size={24} color="#fff" />
                </div>
                <span className="text-lg font-medium">Add a route</span>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              {dummyRoutes.map((route, index) => (
                <RouteCard key={route.id} route={route} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
