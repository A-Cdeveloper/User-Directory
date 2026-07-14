import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/api/usersApi';
import type { GetUsersParams } from '@/types/users';

export const useUsers = (params: GetUsersParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
};
