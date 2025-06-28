import { useMutation, useQueryClient } from '@tanstack/react-query';
import { homeService } from '@/services/home.service';

// export function useFetchCity(data: any) {
//   return useQuery({
//     queryKey: ['cities'],
//     queryFn: () => homeService.fetchCities(data)
//   });
// }

export function useFetchCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: homeService.fetchCities,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      return data;
    },
    onError: (error: any) => {
      // toast.error(error?.message || 'Failed to add city');
    }
  });
}
