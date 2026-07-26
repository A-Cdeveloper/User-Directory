import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

const ALLOWED_ORIGIN = 'http://localhost:3002';

process.env.CORS_ORIGINS = ALLOWED_ORIGIN;
// Keep suite under the default 10/min cap for shared app requests
process.env.RATE_LIMIT_MAX = '100';

const app = createApp();

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('sets Helmet security headers', async () => {
    const res = await request(app).get('/health');

    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
  });
});

describe('CORS', () => {
  it('allows a configured origin', async () => {
    const res = await request(app).get('/health').set('Origin', ALLOWED_ORIGIN);

    expect(res.headers['access-control-allow-origin']).toBe(ALLOWED_ORIGIN);
  });

  it('does not allow an unknown origin', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://evil.example');

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
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

describe('rate limit', () => {
  it('returns 429 after exceeding the /api limit', async () => {
    process.env.RATE_LIMIT_MAX = '2';
    process.env.RATE_LIMIT_WINDOW_MS = '60000';
    const limitedApp = createApp();

    await request(limitedApp).get('/api/users').query({ limit: 1 });
    await request(limitedApp).get('/api/users').query({ limit: 1 });
    const res = await request(limitedApp).get('/api/users').query({ limit: 1 });

    expect(res.status).toBe(429);
    expect(res.body).toEqual({ error: 'Too many requests, please try again later' });
  });

  it('does not rate-limit /health', async () => {
    process.env.RATE_LIMIT_MAX = '1';
    const limitedApp = createApp();

    await request(limitedApp).get('/api/users').query({ limit: 1 });
    const blocked = await request(limitedApp).get('/api/users').query({ limit: 1 });
    const health = await request(limitedApp).get('/health');

    expect(blocked.status).toBe(429);
    expect(health.status).toBe(200);
  });
});
