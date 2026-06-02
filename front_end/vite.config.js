// vite.config.js
// Vite is the build tool that compiles your React code into browser-ready JavaScript.
// This config tells Vite to use the React plugin and sets up a proxy so
// API calls to /api/* are forwarded to the Flask backend on port 5000.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // React dev server runs at http://localhost:3000
    proxy: {
      // Any request starting with /api is forwarded to Flask
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
