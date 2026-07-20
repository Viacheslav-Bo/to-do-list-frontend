import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the LOCAL dev stack only:
 *   - frontend: npm run dev (started automatically below via webServer)
 *   - backend: must already be running via `docker compose up` (port 3000)
 *
 * fullyParallel is false because every test shares the same backend +
 * MongoDB instance — running tests in parallel could create race
 * conditions between tests that touch the same task list.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
