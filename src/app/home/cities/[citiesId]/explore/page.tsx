import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import HomeExplorePage from './_components/home-explore-page';

export const metadata: Metadata = {
  title: 'Explore Tab | Roods',
  description: 'Details of the Explore Tab'
};

export default function ExplorePage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <HomeExplorePage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
