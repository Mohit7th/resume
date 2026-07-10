import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "./",
    plugins: [react()],
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                // Split heavy, rarely-changing vendor code into its own chunks
                // so they cache independently of the app code.
                manualChunks(id) {
                    if (!id.includes("node_modules")) {
                        return undefined;
                    }
                    if (id.includes("@mui/icons-material")) {
                        return "mui-icons";
                    }
                    if (id.includes("@mui") || id.includes("@emotion")) {
                        return "mui";
                    }
                    if (id.includes("react-router")) {
                        return "router";
                    }
                    if (
                        id.includes("/react/") ||
                        id.includes("/react-dom/") ||
                        id.includes("/scheduler/")
                    ) {
                        return "react";
                    }
                    return undefined;
                },
            },
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
    },
});
