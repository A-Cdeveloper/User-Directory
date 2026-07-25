import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsers } from '@/features/users/api/usersApi';
import { api } from '@/lib/api';
import { fakeUsersResponse } from '@/__tests__/mocks/users';
import { AxiosError } from 'axios';

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);

beforeEach(() => {
  mockedGet.mockReset();
});

describe('getUsers', () => {
  it('returns response data from the API', async () => {
    mockedGet.mockResolvedValue({ data: fakeUsersResponse });

    await expect(getUsers()).resolves.toEqual(fakeUsersResponse);
  });

  it('maps list params to comma-separated query values', async () => {
    mockedGet.mockResolvedValue({ data: fakeUsersResponse });

    await getUsers({
      page: 2,
      limit: 20,
      search: '',
      nationalities: ['Serbia', 'Germany'],
      hobbies: ['Reading'],
      sortBy: 'age',
      sortDir: 'desc',
    });

    expect(mockedGet).toHaveBeenCalledWith('/users', {
      params: {
        page: 2,
        limit: 20,
        search: undefined,
        nationalities: 'Serbia,Germany',
        hobbies: 'Reading',
        sortBy: 'age',
        sortDir: 'desc',
      },
    });
  });

  it('throws Error with API message on axios failure', async () => {
    const axiosError = new AxiosError('Request failed');
    axiosError.response = {
      data: { error: 'Invalid query' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: {} as never },
    };

    mockedGet.mockRejectedValue(axiosError);

    await expect(getUsers()).rejects.toThrow('Invalid query');
  });

  it('throws fallback Error when axios error has no message', async () => {
    const axiosError = new AxiosError('Request failed');
    mockedGet.mockRejectedValue(axiosError);

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});
