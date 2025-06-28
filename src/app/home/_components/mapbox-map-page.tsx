'use client';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from './map-page';
import BackButton from './back-button';

// Replace with your actual token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API || '';

interface MapWithMarkerProps {
  center: { lat: number; lng: number };
  locations: { lat?: number; lng?: number }[];
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({
  center,
  locations,
  hideDetails,
  setCurrentStopIndex,
  currentStopIndex,
  isCategoryChosen,
  containerId,
  markerNotClickable,
  isBack,
  zoom,
  removeNotNeeded,
  showCurrentLocation
}) => {
  const mapContainerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the map
    return () =>
      !removeNotNeeded && mapRef?.current?.remove ? mapRef?.current?.remove() : () => {}; // cleanup on unmount
  }, []);

  const handleMarkerClick = (index: number) => {
    setCurrentStopIndex && setCurrentStopIndex(index);
    hideDetails && hideDetails(false);
  };

  const createMarkers = () => {
    if (locations?.length) {
      locations.forEach((location: any, index: number) => {
        const el = document.createElement('div');

        if (!location.categoryColor) {
          el.style.backgroundImage = 'url("/icons/map-pin.svg")';
          el.style.width = index !== currentStopIndex ? '30px' : '50px';
          el.style.height = index !== currentStopIndex ? '30px' : '50px';
        } else {
          el.style.borderRadius = '50%';
          fetch('/icons/map-pin.svg')
            .then((res) => res.text())
            .then((data) => {
              el.innerHTML = data;
              const svgPath = el.querySelector('path');
              const svg = el.querySelector('svg');

              if (svg) {
                svg.style.width = index !== currentStopIndex ? '30px' : '50px';
                svg.style.height = index !== currentStopIndex ? '30px' : '50px';
              }

              svgPath.style.fill = location.categoryColor;
            });
        }

        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.transform = 'translate(-50%, -100%)';
        el.style.cursor = 'pointer';

        !markerNotClickable &&
          el.addEventListener('click', () => handleMarkerClick(index));

        if (mapRef.current) {
          new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .addTo(mapRef.current);
        }
        
      });
    }
  };

  useEffect(() => {
    if (center && center.lat && center.lng) {
      if (mapRef.current) {
        mapRef.current.setCenter([center.lng, center.lat]);
      } else {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: center ? [center.lng, center.lat] : [88.3426, 22.5448], // Example: Victoria Memorial, Kolkata
          zoom: zoom || 12
        });

        mapRef.current.on('load', () => {
          showCurrentLocation && fetchAndWatchLocation(mapRef.current);
        });

        createMarkers();
      }
    }
  }, [center]);

  const fetchAndWatchLocation = (map) => {
      let userMarker = null;
  
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userCoords = [longitude, latitude];
            // Move marker or create it
            if (!userMarker) {
              userMarker = new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(userCoords)
                .addTo(map);
            } else {
              userMarker.setLngLat(userCoords);
            }
          },
          (error) => {
            console.error('Error fetching location:', error);
            // setLocation(loc);
          }
        );
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userCoords = [longitude, latitude];
            // Move marker or create it
            if (!userMarker) {
              userMarker = new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(userCoords)
                .addTo(map);
            } else {
              userMarker.setLngLat(userCoords);
            }
  
            // Optionally center the map on the user
            // mapRef.current.setCenter(userCoords);
          },
          (error) => {
            console.error('Error watching position:', error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 10000
          }
        );
      } else {
        console.log('Geolocation not supported');
      }
    };

  useEffect(() => {
    if (isCategoryChosen !== undefined && mapRef?.current) {
      const markersOnMap = document.querySelectorAll('.mapboxgl-marker');
      markersOnMap.length &&
        markersOnMap.forEach((marker) => {
          marker.remove();
        });
      createMarkers();
    }
  }, [locations?.length]);

  useEffect(() => {
    if (
      mapRef.current &&
      locations &&
      locations.length &&
      currentStopIndex !== undefined
    ) {
      const markersOnMap = document.querySelectorAll(`.mapboxgl-marker${isCategoryChosen === undefined ? '': ' svg'}`);
      for (let i = 0; i< markersOnMap.length; i++) {

        if (markersOnMap[i]) {
          markersOnMap[i].style.width = i !== currentStopIndex ? '30px' : '50px';
          markersOnMap[i].style.height = i !== currentStopIndex ? '30px' : '50px';
        }
      }
    }
  }, [currentStopIndex]);

  return (
    <>
      {isBack ? (
        <div className="absolute left-3 top-2 z-10">
          <BackButton />
        </div>
      ) : null}
      {containerId !== undefined ? (
        <div id={containerId} ref={mapContainerRef} className="h-full w-full"  />
      ) : (
        <div ref={mapContainerRef} className="h-full w-full" />
      )}
    </>
  );
};

export default MapWithMarker;
