import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

const app = createApp();

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/users', () => {
  it('returns users and pagination', async () => {
    const res = await request(app).get('/api/users').query({ limit: 5 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeLessThanOrEqual(5);
    expect(res.body.pagination).toMatchObject({
      page: 1,
      limit: 5,
    });
  });

  it('returns 400 for invalid limit', async () => {
    const res = await request(app).get('/api/users').query({ limit: 999 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });

  it('returns 400 for invalid page', async () => {
    const res = await request(app).get('/api/users').query({ page: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid query parameters');
  });
});

describe('not found', () => {
  it('returns 404 for unknown route', async () => {
    const res = await request(app).get('/api/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found' });
  });
});
