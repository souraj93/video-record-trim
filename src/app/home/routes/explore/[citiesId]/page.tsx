import { Metadata } from 'next';
import { Suspense } from 'react';

import PageLoader from '@/components/page-loader';
import ExploreTabPage from '../_components/explore-tab-page';

export const metadata: Metadata = {
  title: 'Explore | Roods',
  description: 'Explore the stories and routes'
};

export default function ExplorePage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <ExploreTabPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
