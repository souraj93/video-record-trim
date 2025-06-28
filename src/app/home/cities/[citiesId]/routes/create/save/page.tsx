import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import SaveCreatedRouteDetailPage from '@/app/home/cities/_components/save-route-detail-page';

export const metadata: Metadata = {
  title: 'Explore Tab',
  description: 'Details of the Explore Tab'
};

export default function SaveCreatedRoutePage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <SaveCreatedRouteDetailPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
