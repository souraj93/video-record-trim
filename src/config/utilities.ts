import Cookies from 'js-cookie';
import { AUTH_TOKEN, PREFERRED_LANGUAGE } from './cookie-keys';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API || '';

export const checkLanguageOrSetDefault = (arr) => {
  let profileLang = '';
  const lang = Cookies.get(PREFERRED_LANGUAGE);
  if (lang) {
    profileLang = lang;
  }
  let finalLang = {};

  if (arr && arr.length) {
    let matched = false;
    let engData = {};
    arr.forEach((lang) => {
      if (lang.languageRef.code === 'en') {
        engData = lang;
      }
      if (lang.languageRef.code === profileLang) {
        matched = true;
        finalLang = lang;
      }
    });

    if (!matched) {
      finalLang = engData;
    }
  }

  return finalLang;
};

export const getUrl = (api: string) => {
  const token = Cookies.get(AUTH_TOKEN);
  if (token) {
    return api;
  }

  return api.split('/account')[1];
};

export const isLoggedIn = () => {
  const token = Cookies.get(AUTH_TOKEN);
  return token ? true : false;
};



export const getDistance = async (from, to) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(url);
    const route = response.data.routes[0];

    const distanceKm = route.distance / 1000; // meters to kilometers
    // const durationMin = route.duration / 60;  // seconds to minutes

    // console.log(`🚗 Distance: ${distanceKm.toFixed(2)} km`);
    // console.log(`🕒 Duration: ${durationMin.toFixed(2)} mins`);

    return `${distanceKm.toFixed(2)} km`;
  } catch (err) {
    console.error('Error fetching directions:', err.message);
  }
}

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 🌍 Radius of the Earth in km (use 3958.8 for miles)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 🧮 Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



