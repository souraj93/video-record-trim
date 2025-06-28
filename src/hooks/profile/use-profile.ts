import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  profileService,
  ChangePasswordData,
  ProfileData
} from '@/services/profile.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '@/config/cookie-keys';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to update profile');
    // }
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangePasswordData) =>
      profileService.changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Password changed successfully');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to change password');
    // }
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: profileService.logout,
    onSuccess: () => {
      // Clear auth token
      Cookies.remove(AUTH_TOKEN);
      // Show success message
      toast.success('Logged out successfully');
      // Redirect to login
      router.push('/auth/sign-in');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to logout');
    // }
  });
}

export function useAccountDelete() {
  const router = useRouter();

  return useMutation({
    mutationFn: profileService.deleteAccount,
    onSuccess: () => {
      // Clear auth token
      Cookies.remove(AUTH_TOKEN);
      // Show success message
      toast.success('Account deleted successfully');
      // Redirect to login
      router.push('/auth/sign-in');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to logout');
    // }
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile
  });
}
