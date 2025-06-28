'use client';

import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PageContainer from '@/components/layout/page-container';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
const DynamicStoriesCarousel = dynamic(
  () => import('../[citiesId]/stories/_components/StoriesCarousel'),
  { ssr: false }
);
import Link from 'next/link';
import { useCityStore } from '@/lib/store/useCityStore';
import { useCity } from '@/hooks/city/use-city';
import { checkLanguageOrSetDefault } from '@/config/utilities';

interface CityDetailsPageProps {
  cityId: string;
  categoryId: string;
}

export default function CategoryDetailsPage({
  categoryId,
  cityId
}: CityDetailsPageProps) {
  const { data: cityData, isLoading } = useCity(cityId);

  const t = useTranslations()

  const categoryData = cityData?.data?.otherInformation?.[categoryId];

  const storiesData = {
    ...categoryData,
    images:
      categoryData?.images?.map((url, index) => ({
        image: url,
        alt: `Story image ${index + 1}`
      })) || []
  };


  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <div>
        <DynamicStoriesCarousel
          storiesData={storiesData}
          backButtonShow={true}
          backButtonHref={`/home/cities/${cityId}`}
        />

        <section className="flex w-full flex-col">
          <div className="mt-4 p-4">
            <h3 className="text-center text-lg font-bold capitalize text-main">
              {t(`${categoryId === 'sleep' ? 'activities' : categoryId}`)}
            </h3>
            {categoryData && (
              <p
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: checkLanguageOrSetDefault(categoryData?.description).text }}
              />
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
