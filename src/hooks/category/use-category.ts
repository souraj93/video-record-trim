import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  categoryService,
  CategoryListParams,
  AddCategoryData
} from '@/services/category.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useCategories(params: CategoryListParams) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getCategories(params)
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getCategory(id)
  });
}
