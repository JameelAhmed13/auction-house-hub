import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Vanilla Vite SPA config — works on Netlify, Vercel, Cloudflare Pages, etc.
// (Replaces the Lovable-only @lovable.dev/vite-tanstack-config wrapper.)
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("@tanstack")) return "vendor-react";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("recharts") || id.includes("d3")) return "vendor-charts";
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  preview: {
    port: 8080,
    host: true,
  },
});
