import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    // Avoid running into errors due to next/image expecting to run server-side
    // code.
    'process.env': JSON.stringify({
      NODE_ENV: 'production',
    }),
  },
});
