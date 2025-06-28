import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  languageService,
  LanguageListParams,
  AddLanguageData
} from '@/services/language.service';
import { toast } from 'sonner';

export function useLanguages(params: LanguageListParams) {
  return useQuery({
    queryKey: ['languages', params],
    queryFn: () => languageService.getLanguages(params)
  });
}

export function useUpdateLanguagePreference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) =>
      languageService.updateLanguagePreference(code),
    onSuccess: () => {
      toast.success('Language preference updated successfully');
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to update language');
    // }
  });
}
