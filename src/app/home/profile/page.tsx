import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import ProfilePageView from './_components/profile-page-view';

export const metadata: Metadata = {
  title: 'Profile | Roods',
  description: 'Details of the Profile'
};

export default function ProfilePage() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <ProfilePageView />
      </Suspense>
    </>
  );
}
