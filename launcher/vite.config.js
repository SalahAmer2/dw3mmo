// launcher/vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     root: ".",           // 👈 project root (where index.html is)
//     build: {
//         outDir: "dist",    // output folder
//     },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ⚙️ This fixes the missing index-zgV0nskO.js error in production
export default defineConfig({
    base: "./", // <-- critical for Electron builds
    plugins: [react()],
    root: ".",
    build: {
        outDir: "dist",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

