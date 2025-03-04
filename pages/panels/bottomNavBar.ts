import { Locator, Page, expect } from "@playwright/test";
import { REGEXPS } from "../../fixtures/data/regexps";

export class BottomNavBar {
  readonly bottomNavBar: Locator;
  readonly accountTrigger: Locator;

  constructor(page: Page) {
    this.bottomNavBar = page.locator("[class^='bottomNavBar-root-']");
    this.accountTrigger = this.bottomNavBar.locator(
      "[class^='accountTrigger-root-']>a"
    );
  }

  async assertBottomNavBar() {
    await expect(this.bottomNavBar).toBeVisible();
    await this.assertAccountTrigger();
  }

  async assertAccountTrigger() {
    await expect(this.accountTrigger).toBeVisible();
    await expect(this.accountTrigger).toHaveAttribute(
      "href",
      REGEXPS.WEB_LOGIN_PAGE
    );
  }
}
