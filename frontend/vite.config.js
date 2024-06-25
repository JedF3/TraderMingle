import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Development server port
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Proxy API requests to backend server
        changeOrigin: true, // Change the origin header to the target URL
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite the path
      },
    },
  },
});
