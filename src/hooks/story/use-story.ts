'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  storyService,
  StoryListParams,
  AddStoryData,
  MarkFavouriteStory
} from '@/services/story.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useStories(params: StoryListParams, isMap: boolean, isFetch: boolean = true) {
  return useQuery({
    queryKey: ['stories', params],
    enabled: isFetch,
    queryFn: async () => {
      try {
        const response = await storyService.getStories(params, isMap);
        return response;
      } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
      }
    }
  });
}

export function useStory(id: string) {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: () => storyService.getStory(id)
  });
}

export function useMarkFavouriteStory(
  id: string,
  storyData?: any,
  currentUserId?: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MarkFavouriteStory) =>
      storyService.markFavouriteStory(id, data),

    // Add optimistic update
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['stories', id] });

      // Snapshot the previous value
      const previousStory = queryClient.getQueryData(['stories', id]);

      // Optimistically update the cache
      queryClient.setQueryData(['stories', id], (old: any) => {
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
        toast.success('Story added to favorites');
      } else {
        toast.success('Story removed from favorites');
      }
    },

    onError: (error: any, newData, context) => {
      // Roll back to the previous state if there's an error
      if (context?.previousStory) {
        queryClient.setQueryData(['stories', id], context.previousStory);
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
      queryClient.invalidateQueries({ queryKey: ['stories', id] });
    }
  });
}

export function useUpdateStory(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddStoryData) => storyService.updateStory(id, data),
    onSuccess: () => {
      toast.success('Story updated successfully');
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      router.push('/dashboard/content/story');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update story');
    }
  });
}

export function useUnFavouriteStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storyService.unFavouriteStory,
    onSuccess: () => {
      toast.success('Story unsaved successfully');
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update story');
    }
  });
}
