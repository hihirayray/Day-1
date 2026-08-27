import { defineConfig } from "vitest/config";

// Keep domain tests independent from the Cloudflare/Vinext build pipeline.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
