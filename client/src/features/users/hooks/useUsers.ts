import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/api/usersApi';
import type { GetUsersParams } from '@/types/users';

export const useUsers = (params: GetUsersParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: ({ pageParam }) => getUsers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
  });
};
