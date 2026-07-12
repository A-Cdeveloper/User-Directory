import { useQuery } from '@tanstack/react-query';
import { getUsers, type GetUsersParams } from '@/features/users/api/usersApi';

export const useUsers = (params: GetUsersParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
};
