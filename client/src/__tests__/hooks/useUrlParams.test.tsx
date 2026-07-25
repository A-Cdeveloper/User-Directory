import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactNode } from 'react';
import { useUrlParams } from '@/hooks/useUrlParams';

const createWrapper = (initialEntry: string) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  );
};

const renderUseUrlParams = (initialEntry: string) =>
  renderHook(() => useUrlParams(), {
    wrapper: createWrapper(initialEntry),
  });

describe('useUrlParams', () => {
  describe('get', () => {
    it('returns empty string when getParam key is missing', () => {
      const { result } = renderUseUrlParams('/');

      expect(result.current.getParam('search')).toBe('');
    });

    it('returns getParam value from the URL', () => {
      const { result } = renderUseUrlParams('/?search=John');

      expect(result.current.getParam('search')).toBe('John');
    });

    it('returns empty array when getListParam key is missing', () => {
      const { result } = renderUseUrlParams('/');

      expect(result.current.getListParam('nationalities')).toEqual([]);
    });

    it('parses comma-separated getListParam values', () => {
      const { result } = renderUseUrlParams('/?nationalities=a,b');

      expect(result.current.getListParam('nationalities')).toEqual(['a', 'b']);
    });

    it('returns empty array when getListParam value is (a, , b)', () => {
      const { result } = renderUseUrlParams('/?nationalities=a, , b');

      expect(result.current.getListParam('nationalities')).toEqual(['a', 'b']);
    });
  });

  describe('set', () => {
    it('sets the value so getParam can read it', () => {
      const { result } = renderUseUrlParams('/');

      act(() => {
        result.current.setParam('search', 'John');
      });

      expect(result.current.getParam('search')).toBe('John');
    });

    it('setParam with empty string deletes the key', () => {
      const { result } = renderUseUrlParams('/?search=John');

      act(() => {
        result.current.setParam('search', '');
      });

      expect(result.current.getParam('search')).toBe('');
    });

    it('setListParamValue adds a value to the list', () => {
      const { result } = renderUseUrlParams('/?nationalities=a');

      act(() => {
        result.current.setListParamValue('nationalities', 'b', true);
      });

      expect(result.current.getListParam('nationalities')).toEqual(['a', 'b']);
    });

    it('setListParamValue removes a value from the list', () => {
      const { result } = renderUseUrlParams('/?nationalities=a,b');

      act(() => {
        result.current.setListParamValue('nationalities', 'b', false);
      });

      expect(result.current.getListParam('nationalities')).toEqual(['a']);
    });

    it('setListParamValue deletes the key when the last value is removed', () => {
      const { result } = renderUseUrlParams('/?nationalities=a');

      act(() => {
        result.current.setListParamValue('nationalities', 'a', false);
      });

      expect(result.current.getListParam('nationalities')).toEqual([]);
    });
  });

  describe('clear', () => {
    it('clearParams removes all given keys', () => {
      const { result } = renderUseUrlParams('/?search=John&sortBy=age');

      act(() => {
        result.current.clearParams(['search', 'sortBy']);
      });

      expect(result.current.getParam('search')).toBe('');
      expect(result.current.getParam('sortBy')).toBe('');
    });

    it('clearListParam removes the list key', () => {
      const { result } = renderUseUrlParams('/?nationalities=a,b');

      act(() => {
        result.current.clearListParam('nationalities');
      });

      expect(result.current.getListParam('nationalities')).toEqual([]);
    });
  });
});
