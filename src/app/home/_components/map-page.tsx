'use client';

// MapsPage.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import LocationCarousel from './location-carousel';
import MapWithMarker from './mapbox-map-page';
import { useFetchCity } from '@/hooks/home/use-home';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@/config/cookie-keys';
import { useTranslations } from 'next-intl';

// Define location type for TypeScript
export type Location = {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  description?: string;
  image?: string;
  stories?: number;
  routes?: number;
  country: string;
  location?: {
    coordinates: number[];
    type: string;
  };
  _id?: string;
  city?: string;
  photo?: string;
  noOfStories?: number;
  noOfRoutes?: number;
};

const MapsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [cities, setCities] = useState<Location[]>([]);
  const [center, setCenter] = useState<any>({});
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState(null);
  const { mutate: fetchCity, data } = useFetchCity();

  const t = useTranslations();

  useEffect(() => {
    if (data?.data) {
      setCities(data.data);
      if (data?.data?.length) {
        setCenter({
          lat: data.data[0].location.coordinates[1],
          lng: data.data[0].location.coordinates[0]
        });
      }
    }
  }, [data]);

  const fetchCityFunc = async () => {
    await fetchCity({
      coordinate: location,
      filters: {fromHome: true}
    });
  };

  useEffect(() => {
    if (location) {
      fetchCityFunc();
    }
  }, [location]);

  useEffect(() => {
    const authToken = Cookies.get(AUTH_TOKEN);
    if (authToken) {
      setUserName(JSON.parse(authToken).user.personalInfo.firstName);
    }

    let loc = [4.9, 52.378];

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loc = [position.coords.longitude, position.coords.latitude];
          setLocation(loc);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation(loc);
        }
      );
    } else {
      console.log('Geolocation not available');
      setLocation(loc);
    }
  }, []);

  const moveToLocation = (index: number) => {
    setCenter({
      lat: cities[index].location?.coordinates[1],
      lng: cities[index].location?.coordinates[0]
    });
    setCurrentLocationIndex(index);
  };

  const handleLocationChange = (index: number) => {
    moveToLocation(index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white md:min-w-[375px]">
      <div className="map-container absolute left-0 top-0 z-0 h-full w-full">
        <MapWithMarker
          center={center}
          locations={
            cities.length
              ? cities.map((city) => {
                  return {
                    lat: city.location?.coordinates[1],
                    lng: city.location?.coordinates[0]
                  };
                })
              : []
          }
          currentStopIndex={currentLocationIndex}
          setCurrentStopIndex={setCurrentLocationIndex}
        />
      </div>

      <div className="flex h-full flex-col">
        <div className="z-5 relative">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-40 bg-gradient-to-b from-white to-transparent"></div>
          <div className="relative z-30 p-4">
            <h1 className="font-poppins text-2xl font-bold text-green-800">
              {t('hello')} {userName || 'Guest'}
            </h1>
            <p className="text-sm text-gray-600">
              {t('exploreOurDifferentCities')}
            </p>
          </div>{' '}
        </div>

        <div className="relative z-30 px-4">
          <div className="flex w-full max-w-full items-center space-x-2 rounded-full bg-white p-1 shadow-lg">
            <Input
              type="text"
              placeholder={t('searchCity')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none placeholder:capitalize focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              onClick={() => {}}
              className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-transparent"
            >
              <Search className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          {searchQuery && cities.length > 0 && (
            <ul className="mt-2 max-h-40 overflow-y-auto rounded-md border bg-white shadow-md">
              {cities
                .filter(
                  (city) =>
                    city.city?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((city, index) => (
                  <li
                    key={city._id}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      moveToLocation(
                        cities.findIndex((item) => item._id === city._id)
                      );
                      setSearchQuery('');
                    }}
                  >
                    {city.city}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="flex-grow"></div>

        {cities.length ? (
          <LocationCarousel
            locations={cities.map((city) => {
              return {
                id: city._id,
                name: city.city,
                country: city.country,
                lat: city.location?.coordinates[1],
                lng: city.location?.coordinates[0],
                description: 'Explore our different cities',
                image: city.photo,
                stories: city.noOfStories,
                routes: city.noOfRoutes
              };
            })}
            currentIndex={currentLocationIndex}
            onLocationChange={handleLocationChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MapsPage;
