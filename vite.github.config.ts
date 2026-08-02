import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  publicDir: "../public",
  build: {
    emptyOutDir: true,
    outDir: "../outputs/aura-github-pages",
  },
  plugins: [react()],
  root: "web",
});
