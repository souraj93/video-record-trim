import { Metadata } from 'next';
import { Suspense } from 'react';
import CityDetailsPage from '../_components/city-details-page';
import PageLoader from '@/components/page-loader';

export const metadata: Metadata = {
  title: 'Cities | Roods',
  description: 'Details of the Cities'
};

export default function Page({ params }: { params: { citiesId: string } }) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <CityDetailsPage cityId={params.citiesId} />
      </Suspense>
    </>
  );
}
