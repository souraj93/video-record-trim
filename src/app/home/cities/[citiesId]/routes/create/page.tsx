import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateRouteDetailPage from '../../../_components/create-route-page';
import PageLoader from '@/components/page-loader';

export const metadata: Metadata = {
  title: 'Explore Tab',
  description: 'Details of the Explore Tab'
};

export default function CreateRoutesPage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <CreateRouteDetailPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
