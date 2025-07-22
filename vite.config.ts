import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from "vite-tsconfig-paths";

// Vid Docs for faster Docs:: https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      //babel options for faster refresh
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    tsconfigPaths(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Portfolio App',
        short_name: 'Portfolio',
        theme_color: '#3366FF',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  // Optimize the build
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    },
    sourcemap: false,
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router',
      'firebase/app', 
      'firebase/auth', 
      'firebase/firestore'
    ],
    exclude: []
  }
});
