import { test as base } from "@playwright/test";

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      await page.setExtraHTTPHeaders({
        "sec-ch-ua": "",
      });
      await use();
    },
    { auto: true },
  ],
});
