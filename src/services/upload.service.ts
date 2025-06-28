import axiosInstance from '@/lib/axios/axios.interceptor';

const UPLOAD_API = '/account/admin/common';

export const uploadService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axiosInstance.post(
      `${UPLOAD_API}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  },

  uploadAudio: async (file: File) => {
    const formData = new FormData();
    formData.append('audio', file);

    const response = await axiosInstance.post(
      `${UPLOAD_API}/upload-audio`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  },

  uploadVideo: async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);

    const response = await axiosInstance.post(
      `${UPLOAD_API}/upload-video`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }
};
