import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import UsersList from '@/features/users/components/UsersList';
import type { User } from '@/types/user';
import { fakeUser } from '@/__tests__/mocks/users';

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getTotalSize: () => count * 120,
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        key: index,
        start: index * 120,
        size: 120,
        end: (index + 1) * 120,
      })),
    measureElement: vi.fn(),
  }),
}));

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

beforeEach(() => {
  observerCallback = null;
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

const triggerIntersection = (isIntersecting: boolean) => {
  observerCallback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
};

const defaultProps = {
  users: [] as User[],
  onFetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
};

const renderUsersList = (props: Partial<typeof defaultProps> = {}) => {
  const merged = { ...defaultProps, ...props };
  const utils = render(<UsersList {...merged} />);

  return {
    ...utils,
    props: merged,
    empty: screen.queryByTestId('users-list-empty'),
    list: screen.queryByTestId('users-list'),
    items: screen.queryAllByTestId('users-list-item'),
    loading: screen.queryByTestId('users-list-loading'),
    end: screen.queryByTestId('users-list-end'),
  };
};

describe('UsersList', () => {
  it('shows empty state when there are no users', () => {
    const { empty, list } = renderUsersList({ users: [] });

    expect(empty).toBeInTheDocument();
    expect(empty).toHaveTextContent('No users found');
    expect(list).not.toBeInTheDocument();
  });

  it('shows loading state while fetching the next page', () => {
    const { list, loading } = renderUsersList({
      users: [fakeUser],
      isFetchingNextPage: true,
    });

    expect(list).toHaveAttribute('aria-busy', 'true');
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent(/Loading/i);
  });

  it('renders user items when users are provided', () => {
    const users = [fakeUser, { ...fakeUser, id: 2, first_name: 'Jane' }];
    const { empty, list, items } = renderUsersList({ users });

    expect(empty).not.toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(2);
  });

  it('calls onFetchNextPage when the sentinel intersects and there is a next page', () => {
    const onFetchNextPage = vi.fn();
    renderUsersList({
      users: [fakeUser],
      hasNextPage: true,
      isFetchingNextPage: false,
      onFetchNextPage,
    });

    triggerIntersection(true);

    expect(onFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not fetch when there is no next page', () => {
    const onFetchNextPage = vi.fn();
    renderUsersList({
      users: [fakeUser],
      hasNextPage: false,
      onFetchNextPage,
    });

    triggerIntersection(true);

    expect(onFetchNextPage).not.toHaveBeenCalled();
  });
});
