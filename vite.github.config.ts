import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../outputs/aura-github-pages",
  },
  define: {
    "process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY": JSON.stringify(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
        process.env.VITE_GOOGLE_MAPS_API_KEY ??
        "",
    ),
  },
  plugins: [react()],
  root: "web",
});
