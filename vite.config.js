import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.md"], // Ensure markdown files are included as assets
});
