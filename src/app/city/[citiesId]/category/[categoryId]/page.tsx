import React, { Suspense } from 'react';
import PageLoader from '@/components/page-loader';
import CategoryDetailsPage from '@/app/home/cities/_components/category-details.page';
import Donate from '@/app/home/profile/_components/donate';

export default function TabPage({
  params
}: {
  params: { categoryId: string; citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        {params.categoryId !== "donate" ? <CategoryDetailsPage
                  categoryId={params.categoryId}
                  cityId={params.citiesId}
                /> : <Donate />}
      </Suspense>
    </>
  );
}
