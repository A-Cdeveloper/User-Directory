import { describe, it, expect } from 'vitest';
import { userQuerySchema, type UserQueryParams } from './userQuerySchema.js';
import type { SortColumn, SortDirection } from '../types/user.js';

const getResult = (query: Partial<UserQueryParams> | Record<string, unknown>) => {
  return userQuerySchema.parse(query);
};

describe('userQuerySchema', () => {
  it('applies defaults for empty query', () => {
    const { page, limit, search, nationalities, hobbies, sortBy, sortDir } = getResult({});

    expect(page).toBe(1);
    expect(limit).toBe(20);
    expect(search).toBe('');
    expect(nationalities).toEqual([]);
    expect(hobbies).toEqual([]);
    expect(sortBy).toBe('first_name');
    expect(sortDir).toBe('asc');
  });

  it('coerces page and limit from numbers', () => {
    const { page, limit } = getResult({ page: 2, limit: 30 });

    expect(page).toBe(2);
    expect(limit).toBe(30);
  });

  it('parses comma-separated nationalities string', () => {
    const { nationalities } = getResult({ nationalities: 'British, Indian' });

    expect(nationalities).toEqual(['British', 'Indian']);
  });

  it('parses comma-separated hobbies string', () => {
    const { hobbies } = getResult({ hobbies: 'Reading,Coding' });

    expect(hobbies).toEqual(['Reading', 'Coding']);
  });

  it('parses nationalities array', () => {
    const { nationalities } = getResult({ nationalities: ['US', 'UK'] });

    expect(nationalities).toEqual(['US', 'UK']);
  });

  it('parses search query', () => {
    const { search } = getResult({ search: 'John Doe' });

    expect(search).toBe('John Doe');
  });

  it('throws for limit above max', () => {
    expect(() => getResult({ limit: 101 })).toThrow();
  });

  it('throws for page below 1', () => {
    expect(() => getResult({ page: 0 })).toThrow();
  });

  it('falls back to default sortBy for invalid value', () => {
    const { sortBy } = getResult({ sortBy: 'invalid' as SortColumn });

    expect(sortBy).toBe('first_name');
  });

  it('falls back to default sortDir for invalid value', () => {
    const { sortDir } = getResult({ sortDir: 'invalid' as SortDirection });

    expect(sortDir).toBe('asc');
  });

  it('accepts valid sortBy and sortDir', () => {
    const { sortBy, sortDir } = getResult({ sortBy: 'last_name', sortDir: 'desc' });

    expect(sortBy).toBe('last_name');
    expect(sortDir).toBe('desc');
  });
});
