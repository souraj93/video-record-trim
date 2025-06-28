import { Metadata } from 'next';
import { Suspense } from 'react';
import YourRoutesDetailsPage from '../../_components/your-routes-page';
import PageLoader from '@/components/page-loader';

export const metadata: Metadata = {
  title: 'Create Routes | Roods',
  description: 'Create customised routes'
};

export default function YourRoutesPage({
  params
}: {
  params: { citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <YourRoutesDetailsPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
