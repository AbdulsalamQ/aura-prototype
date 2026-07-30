import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../outputs/aura-aws-webapp",
  },
  plugins: [react()],
  root: "aws",
});
