import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import CreateRoutePreviewDetailPage from '@/app/home/cities/_components/route-overview-page';

export const metadata: Metadata = {
  title: 'Explore Tab',
  description: 'Details of the Explore Tab'
};

export default function CreateRoutePreviewPage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <CreateRoutePreviewDetailPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
