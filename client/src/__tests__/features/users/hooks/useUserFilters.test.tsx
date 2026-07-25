import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactNode } from 'react';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import { DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from '@/features/users/constants';

const createWrapper = (initialEntry: string) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  );
};

const renderUseUserFilters = (initialEntry: string) =>
  renderHook(() => useUserFilters(), {
    wrapper: createWrapper(initialEntry),
  });

describe('useUserFilters', () => {
  describe('get', () => {
    it('returns default sort values when the URL has none', () => {
      const { result } = renderUseUserFilters('/');

      expect(result.current.sortBy).toBe(DEFAULT_SORT_BY);
      expect(result.current.sortDir).toBe(DEFAULT_SORT_DIR);
    });

    it('reads nationalities and hobbies from the URL', () => {
      const { result } = renderUseUserFilters('/?nationalities=Serbia,Germany&hobbies=Reading');

      expect(result.current.nationalities).toEqual(['Serbia', 'Germany']);
      expect(result.current.hobbies).toEqual(['Reading']);
    });

    it('reads sortBy and sortDir from the URL', () => {
      const { result } = renderUseUserFilters('/?sortBy=age&sortDir=desc');

      expect(result.current.sortBy).toBe('age');
      expect(result.current.sortDir).toBe('desc');
    });

    it('reads search from the URL', () => {
      const { result } = renderUseUserFilters('/?search=John');

      expect(result.current.search).toBe('John');
    });
  });

  describe('set', () => {
    it('setSearch writes search so it can be read', () => {
      const { result } = renderUseUserFilters('/');

      act(() => {
        result.current.setSearch('John');
      });

      expect(result.current.search).toBe('John');
    });

    it('setSortBy writes sortBy so it can be read', () => {
      const { result } = renderUseUserFilters('/');

      act(() => {
        result.current.setSortBy('age');
      });

      expect(result.current.sortBy).toBe('age');
    });

    it('setSortDir writes sortDir so it can be read', () => {
      const { result } = renderUseUserFilters('/');

      act(() => {
        result.current.setSortDir('desc');
      });

      expect(result.current.sortDir).toBe('desc');
    });

    it('toggleFilter adds a value to the group', () => {
      const { result } = renderUseUserFilters('/');

      act(() => {
        result.current.toggleFilter('nationalities', 'Serbia', true);
      });

      expect(result.current.nationalities).toEqual(['Serbia']);
    });

    it('toggleFilter removes a value from the group', () => {
      const { result } = renderUseUserFilters('/?nationalities=Serbia,Germany');

      act(() => {
        result.current.toggleFilter('nationalities', 'Serbia', false);
      });

      expect(result.current.nationalities).toEqual(['Germany']);
    });

    it('removeFilter removes a single value from the group', () => {
      const { result } = renderUseUserFilters('/?hobbies=Reading,Chess');

      act(() => {
        result.current.removeFilter('hobbies', 'Chess');
      });

      expect(result.current.hobbies).toEqual(['Reading']);
    });
  });

  describe('clear', () => {
    it('clearGroup removes every value of a single group', () => {
      const { result } = renderUseUserFilters('/?nationalities=Serbia,Germany&hobbies=Reading');

      act(() => {
        result.current.clearGroup('nationalities');
      });

      expect(result.current.nationalities).toEqual([]);
      expect(result.current.hobbies).toEqual(['Reading']);
    });

    it('clearAllFilters removes nationalities and hobbies but keeps search', () => {
      const { result } = renderUseUserFilters('/?nationalities=Serbia&hobbies=Reading&search=John');

      act(() => {
        result.current.clearAllFilters();
      });

      expect(result.current.nationalities).toEqual([]);
      expect(result.current.hobbies).toEqual([]);
      expect(result.current.search).toBe('John');
    });
  });
});
