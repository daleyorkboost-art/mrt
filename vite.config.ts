import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(process.cwd(), 'src/test/setup.ts'),
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['backend/**', 'node_modules/**', 'dist/**'],
  },
});
