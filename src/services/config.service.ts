import axiosInstance from '@/lib/axios/axios.interceptor';

const CONFIG_API = '/common/global-config';

export const configService = {
  getConfig: async () => {
    const response = await axiosInstance.get<any>(`${CONFIG_API}`);
    return response.data;
  }
};
