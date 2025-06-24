import path from 'path';
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
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/Image.tsx'),
      name: 'next-image-standalone',
      fileName: (format) => `next-image-standalone.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
