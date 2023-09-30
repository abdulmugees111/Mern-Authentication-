import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        // target:  "https://mern-authentication-qe36atbci-abdulmugees111.vercel.app/",
        target: 'http://localhost:5006',
        changeOrigin: true,
      },
    },
  },
});
