import axiosInstance from '@/lib/axios/axios.interceptor';

const PROFILE_API = '/account/user/profile';

export interface ProfileData {
  personalInfo?: {
    phone: { countryCode: string; number: string };
    firstName: string;
    lastName: string;
    // email: string;
    profilePicture?: string;
    dob: string;
    gender: string;
    nationality: string;
  };
  // notificationPreference: {
  //   newStoriesOrRoute?: boolean;
  //   savedStoriesAndRoutes?: boolean;
  // };
  isNotificationEnabled?: boolean;
  // accountStatus: string;
  // userType: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const profileService = {
  getProfile: async () => {
    const response = await axiosInstance.get(PROFILE_API);
    return response.data;
  },

  updateProfile: async (data: ProfileData) => {
    const response = await axiosInstance.post(`${PROFILE_API}/update`, data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.post(`${PROFILE_API}/delete-account`);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await axiosInstance.put(
      `${PROFILE_API}/change-password`,
      data
    );
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.put(`${PROFILE_API}/logout`);
    return response.data;
  }
};
