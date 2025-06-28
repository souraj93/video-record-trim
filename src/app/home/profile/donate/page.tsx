import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import Donate from '../_components/donate';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Details of the Donate page'
};

export default function DonatePage() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Donate />
      </Suspense>
    </>
  );
}
