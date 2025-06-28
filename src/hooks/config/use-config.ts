import { useMutation, useQuery } from '@tanstack/react-query';
import { configService } from '@/services/config.service';
import { toast } from 'sonner';

export function useConfig() {
  return useQuery({
    queryKey: ['config', 'config'],
    queryFn: () => configService.getConfig()
  });
}
