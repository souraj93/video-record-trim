'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Heart, HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Autoplay from "embla-carousel-autoplay"

// Define a proper type for storiesData
interface StoriesData {
  images: Array<{ image: string; alt: string }>;
}

const StoriesCarousel = ({
  storiesData,
  backButtonHref = '/home',
  backButtonShow = true
}: {
  storiesData: StoriesData;
  backButtonHref?: string;
  backButtonShow?: boolean;
}) => {
  // console.log('storiesData', storiesData);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();
    carouselApi.on('select', updateCarouselState);

    return () => {
      carouselApi.off('select', updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="relative h-80 w-full overflow-hidden">
      {backButtonShow && (
        <div className="absolute left-0 top-0 z-30 w-full p-4">
          <button
            onClick={() => router.back()}
            className="inline-block rounded-full bg-gray-500/50 p-2"
          >
            <ChevronLeft size={20} color="#fff" />
          </button>
        </div>
      )}

      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          align: 'start',
          containScroll: 'trimSnaps'
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="z-10 h-80 w-full"
      >
        <CarouselContent className="-ml-0">
          {storiesData?.images?.map((data, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <div className="relative h-80 w-full">
                <Image
                  src={data.image}
                  alt={data.alt || `Story image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-white to-transparent"></div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesCarousel;
