import { api } from '@/lib/api';
import type { GetUsersParams } from '@/types/users';
import type { UsersResponse } from '@/types/user';
import { isAxiosError } from 'axios';

export const getUsers = async (params: GetUsersParams = {}): Promise<UsersResponse> => {
  try {
    const { data } = await api.get<UsersResponse>('/users', {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        nationalities: params.nationalities?.join(','),
        hobbies: params.hobbies?.join(','),
        sortBy: params.sortBy,
        sortDir: params.sortDir,
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error ?? 'Failed to fetch users');
    }
    throw error;
  }
};
