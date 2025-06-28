import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import RoutesDetailPage from '../_components/route-detail-page';

export const metadata: Metadata = {
  title: 'Routes | Roods',
  description: 'Details of the Routes'
};

export default function Page({ params }: { params:  string  }) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <RoutesDetailPage params={params} />
      </Suspense>
    </>
  );
}
