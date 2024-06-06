import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   base: "/bc_react_70_Lubov1506/",
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      components: '/src/components',
      helpers: '/src/helpers',
      pages: '/src/pages',
      hooks: '/src/hooks',
    },
  },
});
