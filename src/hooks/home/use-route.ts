import { routeService } from '@/services/route.service';
import { useQuery } from '@tanstack/react-query';

export function useRoute(id: string) {
  return useQuery({
    queryKey: ['route', id],
    queryFn: () => routeService.getRoute(id)
  });
}
