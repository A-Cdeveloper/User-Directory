import { describe, it, expect } from 'vitest';
import { withSelectedFilterOptions } from '@/features/users/utils/withSelectedFilterOptions';

const OPTIONS = [
  { value: 'British', count: 10 },
  { value: 'Indian', count: 5 },
];

describe('withSelectedFilterOptions', () => {
  it('returns options unchanged when nothing is selected', () => {
    expect(withSelectedFilterOptions(OPTIONS, [])).toEqual(OPTIONS);
  });

  it('returns options unchanged when selected values are already present', () => {
    expect(withSelectedFilterOptions(OPTIONS, ['British'])).toEqual(OPTIONS);
  });

  it('prepends missing selected values with count 0', () => {
    expect(withSelectedFilterOptions(OPTIONS, ['Timor-Leste'])).toEqual([
      { value: 'Timor-Leste', count: 0 },
      ...OPTIONS,
    ]);
  });

  it('prepends only missing selected values', () => {
    expect(withSelectedFilterOptions(OPTIONS, ['Timor-Leste', 'British'])).toEqual([
      { value: 'Timor-Leste', count: 0 },
      ...OPTIONS,
    ]);
  });
});
