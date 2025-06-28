import axiosInstance from '@/lib/axios/axios.interceptor';
import {
  LOGIN_API,
  SIGNUP_API,
  SIGNUP_VERIFICATION_API,
  SIGNUP_VERIFICATION_RESEND_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_API,
  SOCIAL_LOGIN_API
} from '@/lib/axios/apis';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface SignUpVerification {
  email: string;
  otp: string;
}
interface SignUpVerificationResend {
  email: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post(LOGIN_API, credentials);
    return response.data;
  },

  socialLogin: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post(SOCIAL_LOGIN_API, credentials);
    return response.data;
  },

  signUp: async (credentials: SignUpCredentials) => {
    const response = await axiosInstance.post(SIGNUP_API, credentials);
    return response.data;
  },

  signUpVerification: async (data: SignUpVerification) => {
    const response = await axiosInstance.post(SIGNUP_VERIFICATION_API, data);
    return response.data;
  },

  signUpVerificationResend: async (data: SignUpVerificationResend) => {
    const response = await axiosInstance.post(
      SIGNUP_VERIFICATION_RESEND_API,
      data
    );
    return response.data;
  },

  requestPasswordReset: async (data: ForgotPasswordData) => {
    const response = await axiosInstance.post(FORGOT_PASSWORD_API, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await axiosInstance.post(RESET_PASSWORD_API, data);
    return response.data;
  }
};
