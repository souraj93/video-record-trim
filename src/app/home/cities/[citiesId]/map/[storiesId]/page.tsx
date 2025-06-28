import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import StoryDetailMapPage from '../../stories/_components/story-map-detail-page';

export const metadata: Metadata = {
  title: 'Story Details',
  description: 'Listen to city stories'
};

export default function Page({
  params
}: {
  params: { storiesId: string; citiesId: string };
}) {
  return (
    <Suspense fallback={<PageLoader />}>
      <StoryDetailMapPage storyId={params.storiesId} cityId={params.citiesId} />
    </Suspense>
  );
}
