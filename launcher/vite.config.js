// launcher/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: ".",           // 👈 project root (where index.html is)
    build: {
        outDir: "dist",    // output folder
    },
});
