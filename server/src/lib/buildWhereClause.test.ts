import { describe, it, expect } from 'vitest';
import { buildWhereClause } from './buildWhereClause.js';

const SEARCH = 'John';
const SEARCH_PARAMS = ['%John%', '%John%', '%John%'] as const;
const NATIONALITIES = ['British', 'Indian'] as const;
const HOBBIES = ['Reading', 'Coding'] as const;
const HOBBIES_PARAMS = ['Reading', 'Coding', 2] as const;

const getResult = (
  params: {
    search?: string;
    nationalities?: string[];
    hobbies?: string[];
  } = {},
) =>
  buildWhereClause({
    search: params.search ?? '',
    nationalities: params.nationalities ?? [],
    hobbies: params.hobbies ?? [],
  });

describe('buildWhereClause', () => {
  it('returns empty clause when no filters', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } =
      getResult();

    expect(whereSql).toBe('');
    expect(whereNationalityFilterSql).toBe('');
    expect(queryParams).toEqual([]);
    expect(nationalityFilterParams).toEqual([]);
  });

  it('adds search LIKE clause and params', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      { search: SEARCH },
    );

    expect(whereSql).toContain('LIKE');
    expect(whereSql.startsWith('WHERE')).toBe(true);
    expect(queryParams).toEqual([...SEARCH_PARAMS]);
    expect(nationalityFilterParams).toEqual([...SEARCH_PARAMS]);
    expect(whereNationalityFilterSql).toContain('LIKE');
  });

  it('adds nationality IN clause but not to facet filter sql', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      { nationalities: [...NATIONALITIES] },
    );

    expect(whereSql).toContain('nationality IN (?,?)');
    expect(queryParams).toEqual([...NATIONALITIES]);
    expect(whereNationalityFilterSql).toBe('');
    expect(nationalityFilterParams).toEqual([]);
  });

  it('adds hobbies subquery with AND count param', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      { hobbies: [...HOBBIES] },
    );

    expect(whereSql).toContain('user_hobbies');
    expect(whereSql).toContain('HAVING COUNT(DISTINCT h.name) = ?');
    expect(queryParams).toEqual([...HOBBIES_PARAMS]);
    expect(whereNationalityFilterSql).toContain('user_hobbies');
    expect(nationalityFilterParams).toEqual([...HOBBIES_PARAMS]);
  });

  it('combines search and nationalities; facet sql keeps only search', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      { search: SEARCH, nationalities: [...NATIONALITIES] },
    );

    expect(whereSql).toContain('LIKE');
    expect(whereSql).toContain('nationality IN (?,?)');
    expect(whereSql).toContain(' AND ');
    expect(queryParams).toEqual([...SEARCH_PARAMS, ...NATIONALITIES]);
    expect(whereNationalityFilterSql).toContain('LIKE');
    expect(whereNationalityFilterSql).not.toContain('nationality IN');
    expect(nationalityFilterParams).toEqual([...SEARCH_PARAMS]);
  });

  it('combines search and hobbies in both sql and params', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      { search: SEARCH, hobbies: [...HOBBIES] },
    );

    expect(whereSql).toContain('LIKE');
    expect(whereSql).toContain('user_hobbies');
    expect(whereSql).toContain(' AND ');
    expect(queryParams).toEqual([...SEARCH_PARAMS, ...HOBBIES_PARAMS]);
    expect(whereNationalityFilterSql).toContain('LIKE');
    expect(whereNationalityFilterSql).toContain('user_hobbies');
    expect(nationalityFilterParams).toEqual([...SEARCH_PARAMS, ...HOBBIES_PARAMS]);
  });

  it('combines all filters; facet sql excludes nationalities', () => {
    const { whereSql, whereNationalityFilterSql, queryParams, nationalityFilterParams } = getResult(
      {
        search: SEARCH,
        nationalities: [...NATIONALITIES],
        hobbies: [...HOBBIES],
      },
    );

    expect(whereSql).toContain('LIKE');
    expect(whereSql).toContain('nationality IN (?,?)');
    expect(whereSql).toContain('user_hobbies');
    expect(queryParams).toEqual([...SEARCH_PARAMS, ...NATIONALITIES, ...HOBBIES_PARAMS]);
    expect(whereNationalityFilterSql).toContain('LIKE');
    expect(whereNationalityFilterSql).toContain('user_hobbies');
    expect(whereNationalityFilterSql).not.toContain('nationality IN');
    expect(nationalityFilterParams).toEqual([...SEARCH_PARAMS, ...HOBBIES_PARAMS]);
  });
});
