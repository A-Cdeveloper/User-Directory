import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

const DELAY = 500;
const INITIAL_VALUE = 'hello';

const renderUseDebounce = (initialValue = INITIAL_VALUE, delay = DELAY) =>
  renderHook(({ value }) => useDebounce(value, delay), {
    initialProps: { value: initialValue },
  });

describe('useDebounce', () => {
  beforeEach(() => {
    // Mock setTimeout / clearTimeout so tests control delay without waiting
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderUseDebounce();

    expect(result.current).toBe(INITIAL_VALUE);
  });

  it('does not update before the delay elapses', () => {
    const { result, rerender } = renderUseDebounce();

    rerender({ value: 'world' });

    expect(result.current).toBe(INITIAL_VALUE);
  });

  it('updates to the latest value after the delay', () => {
    const { result, rerender } = renderUseDebounce();

    rerender({ value: 'world' });

    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(result.current).toBe('world');
  });

  it('only applies the latest value when input changes rapidly', () => {
    const { result, rerender } = renderUseDebounce('a');

    rerender({ value: 'ab' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'abc' });
    act(() => {
      vi.advanceTimersByTime(DELAY);
    });

    expect(result.current).toBe('abc');
  });
});
