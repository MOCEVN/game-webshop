import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@shared": path.resolve("../../src/shared")
        },
    },
    test: {
        root: "../../src/",
        setupFiles: [
            "./tests/src/setup.ts"
        ],
        coverage: {
            provider: "istanbul",
            reporter: ["text", "text-summary", "html"],
            reportsDirectory: "./tests/coverage"
        },
    },
});
