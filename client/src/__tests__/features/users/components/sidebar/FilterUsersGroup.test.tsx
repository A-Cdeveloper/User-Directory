import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterUserGroup from '@/features/users/components/sidebar/FilterUsersGroup';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import { DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from '@/features/users/constants';

vi.mock('@/features/users/hooks/useUserFilters', () => ({
  useUserFilters: vi.fn(),
}));

const mockedUseUserFilters = vi.mocked(useUserFilters);

const toggleFilter = vi.fn();
const clearGroup = vi.fn();

const defaultOptions = [
  { value: 'Serbia', count: 3 },
  { value: 'Germany', count: 2 },
];

const defaultFilterState: ReturnType<typeof useUserFilters> = {
  nationalities: [],
  hobbies: [],
  sortBy: DEFAULT_SORT_BY,
  sortDir: DEFAULT_SORT_DIR,
  search: '',
  debouncedSearch: '',
  clearAllFilters: vi.fn(),
  removeFilter: vi.fn(),
  setSearch: vi.fn(),
  setSortBy: vi.fn(),
  setSortDir: vi.fn(),
  toggleFilter,
  clearGroup,
};

const renderFilterUserGroup = (
  props: Partial<{ title: string; paramKey: string; options: typeof defaultOptions }> = {},
  filterState: Partial<ReturnType<typeof useUserFilters>> = {},
) => {
  mockedUseUserFilters.mockReturnValue({
    ...defaultFilterState,
    ...filterState,
  });

  const merged = {
    title: 'Nationalities',
    paramKey: 'nationalities',
    options: defaultOptions,
    ...props,
  };

  const utils = render(<FilterUserGroup {...merged} />);
  const user = userEvent.setup();

  return {
    ...utils,
    props: merged,
    heading: screen.getByTestId('filter-group-heading'),
    list: screen.getByTestId('filter-group-list'),
    items: within(screen.getByTestId('filter-group-list')).queryAllByRole('listitem'),
    resetButton: screen.queryByTestId('filter-group-reset'),
    user,
  };
};

beforeEach(() => {
  toggleFilter.mockReset();
  clearGroup.mockReset();
  mockedUseUserFilters.mockReset();
});

describe('FilterUserGroup', () => {
  it('renders the group title and options', () => {
    const { heading, items } = renderFilterUserGroup();

    expect(heading).toHaveTextContent('Nationalities');
    expect(items).toHaveLength(defaultOptions.length);
  });

  it('collapses the list when the heading is clicked', async () => {
    const { heading, list, user } = renderFilterUserGroup();

    await user.click(heading);

    expect(heading).toHaveAttribute('aria-expanded', 'false');
    expect(list).toHaveClass('hidden');
  });

  it('shows selected count in the heading', () => {
    const { heading } = renderFilterUserGroup({}, { nationalities: ['Serbia', 'Germany'] });

    expect(heading).toHaveTextContent('(2)');
  });

  it('calls toggleFilter when an option is checked', async () => {
    const { items, user } = renderFilterUserGroup();
    const checkbox = within(items[0]).getByRole('checkbox');

    await user.click(checkbox);

    expect(toggleFilter).toHaveBeenCalledWith('nationalities', 'Serbia', true);
  });

  it('hides reset when nothing is selected', () => {
    const { resetButton } = renderFilterUserGroup();

    expect(resetButton).not.toBeInTheDocument();
  });

  it('calls clearGroup when reset is clicked', async () => {
    const { resetButton, user } = renderFilterUserGroup({}, { nationalities: ['Serbia'] });

    expect(resetButton).toBeInTheDocument();
    await user.click(resetButton!);

    expect(clearGroup).toHaveBeenCalledWith('nationalities');
  });
});
