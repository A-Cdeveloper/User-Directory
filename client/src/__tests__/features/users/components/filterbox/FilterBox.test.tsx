import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBox from '@/features/users/components/filterbox/FilterBox';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import { DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from '@/features/users/constants';

vi.mock('@/features/users/hooks/useUserFilters', () => ({
  useUserFilters: vi.fn(),
}));

const mockedUseUserFilters = vi.mocked(useUserFilters);

const setSearch = vi.fn();

const defaultFilterState: ReturnType<typeof useUserFilters> = {
  nationalities: [],
  hobbies: [],
  sortBy: DEFAULT_SORT_BY,
  sortDir: DEFAULT_SORT_DIR,
  search: '',
  debouncedSearch: '',
  clearAllFilters: vi.fn(),
  removeFilter: vi.fn(),
  setSearch,
  setSortBy: vi.fn(),
  setSortDir: vi.fn(),
  toggleFilter: vi.fn(),
  clearGroup: vi.fn(),
};

const renderFilterBox = (
  totalCount = 0,
  filterState: Partial<ReturnType<typeof useUserFilters>> = {},
) => {
  mockedUseUserFilters.mockReturnValue({
    ...defaultFilterState,
    ...filterState,
  });

  const utils = render(<FilterBox totalCount={totalCount} />);
  const user = userEvent.setup();

  return {
    ...utils,
    count: screen.getByTestId('filter-box-count'),
    searchInput: screen.getByTestId('search-input'),
    user,
  };
};

beforeEach(() => {
  setSearch.mockReset();
  mockedUseUserFilters.mockReset();
});

describe('FilterBox', () => {
  it('shows singular label when totalCount is 1', () => {
    const { count } = renderFilterBox(1);

    expect(count).toHaveTextContent(/user found/i);
  });

  it('shows plural label when totalCount is not 1', () => {
    const { count } = renderFilterBox(5);

    expect(count).toHaveTextContent(/users found/i);
  });

  it('calls setSearch when the search input changes', async () => {
    const { searchInput, user } = renderFilterBox();

    await user.type(searchInput, 'A');

    expect(setSearch).toHaveBeenCalledWith('A');
  });
});
