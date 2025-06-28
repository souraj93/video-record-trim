import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import StoryDetailPage from '@/app/home/cities/[citiesId]/stories/_components/story-detail-page';

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
    <>
      <Suspense fallback={<PageLoader />}>
        <StoryDetailPage storyId={params.storiesId} cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
