import { Metadata } from 'next';
import { Suspense } from 'react';
import StoryDetailPage from '../_components/story-detail-page';
import PageLoader from '@/components/page-loader';

export const metadata: Metadata = {
  title: 'Story Details | Roods',
  description: 'Listen to city stories'
};

export default function Page({
  params
}: {
  params: { storiesId: string; citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <StoryDetailPage storyId={params.storiesId} cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
