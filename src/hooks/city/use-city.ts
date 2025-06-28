import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cityService,
  CityListParams,
  AddCityData
} from '@/services/city.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useCities(params: CityListParams) {
  return useQuery({
    queryKey: ['cities', params],
    queryFn: () => cityService.getCities(params)
  });
}

export function useCity(id: string) {
  return useQuery({
    queryKey: ['city', id],
    queryFn: () => cityService.getCity(id)
  });
}

export function useAllCities() {
  return useQuery({
    queryKey: ['cities-all'],
    queryFn: () => cityService.getAllCities()
  });
}
