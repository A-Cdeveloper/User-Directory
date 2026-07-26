// Avoid `**/api/users*` — it also matches Vite's `/src/.../api/usersApi.ts`
export const usersApi = { method: 'GET' as const, pathname: '/api/users' };
