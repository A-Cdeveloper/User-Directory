import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3002,
  },
  build: {
    rolldownOptions: {
      output: {
        // Stable vendor chunks → better long-term browser caching
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              // Match react / react-dom / scheduler, not react-router
              test: /node_modules[\\/](react-dom|scheduler|react)([\\/]|$)/,
            },
            {
              name: 'router-vendor',
              test: /node_modules[\\/]react-router([\\/]|$)/,
            },
            {
              name: 'query-vendor',
              test: /node_modules[\\/]@tanstack[\\/]/,
            },
            {
              name: 'ui-vendor',
              test: /node_modules[\\/](@radix-ui|lucide-react)([\\/]|$)/,
            },
          ],
        },
      },
    },
  },
});
