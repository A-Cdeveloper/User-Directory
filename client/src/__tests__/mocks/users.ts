import type { User, UsersResponse } from '@/types/user';

export const fakeUser: User = {
  id: 1,
  avatar: 'https://example.com/avatar.png',
  first_name: 'John',
  last_name: 'Doe',
  age: 30,
  nationality: 'Serbia',
  hobbies: ['Reading'],
};

export const fakeUsersResponse: UsersResponse = {
  users: [fakeUser],
  pagination: {
    page: 1,
    limit: 20,
    total: 1,
    hasMore: false,
  },
  filters: {
    nationalities: [{ value: 'Serbia', count: 1 }],
    hobbies: [{ value: 'Reading', count: 1 }],
  },
};
