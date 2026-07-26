import rateLimit from 'express-rate-limit';

export function createApiRateLimiter(
  max = Number(process.env.RATE_LIMIT_MAX) || 10,
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later' },
  });
}
