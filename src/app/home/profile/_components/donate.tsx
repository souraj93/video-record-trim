'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import StoriesCarousel from '../../cities/[citiesId]/stories/_components/StoriesCarousel';
import { useConfig } from '@/hooks/config/use-config';

// export const metadata: Metadata = {
//   title: 'Cities',
//   description: 'Data'
// };

export default function Donate() {
  const { data: configData, isPending } = useConfig();
  console.log('configData', configData);
  console.log('configData2', configData?.data.donate.description);

  const title = configData?.data.donate.title;
  const description = configData?.data?.donate?.description;
  const donationUrl = configData?.data?.donate?.link;
  const carouselImages = {
    images: configData?.data?.donate?.images.map(
      (url: string, index: number) => ({
        image: url,
        alt: `Image ${index + 1}`
      })
    )
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <StoriesCarousel
        storiesData={carouselImages}
        backButtonHref="/home/profile"
        backButtonShow={true}
      />
      <div className="flex w-full flex-col">
        <section className="mt-4 p-4">
          <h3 className="text-center font-poppins text-2xl font-bold text-main">
            {title || 'Donate'}
          </h3>
          <p className="mt-4">
            {description || 'Support us by making a donation!'}
          </p>
          <Button
            className="mt-4 w-full bg-main hover:bg-main"
            type="submit"
            size={'simple'}
            onClick={() => window.open(donationUrl)}
          >
            Donate
          </Button>
          <p className="mt-4">Thank you for keeping stories alive!♥️</p>
        </section>
      </div>
    </PageContainer>
  );
}
