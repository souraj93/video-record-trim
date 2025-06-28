'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

export const RouteMap = ({
  markers,
  currentStopIndex,
  setCurrentStopIndex,
  hideDetails,
  showCurrentLocation = false,
  zoom
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef<any>(null);

  const mapIcon = 'url("/icons/map-pin.svg")';

  useEffect(() => {
    if (mapRef.current) return;

    if (markers && markers.length > 0) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current ? mapContainer.current : '',
        style: 'mapbox://styles/mapbox/light-v11',
        center: markers[0].coordinates,
        zoom: zoom || 12
      });

      mapRef.current.on('load', () => {
        if (markers.length > 1) {
          getRoute(markers.map((marker: any) => marker.coordinates));
        }
        console.log('is load ', showCurrentLocation);
        showCurrentLocation && fetchAndWatchLocation(mapRef.current);
      });
    }
  }, [markers]);

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
    if (mapRef.current && markers && markers.length > 1) {
      // Add a small delay to ensure markers are in the DOM
      setTimeout(() => {
        const markersOnMap = document.querySelectorAll('.mapboxgl-marker');
        if (markersOnMap && markersOnMap.length > 0) {
          markersOnMap.forEach((marker, index) => {
            if (index < markers.length) {
              // Make sure we're only styling valid markers
              const markerElement = marker as HTMLElement;
              if (markerElement && markerElement.style) {
                if (index !== currentStopIndex) {
                  markerElement.style.width = '25px';
                  markerElement.style.height = '35px';
                } else {
                  markerElement.style.width = '35px';
                  markerElement.style.height = '55px';
                  mapRef.current.setCenter(markers[currentStopIndex].coordinates);
                }

                // if (index !== currentStopIndex) {
                //   markerElement.style.padding = '5px 10px';
                // } else {
                //   markerElement.style.padding = '10px 15px';
                //   mapRef.current.setCenter(markers[currentStopIndex].coordinates);
                // }
              }
            }
          });
        }
      }, 300); // Small delay to ensure DOM elements are ready
    }
  }, [currentStopIndex, markers]);

  const handleMarkerClick = (index: number) => {
    setCurrentStopIndex(index);
    mapRef.current.setCenter(markers[index].coordinates);
    // Only call hideDetails if it's provided
    if (hideDetails && typeof hideDetails === 'function') {
      hideDetails(false);
    }
  };

  const getRoute = async (coords: any) => {
    if (!coords || coords.length < 2) {
      console.warn('Not enough coordinates to create a route');
      return;
    }

    const coordString = coords.map((coord: any) => coord.join(',')).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordString}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        console.error('No route found');
        return;
      }

      const route = data.routes[0].geometry;

      // Add route line to the map
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route
        }
      });

      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#134c37',
          'line-width': 3
        }
      });
    } catch (error) {
      console.error('Error fetching route:', error);
    }

    // Optionally add markers at waypoints
    // coords.forEach((coord: any, index: number) => {
    //   const el = document.createElement('div');
    //   el.style.transform = 'translate(-50%, -100%)';
    //   el.style.cursor = 'pointer';
    //   el.style.backgroundColor = 'rgb(19,76,55)';
    //   el.innerText = (index + 1).toString();
    //   el.style.color = '#fff';
    //   el.style.fontSize = '16px';
    //   el.style.textAlign = 'center';
    //   el.style.padding = currentStopIndex === index ? '10px 15px' : '5px 10px';
    //   el.style.borderRadius = '50%';
    //   el.addEventListener('click', () => handleMarkerClick(index));
    //   new mapboxgl.Marker(el).setLngLat(coord).addTo(mapRef.current);
    // });

    coords.forEach((coord: any, index: number) => {
      const el = document.createElement('div');
      const el1 = document.createElement('div');

      el.style.transform = 'translate(-50%, -100%)';
      el.style.cursor = 'pointer';
      el.style.backgroundImage = mapIcon;
      el.style.width = index !== currentStopIndex ? '25px' : '35px';
      el.style.height = index !== currentStopIndex ? '35px' : '55px';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';


      el1.innerText = (index + 1).toString();
      el1.style.backgroundColor = 'rgb(19,76,55)';
      el1.style.color = '#fff';
      el1.style.fontSize = currentStopIndex === index ? '14px' : '12px';
      el1.style.textAlign = 'center';
      // el1.style.padding = currentStopIndex === index ? '7px 15px' : '1px 7px';
      el1.style.borderRadius = '50%';
      el1.style.width = '100%';
      el1.style.height = '60%';
      el1.style.display = 'flex';
      el1.style.justifyContent = 'center';
      el1.style.alignItems = 'center';


      el.appendChild(el1);

      
      el.addEventListener('click', () => handleMarkerClick(index));
      new mapboxgl.Marker(el).setLngLat(coord).addTo(mapRef.current);
    });
  };

  return <div ref={mapContainer} className="h-full w-full rounded-md border" />;
};
