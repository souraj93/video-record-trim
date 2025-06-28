import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { AUTH_TOKEN, PREFERRED_LANGUAGE, STORY_IDS, USER_ACCESS } from '@/config/cookie-keys';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Save entire auth data to cookies
      Cookies.set(
        AUTH_TOKEN,
        JSON.stringify({
          accessToken: data.data.accessToken,
          user: {
            personalInfo: data.data.user.personalInfo,
            _id: data.data.user._id
          }
        })
      );
      Cookies.remove(PREFERRED_LANGUAGE);
      Cookies.remove(STORY_IDS);
      // if (data.data?.user?.roleInfo && Object.keys(data.data?.user?.roleInfo).length) {
      //   let access = "superAdmin";
      //   if (data.data?.user?.roleInfo?.roleId && Object.keys(data.data?.user?.roleInfo?.roleId).length) {
      //     access = data.data?.user?.roleInfo?.roleId.permissions.map(each => each.moduleKey).join(",");
      //   }
      //   Cookies.set(USER_ACCESS, JSON.stringify(access));
      // }
      setTimeout(() => {
        Cookies.set(PREFERRED_LANGUAGE, data.data.user.preferredLanguage || 'en');
      }, 1000);

      toast.success('Login successful');
      router.push('/home');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Login failed');
    // }
  });
}

export function useSocialLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.socialLogin,
    onSuccess: (data) => {
      // Save entire auth data to cookies
      Cookies.set(
        AUTH_TOKEN,
        JSON.stringify({
          accessToken: data.data.accessToken,
          user: {
            personalInfo: data.data.user.personalInfo,
            _id: data.data.user._id
          }
        })
      );
      Cookies.remove(PREFERRED_LANGUAGE);
      Cookies.remove(STORY_IDS);
      // if (data.data?.user?.roleInfo && Object.keys(data.data?.user?.roleInfo).length) {
      //   let access = "superAdmin";
      //   if (data.data?.user?.roleInfo?.roleId && Object.keys(data.data?.user?.roleInfo?.roleId).length) {
      //     access = data.data?.user?.roleInfo?.roleId.permissions.map(each => each.moduleKey).join(",");
      //   }
      //   Cookies.set(USER_ACCESS, JSON.stringify(access));
      // }
      setTimeout(() => {
        Cookies.set(PREFERRED_LANGUAGE, data.data.user.preferredLanguage || 'en');
      }, 1000);
      toast.success('Login successful');
      router.push('/home');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Login failed');
    // }
  });
}

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (_, variables) => {
      console.log('aaa', variables);
      toast.success('Check your email for OTP verification');
      router.push(
        `/auth/signup-verification?email=${encodeURIComponent(variables.email)}`
      );
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Login failed');
    // }
  });
}

export function useSignUpVerification() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signUpVerification,
    onSuccess: (data) => {
      // Save entire auth data to cookies
      Cookies.set(
        AUTH_TOKEN,
        JSON.stringify({
          accessToken: data.data.accessToken,
          user: {
            personalInfo: data.data.user.personalInfo,
            _id: data.data.user._id
          }
        })
      );
      // if (data.data?.user?.roleInfo && Object.keys(data.data?.user?.roleInfo).length) {
      //   let access = "superAdmin";
      //   if (data.data?.user?.roleInfo?.roleId && Object.keys(data.data?.user?.roleInfo?.roleId).length) {
      //     access = data.data?.user?.roleInfo?.roleId.permissions.map(each => each.moduleKey).join(",");
      //   }
      //   Cookies.set(USER_ACCESS, JSON.stringify(access));
      // }

      toast.success('Sign up successful, Welcome to Roods');
      router.push('/home');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Login failed');
    // }
  });
}

export function useSignUpVerificationResend() {
  return useMutation({
    mutationFn: authService.signUpVerificationResend,
    onSuccess: () => {
      toast.success('OTP sent to your email');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to send OTP');
    // }
  });
}
export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.requestPasswordReset,
    onSuccess: (_, variables) => {
      toast.success('OTP sent to your email');
      // Redirect to reset password with email
      router.push(
        `/auth/reset-password?email=${encodeURIComponent(variables.email)}`
      );
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to send OTP');
    // }
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful');
      router.push('/auth/sign-in');
    }
    // onError: (error: any) => {
    //   toast.error(error?.message || 'Password reset failed');
    // }
  });
}
