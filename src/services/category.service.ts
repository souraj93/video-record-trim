import { getUrl } from '@/config/utilities';
import axiosInstance from '@/lib/axios/axios.interceptor';

const CATEGORY_API = '/account/user/category';

export interface Category {
  _id: string;
  name: string;
  colorCode: string;
  categoryType: 1 | 2 | 3;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface SingleCategoryResponse {
  success: boolean;
  data: Category;
}

export interface CategoryResponse {
  success: boolean;
  data: {
    data: Category[];
    skip: number;
    limit: number;
    total: number;
  };
}

export interface AddCategoryData {
  name: string;
  colorCode: string;
  categoryType: 1 | 2 | 3;
}

export interface CategoryListParams {
  skip?: number;
  limit?: number;
  filters?: {
    name?: string;
    type?: string;
  };
  sortConfig?: {
    name?: 'asc' | 'desc';
  };
}

export const categoryService = {
  getCategories: async (params: CategoryListParams) => {
    const { skip = 0, limit = 10, filters = {}, sortConfig = {} } = params;

    const response = await axiosInstance.post<CategoryResponse>(
      `${getUrl(CATEGORY_API)}/list?skip=${skip}&limit=${limit}`,
      {
        filters,
        sortConfig
      }
    );

    return response.data;
  },

  getCategory: async (id: string) => {
    const response = await axiosInstance.get<SingleCategoryResponse>(
      `${CATEGORY_API}/${id}`
    );
    return response.data;
  }
};
