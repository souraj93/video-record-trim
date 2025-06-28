import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  routeService,
  RouteListParams,
  AddRouteData
} from '@/services/route.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useGetRouteList(params: RouteListParams) {
  return useQuery({
    queryKey: ['routes', params],
    queryFn: () => routeService.getRoutes(params)
  });
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: ['route', id],
    queryFn: () => routeService.getRoute(id)
  });
}

export function useAddRoute() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: routeService.addRoute,
    onSuccess: () => {
      toast.success('Route added successfully');
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      router.push('/dashboard/content/route');
    },
    onError: (error: any) => {
      // toast.error(error?.message || 'Failed to add route');
    }
  });
}

export function useUpdateRoute(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddRouteData) => routeService.updateRoute(id, data),
    onSuccess: () => {
      toast.success('Route updated successfully');
      queryClient.invalidateQueries({ queryKey: ['routes'] });
      router.push('/dashboard/content/route');
    },
    onError: (error: any) => {
      // toast.error(error?.message || 'Failed to update route');
    }
  });
}

export function useDeleteRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(id: string) => routeService.deleteRoute(id),
    onSuccess: () => {
      toast.success('Route deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
    onError: (error: any) => {
      // toast.error(error?.message || 'Failed to delete route');
    }
  });
}

export function useUnFavouriteRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: routeService.unFavouriteRoute,
    onSuccess: () => {
      toast.success('Route unsaved successfully');
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update route');
    }
  });
}

export function useMarkFavouriteRoute(
  id: string,
  storyData?: any,
  currentUserId?: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => routeService.markFavouriteRoute(id, data),

    // Add optimistic update
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['route', id] });
      // Snapshot the previous value
      const previousStory = queryClient.getQueryData(['route', id]);

      // Optimistically update the cache
      queryClient.setQueryData(['route', id], (old: any) => {
        if (!old || !old.data) return old;

        const newSavedByRefs = [...(old.data.savedByRefs || [])];
        if (newData.isSaved) {
          // Add current user to savedByRefs if not already there
          if (currentUserId && !newSavedByRefs.includes(currentUserId)) {
            newSavedByRefs.push(currentUserId);
          }
        } else {
          // Remove current user from savedByRefs
          if (currentUserId) {
            const index = newSavedByRefs.indexOf(currentUserId);
            if (index > -1) {
              newSavedByRefs.splice(index, 1);
            }
          }
        }

        return {
          ...old,
          data: {
            ...old.data,
            savedByRefs: newSavedByRefs
          }
        };
      });

      // Return previous value for rollback and the action being performed
      return {
        previousStory,
        isAdding: newData.isSaved // Track whether we're adding or removing
      };
    },

    onSuccess: (data, variables, context) => {
      // Different toast messages based on whether we're adding or removing
      if (context?.isAdding) {
        toast.success('Route added to favorites');
      } else {
        toast.success('Route removed from favorites');
      }
    },

    onError: (error: any, newData, context) => {
      // Roll back to the previous state if there's an error
      if (context?.previousStory) {
        queryClient.setQueryData(['route', id], context.previousStory);
      }

      // Different error messages based on the action
      if (context?.isAdding) {
        toast.error(error?.message || 'Failed to add to favorites');
      } else {
        toast.error(error?.message || 'Failed to remove from favorites');
      }
    },

    // Optional: refetch after settlement to ensure server and client are in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['route', id] });
    }
  });
}
