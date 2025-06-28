import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import SavedPage from './_components/saved';

export const metadata: Metadata = {
  title: 'Saved Tab',
  description: 'Details of the Saved Tab'
};

export default function ExplorePage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <SavedPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
