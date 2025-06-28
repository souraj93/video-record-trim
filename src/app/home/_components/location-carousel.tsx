'use client';
import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { Location } from './map-page';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

interface LocationCarouselProps {
  locations: Location[];
  currentIndex: number;
  onLocationChange: (index: number) => void;
}

const LocationCarousel: React.FC<LocationCarouselProps> = ({
  locations,
  currentIndex,
  onLocationChange
}) => {
  const options: EmblaOptionsType = {
    loop: true,
    startIndex: currentIndex,
    align: 'center',
    containScroll: 'trimSnaps'
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    onLocationChange(selectedIndex);
  }, [emblaApi, onLocationChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== currentIndex) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [emblaApi, currentIndex]);

  const cityItem = (location: Location) => {
    return <>
      <Image
        src={location.image || ''}
        alt={location.name || ''}
        width={500}
        height={500}
        className="h-full w-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <div className="flex flex-col items-center justify-center text-white">
          <h2 className="text-center text-lg font-bold">
            {location.name}
          </h2>
          <p className="text-xs">{location.country}</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <p className="text-xs">{location.routes} routes</p>
            <span className="">•</span>
            <p className="text-xs">
              {location.stories} stories
            </p>
          </div>
        </div>
      </div>
    </>
  }

  return (
    <div className="embla fixed bottom-0 h-1/3 w-full overflow-hidden rounded-t-xl md:max-w-[414px]">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {locations.map((location, index) => {
            const isSelected = index === currentIndex;
            return (
              <div className="embla__slide h-full" key={location.id || index}>
                <div
                  className={`flex h-full items-center justify-center ${
                    isSelected ? 'scale-110' : 'scale-90'
                  } transition-transform duration-300`}
                >
                  {location.stories && location.routes ?
                  <div className="relative h-4/5 w-full overflow-hidden rounded-[40px] shadow-xl">
                    <Link
                      href={`/home/cities/${location.id}`}
                      className="block h-full"
                    >
                      {cityItem(location)}
                    </Link>
                  </div>:
                  <div className="relative h-4/5 w-full overflow-hidden rounded-[40px] shadow-xl">
                    <div className='block h-full cursor-pointer' onClick={() => {
                      toast.info('We are working on this.');
                    }}>
                      {cityItem(location)}
                    </div>
                  </div>}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationCarousel;
