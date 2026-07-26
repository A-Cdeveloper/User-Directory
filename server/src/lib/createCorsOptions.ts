import type { CorsOptions } from 'cors';
import { parseOrigins } from './parseOrigins.js';

export function createCorsOptions(corsOrigins = process.env.CORS_ORIGINS): CorsOptions {
  const allowedOrigins = parseOrigins(corsOrigins);

  return {
    origin(origin, callback) {
      // No Origin header: curl, server-to-server, same-origin requests
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  };
}
