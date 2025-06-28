import React, { Suspense } from 'react';
import CategoryDetailsPage from '../../../_components/category-details.page';
import { Loader2 } from 'lucide-react';
import PageLoader from '@/components/page-loader';
import Donate from '@/app/home/profile/_components/donate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Roods',
  description: 'Details of the Categories'
};


export default function TabPage({
  params
}: {
  params: { categoryId: string; citiesId: string };
}) {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        {params.categoryId !== "donate" ? <CategoryDetailsPage
          categoryId={params.categoryId === "activities" ? "sleep" : params.categoryId}
          cityId={params.citiesId}
        /> : <Donate />}
      </Suspense>
    </>
  );
}
