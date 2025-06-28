import axiosInstance from '@/lib/axios/axios.interceptor';
import { CITY_API } from '@/lib/axios/apis';
import { getUrl } from '@/config/utilities';

interface CityData {}

export const homeService = {
  fetchCities: async (data: CityData) => {
    const response = await axiosInstance.post(`${getUrl(CITY_API)}/list`, data);
    return response.data;
  }
};
