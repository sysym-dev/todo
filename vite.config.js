import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tododo',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve('./src'),
    },
  },
});
