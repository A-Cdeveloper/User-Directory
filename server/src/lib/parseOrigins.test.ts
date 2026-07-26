import { describe, it, expect } from 'vitest';
import { parseOrigins } from './parseOrigins.js';

describe('parseOrigins', () => {
  it('returns an empty list for undefined or blank values', () => {
    expect(parseOrigins(undefined)).toEqual([]);
    expect(parseOrigins('')).toEqual([]);
    expect(parseOrigins('  ,  ')).toEqual([]);
  });

  it('splits, trims, and drops empty segments', () => {
    expect(parseOrigins('http://localhost:3002, https://app.example')).toEqual([
      'http://localhost:3002',
      'https://app.example',
    ]);
  });
});
