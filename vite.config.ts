import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/play-with-code-fe/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@tabler/icons-react"],
  },
});
