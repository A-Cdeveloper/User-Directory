import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useUsers } from '@/features/users/hooks/useUsers';
import { getUsers } from '@/features/users/api/usersApi';
import { fakeUsersResponse } from '@/__tests__/mocks/users';
import type { UsersResponse } from '@/types/user';

vi.mock('@/features/users/api/usersApi', () => ({
  getUsers: vi.fn(),
}));

const mockedGetUsers = vi.mocked(getUsers);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const pageResponse = (page: number, hasMore: boolean): UsersResponse => ({
  ...fakeUsersResponse,
  pagination: {
    ...fakeUsersResponse.pagination,
    page,
    hasMore,
  },
});

beforeEach(() => {
  mockedGetUsers.mockReset();
});

describe('useUsers', () => {
  it('fetches the first page on mount', async () => {
    mockedGetUsers.mockResolvedValue(pageResponse(1, false));

    const { result } = renderHook(() => useUsers({ search: 'John' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetUsers).toHaveBeenCalledWith({ search: 'John', page: 1 });
    expect(result.current.data?.pages[0]).toEqual(pageResponse(1, false));
    expect(result.current.hasNextPage).toBe(false);
  });

  it('fetches the next page when hasMore is true', async () => {
    mockedGetUsers.mockImplementation(async (params = {}) =>
      pageResponse(params.page ?? 1, (params.page ?? 1) === 1),
    );

    const { result } = renderHook(() => useUsers({ limit: 20 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.hasNextPage).toBe(true);
    });

    await act(async () => {
      await result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(2);
      expect(result.current.hasNextPage).toBe(false);
    });

    expect(mockedGetUsers).toHaveBeenNthCalledWith(1, { limit: 20, page: 1 });
    expect(mockedGetUsers).toHaveBeenNthCalledWith(2, { limit: 20, page: 2 });
  });
});
