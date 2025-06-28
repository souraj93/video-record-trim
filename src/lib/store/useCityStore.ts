// store/useCityStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types
interface CategoryData {
  text: string;
  images: string[];
}

interface CityData {
  success: boolean;
  data: {
    _id: string;
    name: string;
    city: string;
    country: string;
    photo: string;
    location: {
      type: string;
      coordinates: number[];
    };
    otherInformation: {
      [key: string]: CategoryData;
    };
    noOfStories: number;
    noOfRoutes: number;
    status: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface CityStore {
  cityData: CityData | null;
  selectedCategory: string | null;
  setCityData: (data: CityData) => void;
  setSelectedCategory: (categoryId: string) => void;
  clearCityData: () => void;
}

export const useCityStore = create<CityStore>()(
  persist(
    (set) => ({
      cityData: null,
      selectedCategory: null,
      setCityData: (data) => set({ cityData: data }),
      setSelectedCategory: (categoryId) =>
        set({ selectedCategory: categoryId }),
      clearCityData: () => set({ cityData: null, selectedCategory: null })
    }),
    {
      name: 'city-storage'
    }
  )
);
