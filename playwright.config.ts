import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://4f.com.pl",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    timezoneId: "Europe/Warsaw",
    storageState: {
      origins: [],
      cookies: [
        {
          name: "CookieConsent",
          value:
            "{stamp:%27Wo7jwPu+T2daxnZ4/4VqgMJUXX17Rc1h4US1+IAN9/4ka7P+0dj7oA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1741015397474%2Cregion:%27pl%27}",
          domain: "4f.com.pl",
          path: "/",
          expires: 1743693797,
          httpOnly: false,
          secure: true,
          sameSite: "Lax",
        },
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile_safari",
      use: {
        ...devices["iPhone 13 Pro"],
      },
      testIgnore: "**/web/**",
    },
  ],
});
